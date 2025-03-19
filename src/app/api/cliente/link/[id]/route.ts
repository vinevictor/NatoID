import AuthService from "@/modules/auth/service/auth-service";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const sessionData = await AuthService.sessionUser();
  const session = sessionData.data;

  if (!session || !session.token) {
    console.error("Usuário não autenticado. Token ausente.");
    return NextResponse.json(
      { error: true, message: "Usuário não autenticado." },
      { status: 401 }
    );
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cliente/link/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`
        }
      }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(
      { error: true, message: error, data: null },
      { status: 300 }
    );
  }
}
