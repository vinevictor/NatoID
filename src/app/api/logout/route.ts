import AuthService from "@/modules/auth/service/auth-service";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await AuthService.destroySession();
  } catch (error) {
    alert("ERRO AO DESTRUIR A SESSÃO:" + error);

    const loginUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  const loginUrl = new URL("/login", request.nextUrl.origin);
  return NextResponse.redirect(loginUrl);
}
