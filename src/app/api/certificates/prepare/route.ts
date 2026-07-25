import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { toErrorResponse } from "@/lib/errors";
import { certificateService } from "@/services/certificate.service";
import { prepareStatementSchema } from "@/validators/certificate";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    const input = prepareStatementSchema.parse({
      title: formData.get("title"),
      description: formData.get("description") ?? undefined,
      recipientName: formData.get("recipientName") ?? undefined,
      walletAddress: formData.get("walletAddress"),
    });

    const response =
      file instanceof File && file.size > 0
        ? await certificateService.prepareDocument({ ...input, file })
        : await certificateService.prepareStatement(input);

    return NextResponse.json(response);
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
