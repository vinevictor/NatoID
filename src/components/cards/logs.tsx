import { Cliente } from "@/app/types/cliente.type";
import { useState } from "react";
interface Props {
  cliente: Cliente;
}

export default function Logs({ cliente }: Props) {
  return (
    <div className="mt-6 w-full">
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 font-medium flex justify-between items-center">
          <span>Logs</span>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">Sistema</span>
        </div>
        <div className="p-1 bg-gray-900">
          <pre className="text-green-400 font-mono text-sm p-3 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
            {cliente?.logs || "Nenhum log encontrado para este cliente."}
          </pre>
        </div>
      </div>
    </div>
  );
}
