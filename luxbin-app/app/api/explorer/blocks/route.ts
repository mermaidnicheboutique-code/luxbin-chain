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

export async function GET() {
  try {
    // Get latest block number
    const latestBlockNumber = await rpcCall("eth_blockNumber");

    if (!latestBlockNumber) {
      return NextResponse.json({ blocks: [] });
    }

    const blockNum = parseInt(latestBlockNumber, 16);
    const blocks = [];

    // Fetch last 10 blocks
    for (let i = 0; i < Math.min(10, blockNum + 1); i++) {
      const blockNumberHex = "0x" + (blockNum - i).toString(16);
      const block = await rpcCall("eth_getBlockByNumber", [blockNumberHex, false]);

      if (block) {
        blocks.push(block);
      }
    }

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 });
  }
}
