import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try{
    const { id } = await params;
    const body = await request.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cliente/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
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