"use client";

import Image from "next/image";
import { login } from "../../modules/auth/actions/auth-action";
export default function LoginForm() {
  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result.error) {
      alert(result.message);
    } else {
      window.location.href = "/home";
    }
  }

  return (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="h-full max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex w-full h-full justify-center" >
            <Image
              height={100}
              width={100}
              src="/Logo_NatoBioID_01.svg"
              alt="Logo"
              className="mx-auto h-36 w-auto"
            />
        </div>

        <form className="space-y-4" action={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-black mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-bold text-black mb-1"
            >
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
            className="w-full bg-[#6FBF96] hover:bg-[#4e926f] text-white
                       font-medium py-2.5 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
