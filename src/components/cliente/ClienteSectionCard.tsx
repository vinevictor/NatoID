import React from "react";

// A interface define as "props" que o componente aceita.
// Ele precisa de um 'title' (string) e de 'children' (os campos do formulário que ficarão dentro dele).
interface ClienteSectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const ClienteSectionCard = ({
  title,
  children
}: ClienteSectionCardProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
