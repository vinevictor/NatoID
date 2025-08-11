import { FaUserFriends } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "clientes",
    title: "Clientes",
    description: "Gerenciamento e listagem de clientes",
    icon: <FaUserFriends className="w-10 h-10" />,
    route: "/cliente",
    color: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: "usuarios",
    title: "Usuários",
    description: "Gerenciamento e listagem de usuários",
    icon: <MdOutlineAdminPanelSettings className="w-10 h-10" />,
    route: "/usuario",
    color: "bg-[#0d2730] hover:bg-gray-700"
  }
];
