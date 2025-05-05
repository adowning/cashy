import { BunRequest } from "bun";
import { NETWORK_CONFIG, User } from "shared";
import { getUserFromHeader } from "../auth";
import type {
  GetDepositResponse,
  SubmitDepositResponse,
  GetDepositHistoryResponse,
  GetProductsResponse,
  ProductWithoutTransactions,
  GetOperatorDataResponse,
  OperatorData,
  DepositItem,
} from "shared/interface/deposit";
import db from "../../db/prisma";
import { TransactionStatus, TransactionType } from "../../prisma/client";

export async function getDepositConfig(req: BunRequest): Promise<Response> {
  const config = {
    bonus: [{ type: 0 }],
    methods: [
      {
        id: "pix",
        icon: "payment/pix.png",
        name: "PIX",
        min: 10,
        max: 5000,
      },
    ],
  };

  const response: GetDepositResponse = {
    code: 200,
    data: config,
    message: "Success",
  };

  return new Response(JSON.stringify(response));
}
export async function getProducts(req: BunRequest): Promise<Response> {
  const products = await db.product.findMany({
    orderBy: { priceInCents: "asc" },
    include: {
      // operator: true,
      // transactions: true,
    },
  });

  const response: GetProductsResponse = {
    code: 200,
    products,
    message: "Products",
  };

  return new Response(JSON.stringify(response));
}

export async function getOperatorData(req: BunRequest, user: User): Promise<Response> {
  const _operator = await db.operator.findUnique({
    where: {
      id: user.activeProfile.shopId as string,
    },
    include: {
      products: true,
    },
  });
  if (_operator == null) throw new Error("Operator not found");
  const products: ProductWithoutTransactions[] = _operator.products.map((product): ProductWithoutTransactions => {
    return {
      id: product.id,
      priceInCents: product.priceInCents,
      description: product.description,
      transactions: [],
      title: product.title,
      url: product.url,
      type: product.type,
      bonusCode: null,
      bonusTotalInCredits: null,
      amountToReceiveInCredits: 0,
      bestValue: 0,
      discountInCents: 0,
      bonusSpins: null,
      isPromo: null,
      totalDiscountInCents: 0,
      shopId: null,
      createdAt: product.createdAt,
      updatedAt: null,
      operator: null,
    };
  });

  const operator: OperatorData = {
    id: _operator.id,
    acceptedPayments: _operator.acceptedPayments,
    products,
  };
  const response: GetOperatorDataResponse = {
    code: 200,
    operator,
    message: "Operator data with products",
  };

  return new Response(JSON.stringify(response));
}

// export async function submitDeposit(req: BunRequest, user: User): Promise<Response> {
//   const data = await req.json();
//   const deposit = await db.transaction.create({
//     data: {
//       type: "DEPOSIT",
//       amount: Number(data.amount),
//       profileId: user.activeProfileId as string,
//       status: "PENDING",
//       paymentMethod: data.method,
//       metadata: data.details,
//     },
//   });

//   const response: SubmitDepositResponse = {
//     code: 200,
//     data: {
//       transactionId: deposit.id,
//       status: deposit.status,
//     },
//     message: "Deposit submitted",
//   };

//   return new Response(JSON.stringify(response));
// }

// Helper function to submit a deposit
async function submitDeposit(req: BunRequest) {
  // Authenticate the user
  const user: any = await getUserFromHeader(req);
  if (!user) {
    // Return unauthorized response if user is not authenticated
    return new Response(JSON.stringify({ message: "Unauthorized", code: 401 }), { status: 401 });
  }

  // Parse the request body to get deposit details
  const depositData: DepositItem = await req.json();

  // --- Database and Payment Gateway Logic for Processing Deposit ---
  // In a real application, you would:
  // 1. Validate the deposit data (amount, channel, user info if required).
  // 2. Create a new 'transaction' record in the database with status PENDING.
  // 3. Interact with a payment gateway to initiate the deposit.
  // 4. Handle different payment methods (e.g., generate PIX code, redirect to payment page).
  // 5. Update the 'transaction' status based on the payment gateway response (often via webhooks).
  // 6. Update the user's balance upon successful payment confirmation (usually via webhook).

  console.log("Received deposit submission:", depositData);

  let submissionResult: any = {}; // Placeholder for the result from payment gateway
  let newTransaction;

  try {
    // 1. Validate deposit data (basic example)
    if (typeof depositData.amount !== "number" || depositData.amount <= 0) {
      return new Response(JSON.stringify({ message: "Invalid deposit amount", code: 400 }), { status: 400 });
    }
    if (!depositData.channels_id) {
      return new Response(JSON.stringify({ message: "Payment channel not specified", code: 400 }), {
        status: 400,
      });
    }

    // Find the user's active profile to link the transaction
    const userProfile = await db.profile.findFirst({
      where: { userId: user.id, isActive: true },
    });

    if (!userProfile) {
      return new Response(JSON.stringify({ message: "User profile not found", code: 404 }), { status: 404 });
    }

    // 2. Create a new 'transaction' record with status PENDING
    newTransaction = await db.transaction.create({
      data: {
        type: TransactionType.DEPOSIT, // Use the enum
        amount: Math.round(Number(depositData.amount)), // Store amount as Int, assuming currency is in smallest unit or handle float carefully
        profileId: userProfile.id,
        status: TransactionStatus.PENDING, // Initial status
        paymentMethod: depositData.channels_id,
        paymentDetails: {
          // Store relevant details, e.g., user info if collected
          ...(depositData.id_number && { id_number: depositData.id_number }),
          ...(depositData.first_name && { first_name: depositData.first_name }),
          ...(depositData.last_name && { last_name: depositData.last_name }),
          // Add other details from paymentData as needed
        },
        isRealMoney: true, // Assuming deposits are real money
        // reference: '...', // Generate or get a unique reference from payment gateway
        // processedAt: null, // Set upon successful processing
      },
    });

    // 3. Interact with a payment gateway (simulated)
    // This is where you would call your payment gateway's API
    // The response from the payment gateway would determine submissionResult

    // Example: Simulate PIX payment response
    if (depositData.channels_id.startsWith("pix")) {
      // Simulate generating a PIX code URL from a payment gateway
      submissionResult = {
        code_url: `simulated_pix_code_${newTransaction.id}_${Date.now()}`,
        // Add other PIX specific data if needed
      };
      // In a real scenario, you might update the transaction with payment gateway details here
      // await prisma.transaction.update({
      //     where: { id: newTransaction.id },
      //     data: { reference: 'gateway_ref_id', paymentDetails: { ...newTransaction.paymentDetails, gatewayResponse: submissionResult } },
      // });
    } else {
      // Simulate a redirect URL for other payment methods
      submissionResult = {
        url: `simulated_payment_gateway_url_${newTransaction.id}_${Date.now()}`,
        // Add other redirect specific data if needed
      };
      // In a real scenario, you might update the transaction with payment gateway details here
      // await prisma.transaction.update({
      //     where: { id: newTransaction.id },
      //     data: { reference: 'gateway_ref_id', paymentDetails: { ...newTransaction.paymentDetails, gatewayResponse: submissionResult } },
      // });
    }

    // 5. & 6. Updating transaction status and user balance happens AFTER payment confirmation
    // This is typically handled by a webhook endpoint that your payment gateway calls
    // when the payment is successful. The webhook would find the transaction by its reference
    // and update its status to COMPLETED, then update the user's balance.

    // Example of what a webhook might do (NOT part of this submit function):
    /*
      async function handlePaymentWebhook(paymentData: any) {
          const transaction = await prisma.transaction.findUnique({ where: { reference: paymentData.referenceId } });
          if (transaction && paymentData.status === 'SUCCESS') {
              await prisma.$transaction([
                  prisma.transaction.update({
                      where: { id: transaction.id },
                      data: { status: TransactionStatus.COMPLETED, processedAt: new Date() },
                  }),
                  prisma.user.update({
                      where: { id: transaction.profile.userId }, // Assuming profile relation is loaded or user ID is directly on transaction
                      data: { balance: { increment: transaction.amount } },
                  }),
                  // Optionally add bonus here if applicable
              ]);
          } else if (transaction && paymentData.status === 'FAILED') {
               await prisma.transaction.update({
                  where: { id: transaction.id },
                  data: { status: TransactionStatus.FAILED, processedAt: new Date() },
              });
          }
      }
      */
  } catch (error) {
    console.error("Failed to process deposit submission:", error);
    // If transaction was created but gateway failed, maybe update transaction status to FAILED
    if (newTransaction) {
      await db.transaction
        .update({
          where: { id: newTransaction.id },
          data: { status: TransactionStatus.FAILED, processedAt: new Date(), metadata: { error: error.message } },
        })
        .catch(console.error); // Log update error but don't block the original error response
    }
    return new Response(JSON.stringify({ message: "Failed to process deposit", code: 500 }), { status: 500 });
  }

  // --- End Database and Payment Gateway Logic ---

  const response: SubmitDepositResponse = {
    code: 200,
    data: submissionResult, // Return the result from the payment process (e.g., code_url or redirect url)
    message: "Deposit submitted successfully",
  };

  return new Response(JSON.stringify(response));
}

// async function handlePaymentWebhook(paymentData: any) {
//   const transaction = await db.transaction.findUnique({ where: { reference: paymentData.referenceId } });
//   if (transaction && paymentData.status === "SUCCESS") {
//     await db.$transaction([
//       db.transaction.update({
//         where: { id: transaction.id },
//         data: { status: TransactionStatus.COMPLETED, processedAt: new Date() },
//       }),
//       db.profile.update({
//         where: { id: transaction.profileId
//         },
//         data: { balance: { increment: transaction.amount } },
//       }),
//       // Optionally add bonus here if applicable
//     ]);
//   } else if (transaction && paymentData.status === "FAILED") {
//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { status: TransactionStatus.FAILED, processedAt: new Date() },
//     });
//   }
// }
export async function getDepositHistory(req: BunRequest, user: User): Promise<Response> {
  const params = new URL(req.url).searchParams;
  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 10;
  const [count, records] = await Promise.all([
    db.transaction.count({
      where: {
        profileId: user.activeProfileId as string,
        type: "DEPOSIT",
      },
    }),
    db.transaction.findMany({
      where: {
        profileId: user.activeProfileId as string,
        type: "DEPOSIT",
      },
      include: {
        product: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const statusarray = ["PENDING", "COMPLETED", "FAILED", "CANCELLED", "REFUNDED", "EXPIRED", "REJECTED"];
  const response: GetDepositHistoryResponse = {
    code: 200,
    data: {
      total_pages: Math.ceil(count / limit),
      record: records.map((t) => ({
        id: Number(t.id),
        created_at: Math.floor(t.createdAt.getTime() / 1000),
        type: t.type,
        product: t.product,
        amount: t.amount.toString(),
        status: statusarray[t.status], // === "COMPLETED" ? 1 : 0,
        note: "",
        currency: "USD",
      })),
    },
    message: "Success",
  };

  return new Response(JSON.stringify(response));
}

export async function depositRoutes(req: BunRequest, route: string): Promise<Response | boolean> {
  console.log("x");

  const user = await getUserFromHeader(req);
  if (!user || !user.activeProfile) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Unauthorized",
        data: { total_pages: 0, record: [] },
      }),
      { status: 401 }
    );
  }
  console.log("x");

  try {
    switch (route) {
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_CONFIG:
        return await getDepositConfig(req);
      case NETWORK_CONFIG.DEPOSIT_PAGE.PRODUCTS:
        return await getProducts(req);
      case NETWORK_CONFIG.DEPOSIT_PAGE.OPERATOR_DATA:
        return await getOperatorData(req, user);
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_SUBMIT:
        return await submitDeposit(req, user);
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_HISTORY:
        return await getDepositHistory(req, user);
      default:
        return false;
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: `Internal server error: ${error}`,
        code: 500,
      }),
      { status: 500 }
    );
  }
}
