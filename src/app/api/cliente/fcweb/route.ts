import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const pass = Buffer.from(`${process.env.FCWBPASS}`).toString("base64");
    const body = {
      ...req,
      s_alerta: "ATIVADO",
      referencia:
        new Date().toISOString().split("T")[0].split("-").reverse().join("-") +
        "." +
        new Date().toISOString().split("T")[1].split(".")[0],
      unidade: "1",
      criou_fc: "API",
      contador: "NATO_",
      tipocd: "Bird500",
      formapgto: "PENDURA"
    };
    const response = await fetch(
      `https://apifcweb.redebrasilrp.com.br/fcweb/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${pass}`
        },
        body: JSON.stringify(body)
      }
    );
    console.log("🚀 ~ POST ~ response:", await response.json());
    if (!response.ok) {
      throw new Error("Falha em atualizar o documento");
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, message: error, data: null },
      { status: 500 }
    );
  }
}
