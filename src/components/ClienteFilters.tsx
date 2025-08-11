// /app/clientes/components/ClienteFilters.tsx

import React from "react";
import { FilterInput, FilterSelect } from "@/components/ui/FilterControls";
import { STATUS_CLIENTE, STATUS_GERAIS } from "@/lib/constants";

interface FiltersState {
  searchTerm: string;
  status: string;
  documento: string;
  biometria: string;
  telefone: string;
}

interface ClienteFiltersProps {
  filters: FiltersState;
  onFilterChange: (filterName: keyof FiltersState, value: string) => void;
  onClear: () => void;
  onRefresh: () => void;
}

export const ClienteFilters = React.memo(
  ({ filters, onFilterChange, onClear, onRefresh }: ClienteFiltersProps) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <FilterInput
          label="Nome ou CPF"
          placeholder="Buscar..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange("searchTerm", e.target.value)}
        />
        <FilterInput
          label="Telefone"
          placeholder="Filtrar..."
          value={filters.telefone}
          onChange={(e) => onFilterChange("telefone", e.target.value)}
        />
        <FilterSelect
          label="Status Cliente"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          options={STATUS_CLIENTE}
          defaultOption="Todos"
        />
        <FilterSelect
          label="Documento"
          value={filters.documento}
          onChange={(e) => onFilterChange("documento", e.target.value)}
          options={STATUS_GERAIS}
          defaultOption="Todos"
        />
        <FilterSelect
          label="Biometria"
          value={filters.biometria}
          onChange={(e) => onFilterChange("biometria", e.target.value)}
          options={STATUS_GERAIS}
          defaultOption="Todos"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Limpar Filtros
        </button>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Atualizar
        </button>
      </div>
    </div>
  )
);

ClienteFilters.displayName = "ClienteFilters";
