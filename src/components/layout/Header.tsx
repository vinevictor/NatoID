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
        <header className="h-[100px] bg-gray-900 text-white flex items-center justify-between px-8 shadow-md">

            <a href="/home" className="text-2xl font-bold">
                Home
            </a>

            <input
                type="text"
                placeholder="Digite O CPF Do Cliente"
                className="p-3 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handlesearch();
                    }
                }}
            />

            <div className="flex gap-4">
                <a
                    href="/cliente"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white"
                >
                    Nato-ID
                </a>

                <a
                    href="/login"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold text-white"
                >
                    Login
                </a>

            </div>
        </header>
    );
}
