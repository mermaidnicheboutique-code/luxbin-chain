import { NextResponse } from "next/server";

const RPC_URL = process.env.NEXT_PUBLIC_NICHE_RPC || "http://localhost:8545";

async function rpcCall(method: string, params: any[] = []) {
  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params,
      }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("RPC call error:", error);
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: { hash: string } }
) {
  try {
    const txHash = params.hash;
    const transaction = await rpcCall("eth_getTransactionByHash", [txHash]);

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 });
  }
}
