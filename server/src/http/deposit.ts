import { BunRequest } from "bun";
import { NETWORK_CONFIG } from "shared";
import { getUserFromHeader } from "./auth";
import type {
  GetDepositResponse,
  SubmitDepositResponse,
  GetDepositHistoryResponse,
  DepositItem,
  DepositHistoryResponse,
} from "shared/interface/deposit";
import db from "../db/prisma";

export async function getDepositConfig(req: BunRequest): Promise<Response> {
  const user = await getUserFromHeader(req);
  if (!user) return new Response(JSON.stringify({ code: 401, message: "Unauthorized" }), { status: 401 });

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

export async function submitDeposit(req: BunRequest): Promise<Response> {
  const user = await getUserFromHeader(req);
  if (!user || !user.activeProfileId) {
    return new Response(JSON.stringify({ code: 401, message: "Unauthorized" }), { status: 401 });
  }
  if (!user) return new Response(JSON.stringify({ code: 401, message: "Unauthorized" }), { status: 401 });

  const data = await req.json();
  const deposit = await db.transaction.create({
    data: {
      type: "DEPOSIT",
      amount: Number(data.amount),
      profileId: user.activeProfileId as string,
      status: "PENDING",
      paymentMethod: data.method,
      metadata: data.details,
    },
  });

  const response: SubmitDepositResponse = {
    code: 200,
    data: {
      transactionId: deposit.id,
      status: deposit.status,
    },
    message: "Deposit submitted",
  };

  return new Response(JSON.stringify(response));
}

export async function getDepositHistory(req: BunRequest): Promise<Response> {
  const user = await getUserFromHeader(req);
  if (!user || !user.activeProfileId) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Unauthorized",
        data: { total_pages: 0, record: [] },
      }),
      { status: 401 }
    );
  }
  if (!user)
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Unauthorized",
        data: { total_pages: 0, record: [] },
      }),
      { status: 401 }
    );

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
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const response: GetDepositHistoryResponse = {
    code: 200,
    data: {
      total_pages: Math.ceil(count / limit),
      record: records.map((t) => ({
        id: Number(t.id),
        created_at: Math.floor(t.createdAt.getTime() / 1000),
        type: t.type,
        amount: t.amount.toString(),
        status: t.status === "COMPLETED" ? 1 : 0,
        note: "",
        currency: "USD",
      })),
    },
    message: "Success",
  };

  return new Response(JSON.stringify(response));
}

export async function depositRoutes(req: BunRequest, route: string): Promise<Response | boolean> {
  try {
    switch (route) {
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_CONFIG:
        return await getDepositConfig(req);
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_SUBMIT:
        return await submitDeposit(req);
      case NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_HISTORY:
        return await getDepositHistory(req);
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
