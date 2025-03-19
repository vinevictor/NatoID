import AuthService from "@/modules/auth/service/auth-service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const sessionData = await AuthService.sessionUser();
        const session = sessionData.data;

        if (!session || !session.token) {
            console.error("Usuário não autenticado. Token ausente.");
            return NextResponse.json(
                { error: true, message: "Usuário não autenticado." },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json(
                { error: true, message: data.message || "Erro desconhecido", status: data.statusCode || 400 },
                { status: data.statusCode || 400 }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: true, message: error instanceof Error ? error.message : "Erro desconhecido", data: null },
            { status: 500 }
        );
    }
}
