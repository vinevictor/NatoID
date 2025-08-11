import React from "react";

interface UsuarioToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  onRefresh: () => void;
  onCadastrar: () => void;
}

export const UsuarioToolbar = ({
  searchTerm,
  onSearchChange,
  onClearFilters,
  onRefresh,
  onCadastrar
}: UsuarioToolbarProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Listagem de Usuários
        </h1>
        <button
          onClick={onCadastrar}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Cadastrar Novo Usuário
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Buscar por Nome
          </label>
          <input
            id="search"
            type="text"
            placeholder="Digite o nome para buscar..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full max-w-sm text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Limpar Filtros
          </button>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Atualizar
          </button>
        </div>
      </div>
    </>
  );
};
