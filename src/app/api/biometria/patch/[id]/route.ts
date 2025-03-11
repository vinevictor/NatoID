import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try{
    const { id } = await params;
    const body = await request.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/biometria/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error("Falha em atualizar a biometria");
    }
    
    return NextResponse.json({error: false, message: "Atualizado com sucesso"}, {status: 200});
}catch(error){
    return NextResponse.json(
        { error: true, message: error, data: null },
        { status: 500 }
    )
}


}