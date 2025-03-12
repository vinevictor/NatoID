import AuthService from "@/modules/auth/service/auth-service"
import { NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: any) {
        await AuthService.destroySession()

        const loginUrl = new URL('/login', request.nextUrl.origin);

        return NextResponse.redirect(loginUrl);
    
 
}