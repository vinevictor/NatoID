
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Sistema de Gestão - Todos os direitos
          reservados
        </p>
      </div>
    </footer>
  );
};
