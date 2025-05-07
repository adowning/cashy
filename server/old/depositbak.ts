import { BunRequest } from "bun";
// Assuming NETWORK_CONFIG is defined in a shared module
import { NETWORK_CONFIG } from "shared/types/NetworkCfg";
// Assuming getUserFromHeader is a utility function for authentication
import { getUserFromHeader } from "./auth";
// Import necessary interfaces from your shared types
import type {
  GetDepositResponse,
  DepositItem,
  SubmitDepositResponse,
  GetDepositHistoryResponse,
  DepositHistoryResponse,
  DepositHistoryItem,
  GetOperatorDataResponse,
  GetProductsResponse,
  OperatorData,
  ProductWithoutTransactions,
} from "shared/interface/deposit"; // Adjust the path if necessary

// Import PrismaClient
import { TransactionStatus, TransactionType, User } from "../prisma/client";
import db from "../db/prisma";


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

// Helper function to fetch deposit configuration
async function getDepositConfig(req: BunRequest, user: User) {
  // Authenticate the user


  // --- Database Logic for Fetching Configuration ---
  // In a real application, you would fetch this data from your database.
  // Based on the provided schema, there isn't a dedicated 'DepositConfig' table.
  // Configuration might be stored in a 'Settings' table, or hardcoded/fetched
  // from a separate service.
  // For this example, we'll keep the placeholder structure but note where
  // database calls would ideally replace the sample data.

  // Example: Fetching active payment channels from a hypothetical 'PaymentChannel' table
  // const activeChannels = await prisma.paymentChannel.findMany({
  //     where: { isActive: true },
  // });
  // Organize channels by currency/type for the 'cfg' structure

  // Example: Fetching predefined deposit amounts from a hypothetical 'DepositAmountOption' table
  // const amountOptions = await prisma.depositAmountOption.findMany({
  //     orderBy: { amount: 'asc' },
  // });
  // const sampleAmountList = amountOptions.map(opt => opt.amount.toString());

  // Example: Fetching active bonus configurations from a hypothetical 'BonusConfig' table
  // const activeBonuses = await prisma.bonusConfig.findMany({
  //     where: { isActive: true, type: { in: ['DEPOSIT_FIXED', 'DEPOSIT_PERCENTAGE'] } },
  //     orderBy: { minAmount: 'asc' },
  // });
  // Map bonus data to the 'bonus' structure

  const sampleCurrencyCfg = {
    BRL: [
      { channel_id: "pix_1", channel_name: "PIX 1", channel_type: "BRL", min: 20, max: 150000 },
      { channel_id: "pix_2", channel_name: "PIX 2", channel_type: "BRL", min: 50, max: 200000 },
    ],
    USD: [{ channel_id: "usdt_trc20", channel_name: "USDT TRC20", channel_type: "USDT", min: 10, max: 10000 }],
    // Add other currencies and payment methods as needed, ideally fetched from DB
  };

  const sampleAmountList = ["20", "50", "100", "200", "500"]; // Sample predefined amounts, ideally fetched from DB

  const sampleBonusConfig = [
    { type: 0, min: 100, max: 500, award: 50 }, // Fixed bonus of 50 for deposits between 100 and 500
    { type: 1, min: 501, max: 0, rate: 0.1 }, // 10% bonus for deposits over 500 (max 0 means no max), ideally fetched from DB
    // Add other bonus rules as needed
  ];

  const depositUserSwitch = false; // Example switch for user info requirement, ideally fetched from DB

  const configData = {
    cfg: sampleCurrencyCfg,
    list: sampleAmountList,
    bonus: sampleBonusConfig,
    deposit_user_switch: depositUserSwitch,
    // Add other configuration fields as needed
  };
  // --- End Database Logic Placeholder ---

  const response: GetDepositResponse = {
    code: 200,
    data: configData,
    message: "Deposit configuration fetched successfully",
  };

  return new Response(JSON.stringify(response));
}

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

// Helper function to fetch deposit history
async function getDepositHistory(req: BunRequest) {
  // Authenticate the user
  const user: any = await getUserFromHeader(req);
  if (!user) {
    // Return unauthorized response if user is not authenticated
    return new Response(JSON.stringify({ message: "Unauthorized", code: 401 }), { status: 401 });
  }

  // Parse request parameters (e.g., pagination)
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  // --- Database Logic for Fetching History ---
  // Query the 'transaction' table for the user's deposit history with pagination.

  try {
    // Find the user's profile IDs
    const userProfiles = await db.profile.findMany({
      where: { userId: user.id },
      select: { id: true },
    });
    const profileIds = userProfiles.map((profile) => profile.id);

    if (profileIds.length === 0) {
      // User has no profiles, return empty history
      const emptyHistory: DepositHistoryResponse = { total_pages: 0, record: [] };
      const response: GetDepositHistoryResponse = {
        code: 200,
        data: emptyHistory,
        message: "No deposit history found",
      };
      return new Response(JSON.stringify(response));
    }

    // Fetch deposit transactions for the user's profiles
    const transactions = await db.transaction.findMany({
      where: {
        profileId: { in: profileIds }, // Filter by user's profile IDs
        type: TransactionType.DEPOSIT, // Filter for deposit transactions
      },
      orderBy: {
        createdAt: "desc", // Order by latest first
      },
      skip: (page - 1) * limit, // Apply pagination
      take: limit,
      select: {
        // Select the fields needed for DepositHistoryItem
        id: true,
        createdAt: true,
        type: true, // Will be 'DEPOSIT'
        amount: true,
        status: true,
        reference: true, // Using reference for note if available
        paymentMethod: true, // Using paymentMethod for type if needed
        profile: {
          // Select related profile to get currency
          select: { currency: true },
        },
      },
    });

    // Count total deposit transactions for pagination
    const totalRecords = await db.transaction.count({
      where: {
        profileId: { in: profileIds },
        type: TransactionType.DEPOSIT,
      },
    });

    const totalPages = Math.ceil(totalRecords / limit);

    // Map Prisma results to DepositHistoryItem interface
    const historyRecords: DepositHistoryItem[] = transactions.map((tx) => ({
      id: parseInt(tx.id), // Assuming id is a number or needs conversion
      created_at: tx.createdAt.getTime(), // Convert Date to timestamp
      type: tx.paymentMethod || tx.type, // Use payment method or transaction type
      amount: tx.amount.toString(), // Convert amount to string
      status: tx.status === TransactionStatus.COMPLETED ? 1 : 0, // Map status to 1 or 0
      note: tx.reference || "", // Use reference as note
      currency: tx.profile.currency, // Get currency from related profile
    }));

    const historyData: DepositHistoryResponse = {
      total_pages: totalPages,
      record: historyRecords,
    };
    // --- End Database Logic ---

    const response: GetDepositHistoryResponse = {
      code: 200,
      data: historyData,Q
      message: "Deposit history fetched successfully",
    };

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error("Failed to fetch deposit history:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch deposit history", code: 500 }), {
      status: 500,
    });
  }
}

// Main async function to handle deposit routes
export async function depositRoutes(req: BunRequest, route: string) {
  try {
    // Switch based on the requested route
    switch (route) {
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_CONFIG:
        return await getDepositConfig(req);
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_SUBMIT:
        return await submitDeposit(req);
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_HISTORY:
        return await getDepositHistory(req);
      default:
        // Return false or a 404 response if the route is not found
        // Returning false implies the route might be handled elsewhere
        return false;
      // Or: return new Response(JSON.stringify({ message: "Deposit route not found", code: 404 }), { status: 404 });
    }
  } catch (error) {
    // Log the error and return a generic internal server error response
    console.error("Error handling deposit route:", error);
    return new Response(JSON.stringify({ message: `Internal server error`, code: 500 }), {
      status: 500,
    });
  }
}
