"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const [cpf, setCpf] = useState("");
    const router = useRouter();


    const handlesearch = () => {
        if (cpf.trim()) {
            router.push(`/cliente/${cpf}`);
        }
    }


    return (
        <header className="bg-white shadow">
            <nav className="mx-auto flex max-w-7xl text-black items-center justify-between p-6 lg:px-8" aria-label="Global">

                <div className="flex-1 gap-2 flex justify-center px-4">
                    <input
                        type="text"
                        placeholder="Pesquisar CPF"
                        className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                        Pesquisar
                    </button>
                </div>


                <div className="flex gap-x-6">
                    <a href="/login" className="text-sm font-semibold text-gray-900">Login</a>
                    <a href="/cadastro" className="text-sm font-semibold text-gray-900">Cadastro</a>
                    <a href="/clientes" className="text-sm font-semibold text-gray-900">Clientes</a>
                </div>
            </nav>
        </header>
    )
}



