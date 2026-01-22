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
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;
    const balance = await rpcCall("eth_getBalance", [address, "latest"]);

    if (balance === null) {
      return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 });
    }

    return NextResponse.json({ balance, address });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json({ error: "Failed to fetch address" }, { status: 500 });
  }
}
