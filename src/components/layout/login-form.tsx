"use client";

import { login } from "../../modules/auth/actions/auth-action";
import { useState } from "react";

export default function LoginForm() {


  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result?.error) {
      setError(result.message);
    }
  }

  
  return (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="h-full max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Página de Login
        </h2>

        <form className="space-y-4" action={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition-all"
              placeholder="Digite seu Email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full text-black px-4 py-2 border border-gray-300
                         rounded-lg focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white
                       font-medium py-2.5 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
