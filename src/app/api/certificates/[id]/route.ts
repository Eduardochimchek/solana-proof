import { NextResponse } from "next/server";

import { toErrorResponse } from "@/lib/errors";
import { certificateService } from "@/services/certificate.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const certificate = await certificateService.getById(id);

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificado não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    const { message, statusCode } = toErrorResponse(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
