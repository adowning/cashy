import { BunRequest } from "bun";
import { TransactionStatus, TransactionType } from "../../prisma/client";
import db from "../../db/prisma";
// Instantiate PrismaClient

// Configure the same shared secret used in the Cloudflare Worker
const WEBHOOK_SECRET = "YOUR_SECURE_SHARED_SECRET"; // Use the exact same secret as in the Worker

// Interface for the expected payload from the Cloudflare Worker
interface CashAppWebhookPayload {
  transactionId: string; // The transaction number extracted from the email (e.g., 'D-NP3JP2J9')
  amount: number; // The amount received
  senderName: string; // The sender's name
  timestamp: string; // ISO string timestamp from the email date
  rawEmailSubject: string; // Original email subject for logging
}

/**
 * Webhook endpoint to receive Cash App payment confirmations from the Cloudflare Email Worker.
 * It validates the request, finds the corresponding pending transaction,
 * updates its status, and credits the user's balance.
 */
export async function handleCashAppWebhook(req: BunRequest) {
  // 1. Validate the request method
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
  }

  // 2. Validate the shared secret for basic security
  const sharedSecret = req.headers.get("X-Webhook-Secret");
  if (!sharedSecret || sharedSecret !== WEBHOOK_SECRET) {
    console.warn("Webhook received with invalid or missing secret.");
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  // 3. Parse the request body
  let payload: CashAppWebhookPayload;
  try {
    payload = (await req.json()) as CashAppWebhookPayload;

    // Basic payload validation
    if (!payload.transactionId || typeof payload.amount !== "number" || payload.amount <= 0) {
      console.error("Webhook received with invalid payload:", payload);
      return new Response(JSON.stringify({ message: "Invalid payload" }), { status: 400 });
    }
  } catch (error) {
    console.error("Error parsing webhook payload:", error);
    return new Response(JSON.stringify({ message: "Invalid JSON" }), { status: 400 });
  }

  console.log("Received Cash App webhook:", payload);

  // 4. Find the corresponding pending transaction in the database
  // You need a way to link the Cash App transactionId from the email
  // to a transaction record in your database.
  // Ideally, when a user initiates a Cash App deposit on your platform,
  // you would create a PENDING transaction and store the expected Cash App
  // transaction ID (if you can predict it or instruct the user to include a reference)
  // or a unique reference that the user includes in the Cash App memo.

  // Assuming you store the Cash App transaction ID or a unique reference
  // in the 'reference' field of your 'Transaction' model when the user initiates the deposit.
  // Or, if the transaction ID from the email is truly unique and reliable,
  // you could potentially store it in the 'reference' field upon submission.

  try {
    // Attempt to find a pending deposit transaction matching the transactionId from the webhook
    const pendingTransaction = await db.transaction.findFirst({
      where: {
        // Match by transaction ID from the webhook
        reference: payload.transactionId,
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.PENDING,
      },
      include: {
        profile: {
          // Include the related profile to find the user
          select: { userId: true },
        },
      },
    });

    if (!pendingTransaction) {
      console.warn(`No pending deposit transaction found for transactionId: ${payload.transactionId}`);
      // It's possible the transaction was already processed or doesn't exist.
      // Return success to avoid unnecessary retries from the worker, but log the event.
      return new Response(JSON.stringify({ message: "Transaction not found or already processed" }), {
        status: 200,
      });
    }

    // 5. Update the transaction status and credit the user's balance
    // Use a transaction to ensure both updates happen atomically
    await db.$transaction(async (prisma) => {
      // Update the transaction status to COMPLETED
      await db.transaction.update({
        where: { id: pendingTransaction.id },
        data: {
          status: TransactionStatus.COMPLETED,
          processedAt: new Date(),
          // Optionally store the actual amount received if it differs from the initiated amount
          // amount: Math.round(payload.amount), // Use received amount
          metadata: {
            ...(pendingTransaction.metadata as object), // Preserve existing metadata
            cashAppWebhook: JSON.stringify(payload), // Store the full webhook payload for auditing
          },
        },
      });

      // Credit the user's balance
      // Find the user associated with the profile
      const user = await db.user.findUnique({
        where: { id: pendingTransaction.profile.userId },
      });

      if (user) {
        await db.user.update({
          where: { id: user.id },
          data: {
            balance: {
              increment: Math.round(payload.amount), // Increment user balance by the received amount
            },
          },
        });
        console.log(
          `Successfully credited user ${user.id} with amount ${payload.amount} for transaction ${pendingTransaction.id}`
        );
      } else {
        console.error(
          `User not found for profile ID ${pendingTransaction.profileId} associated with transaction ${pendingTransaction.id}`
        );
        // This indicates a data inconsistency, needs investigation
      }

      // TODO: Implement bonus logic here if applicable, based on the deposit amount
      // For example:
      if (payload.amount >= 500) {
        //const bonusAmount = calculateBonus(payload.amount);
        // await prisma.user.update({  });
        // await prisma.transaction.create({  });
      }
    });

    // 6. Return a success response
    return new Response(JSON.stringify({ message: "Deposit confirmed and user balance updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing Cash App webhook:", error);
    // Return a 500 error to indicate failure, which might prompt the worker to retry
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

// Example of how you might include this in your Bun server's routing:
/*
import { depositRoutes } from './depositRoutes'; // Assuming your other deposit routes are here
import { handleCashAppWebhook } from './cashappWebhook'; // Import this new function

// In your main server file (e.g., index.ts or server.ts)
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle deposit-related routes
    if (path.startsWith('/api/deposit')) { // Example path prefix
        const route = path.substring('/api/deposit'.length); // Extract the specific route part
        const depositResponse = await depositRoutes(req, route);
        if (depositResponse !== false) { // depositRoutes returns false if route not handled
            return depositResponse;
        }
    }

    // Handle the Cash App webhook route
    if (path === '/webhooks/cashapp' && req.method === 'POST') {
        return await handleCashAppWebhook(req);
    }


    // Handle other routes...
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server listening on port ${server.port}`);
*/
