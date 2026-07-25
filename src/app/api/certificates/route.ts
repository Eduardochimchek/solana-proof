import { NextRequest, NextResponse } from "next/server";

import { toErrorResponse } from "@/lib/errors";
import { isValidPublicKey } from "@/lib/solana";
import { certificateService } from "@/services/certificate.service";

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get("wallet");

    if (!walletAddress || !isValidPublicKey(walletAddress)) {
      return NextResponse.json(
        { message: "Informe um endereço de carteira válido." },
        { status: 422 },
      );
    }

    const certificates = await certificateService.getByWallet(walletAddress);
    return NextResponse.json(certificates);
  } catch (error) {
    const { message, statusCode } = toErrorResponse(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
