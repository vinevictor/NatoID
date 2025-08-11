import React from "react";
import { Module } from "@/types";

interface ModuleCardProps {
  module: Module;
  onClick: (route: string) => void;
}

export const ModuleCard = ({ module, onClick }: ModuleCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className={`p-6 ${module.color} text-white`}>
        <div className="flex justify-between items-center">
          {module.icon}
          <h3 className="text-xl font-bold">{module.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4">{module.description}</p>
        <button
          onClick={() => onClick(module.route)}
          className={`w-full py-2 px-4 rounded-md transition-colors text-white ${module.color}`}
        >
          Acessar Módulo
        </button>
      </div>
    </div>
  );
};
