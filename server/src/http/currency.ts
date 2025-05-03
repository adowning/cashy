import { BunRequest } from "bun";
import { NETWORK_CONFIG } from "shared";
import { GetCurrencyBalanceList, GetCurrencyBalanceListResponse } from "shared/interface/currency";
import { getUserFromHeader } from "./auth";

export async function getCurrencyList(req: BunRequest) {
  const user: any = await getUserFromHeader(req);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized", code: 401 }), { status: 401 });
  }

  const list: GetCurrencyBalanceList = {
    amount: user.activeProfile.balance.toString(),
    availabe_balance: user.activeProfile.balance.toString(),
    real: user.activeProfile.balance.toString(),
    bonus: user.activeProfile.balance.toString(),
    currency: user.activeProfile.balance.toString(),
  };

  const response: GetCurrencyBalanceListResponse = {
    code: 200,
    data: [list],
    message: "no fkin clue",
  };

  return new Response(JSON.stringify(response));
}

export async function currencyRoutes(req: BunRequest, route: string) {
  try {
    switch (route) {
      case NETWORK_CONFIG.CURRENCY.CURRENCY_LIST:
        return await getCurrencyList(req);
      default:
        return false; ///new Response(JSON.stringify({ message: "Route not found", code: 404 }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: `Internal server error: ${error}`, code: 500 }), {
      status: 500,
    });
  }
}
