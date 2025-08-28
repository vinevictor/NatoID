import AuthService from "@/modules/auth/service/auth-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const pass = Buffer.from(`${process.env.FCWBPASS}`).toString("base64");
    const { id, ...rest } = req;
    const sessionData = await AuthService.sessionUser();
    const session = sessionData.data;

    if (!session || !session.token) {
      console.error("Usuário não autenticado. Token ausente.");
      return NextResponse.json(
        { error: true, message: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const body = {
      ...rest,
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
    if (!response.ok) {
      throw new Error("Fala em criar a fcweb");
    }
    const data = await response.json();

    const reqFcw = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cliente/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({ idFcw: data.id })
      }
    );
    if (!reqFcw.ok) {
      throw new Error("Falha em Atualizar o id da fcweb");
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, message: error, data: null },
      { status: 500 }
    );
  }
}
