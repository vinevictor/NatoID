'use server'

import { ApiResponse } from "@/app/types/apiResponse.type"
import AuthService from "@/modules/auth/service/auth-service"
import { JWTPayload } from "jose"
import { NextApiResponse } from "next"

export async function login(formData : FormData) {
    const emailForm = formData.get('email') as string
    const password = formData.get('password') as string

    const data = {
        email: emailForm,
        password: password
    }


    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const res = await req.json()
    const  {nome, email} = res.user || {}
    const token = res.token

    if(!nome || !email|| !token){
        return { error: true, message: "Usuario ou senha incorretos.", data: null };
    }

    const dataUser = {
        name: nome,
        email: email,
        token: token
    }

    await AuthService.createSessionToken(dataUser)
    
    return { error: false, message: "", data: dataUser };    
}


export  async function createUser(form: FormData) {
    const nome = form.get("nome") as string;
    const email = form.get("email") as string;
    const password = form.get("senha") as string;
    const confirmpassword = form.get("confirmar-password") as string;

    if (!nome || !email || !password || !confirmpassword) {
        return { error: true, message: "Todos os campos são obrigatórios.", data: null };
    }

    if (password !== confirmpassword) {
        return { error: true, message: "As senhas não conferem.", data: null };
    }

    const data = {
        nome: nome,
        email: email,
        password: password,
    };

    const session: ApiResponse<JWTPayload> = await AuthService.sessionUser();

    if (session.error) {
        return { error: true, message: session.message, data: null };
    }

    const sessionToken: JWTPayload | null = session.data;

    if (!sessionToken) {
        return { error: true, message: "Nenhuma sessão encontrada.", data: null };
    }

    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken.token}`,
            },
            body: JSON.stringify(data),
        });

        if (!req.ok) {
            const errorData = await req.json();
            return { error: true, message: errorData.message || "Erro desconhecido ao cadastrar.", data: null };
        }

        const res: NextApiResponse = await req.json();

        return {
            error: false,
            message: "Usuário criado com sucesso!",
            data: res,
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { error: true, message: error.message || "Erro inesperado ao processar o cadastro.", data: null };
    }
}
