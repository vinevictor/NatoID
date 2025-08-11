"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout");
      if (!res.ok) {
        alert("Erro ao fazer logout");
      } else {
        router.push("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <header className="bg-white shadow">
      <nav
        className="mx-auto flex max-w-7xl text-black items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex gap-x-6">
          <a href="/home" className="text-sm font-semibold text-gray-900">
            <div className="h-fit w-fit overflow-visible">
              <Image
                height={144}
                width={288}
                src="/Logo_NatoBioID_03_1.svg"
                alt="Logo"
                className="h-10 w-fit object-cover"
              />
            </div>
          </a>
        </div>
        <div className="flex gap-x-6">
          <a href="/login" className="text-sm font-semibold text-gray-900">
            Login
          </a>
          <button
            className="text-sm font-semibold text-gray-900"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
