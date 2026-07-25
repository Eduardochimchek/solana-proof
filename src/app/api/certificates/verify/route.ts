import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { toErrorResponse } from "@/lib/errors";
import { certificateService } from "@/services/certificate.service";
import { verifyLookupSchema } from "@/validators/certificate";

export async function GET(request: NextRequest) {
  try {
    const { query } = verifyLookupSchema.parse({
      query: request.nextUrl.searchParams.get("query"),
    });

    const certificate = await certificateService.findByHashOrSignature(query.trim());

    if (!certificate) {
      return NextResponse.json(
        { message: "Nenhum certificado encontrado para esse hash ou assinatura." },
        { status: 404 },
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message ?? "Consulta inválida." },
        { status: 422 },
      );
    }
    const { message, statusCode } = toErrorResponse(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
