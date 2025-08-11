import React from "react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const statusClasses: { [key: string]: string } = {
    ENVIADO: "bg-blue-600 text-white",
    APROVADO: "bg-green-100 text-green-800",
    REJEITADO: "bg-red-100 text-red-800",
    AGUARDANDO: "bg-gray-100 text-gray-800"
  };
  return (
    <span
      className={`${baseClasses} ${
        statusClasses[status] || statusClasses.AGUARDANDO
      }`}
    >
      {status}
    </span>
  );
};
