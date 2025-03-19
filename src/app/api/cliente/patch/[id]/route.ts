import AuthService from "@/modules/auth/service/auth-service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try{
    const { id } = await params;
    const body = await request.json();

    const sessionData = await AuthService.sessionUser();
    const session = sessionData.data;

    if (!session || !session.token) {
        console.error("Usuário não autenticado. Token ausente.");
        return NextResponse.json(
            { error: true, message: "Usuário não autenticado." },
            { status: 401 }
        )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`,
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error("Falha em atualizar o cliente");
    }
    return NextResponse.json(response, { status: 200 });
    }catch(error){
        return NextResponse.json(
            { error: true, message: error, data: null },
            { status: 500 }
        )
    }
    
}