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
  { params }: { params: { number: string } }
) {
  try {
    const blockNumber = params.number;
    const blockNumberHex = blockNumber.startsWith("0x")
      ? blockNumber
      : "0x" + parseInt(blockNumber).toString(16);

    const block = await rpcCall("eth_getBlockByNumber", [blockNumberHex, true]);

    if (!block) {
      return NextResponse.json({ error: "Block not found" }, { status: 404 });
    }

    return NextResponse.json({ block });
  } catch (error) {
    console.error("Error fetching block:", error);
    return NextResponse.json({ error: "Failed to fetch block" }, { status: 500 });
  }
}
