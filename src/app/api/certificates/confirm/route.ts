import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { AppError, toErrorResponse } from "@/lib/errors";
import { certificateService } from "@/services/certificate.service";
import { confirmCertificateSchema } from "@/validators/certificate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => {
      throw new AppError("Corpo da requisição inválido.", 400);
    });
    const input = confirmCertificateSchema.parse(body);
    const certificate = await certificateService.confirm(input);
    return NextResponse.json(certificate);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message ?? "Dados inválidos." },
        { status: 422 },
      );
    }
    const { message, statusCode } = toErrorResponse(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
