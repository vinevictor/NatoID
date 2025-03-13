"use client";
import { useRouter } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function Home() {
  const router = useRouter();

  const modules = [
    {
      id: "clientes",
      title: "Clientes",
      description: "Gerenciamento e listagem de clientes",
      icon: (
        <FaUserFriends  className="w-10 h-10"/>
      ),
      route: "/cliente",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
        id: "usuarios",
        title: "Usuarios",
        description: "Gerenciamento e listagem de usuarios",
        icon: (
          <MdOutlineAdminPanelSettings  className="w-10 h-10"/>
        ),
        route: "/usuario",
        color: "bg-[#0d2730] hover:bg-gray-700"
      },
  ];

  const handleModuleClick = (route : string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#0d2730] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Sistema de Gestão</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Módulos do Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className={`p-6 ${module.color} text-white`}>
                <div className="flex justify-between items-center">
                  {module.icon}
                  <h3 className="text-xl font-bold">{module.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{module.description}</p>
                <button
                  onClick={() => handleModuleClick(module.route)}
                  className={`w-full py-2 px-4 rounded-md transition-colors text-white ${module.color}`}
                >
                  Acessar Módulo
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Sistema de Gestão - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}