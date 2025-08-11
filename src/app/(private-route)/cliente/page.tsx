"use client";

import React, { useState, useMemo, useCallback } from "react";
import Loading from "@/app/loading";
import { CLIENTES_POR_PAGINA } from "@/lib/constants";
import { useClientesData } from "@/hooks/useClientesData";
import { ClienteFilters } from "@/components/ClienteFilters";
import { ClienteTable } from "@/components/ClienteTable";
import { PaginationControls } from "@/components/PaginationControls";

export default function ClientePage() {
  const { clientes, loading, error, refetch } = useClientesData();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    documento: "",
    biometria: "",
    telefone: ""
  });

  const handleFilterChange = useCallback(
    (filterName: keyof typeof filters, value: string) => {
      setFilters((prev) => ({ ...prev, [filterName]: value }));
      setCurrentPage(1);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      status: "",
      documento: "",
      biometria: "",
      telefone: ""
    });
    setCurrentPage(1);
  }, []);

  const filteredClientes = useMemo(() => {
    return clientes.filter((cliente) => {
      const term = filters.searchTerm.toLowerCase();
      return (
        (cliente.nome.toLowerCase().includes(term) ||
          cliente.cpf.includes(term)) &&
        (!filters.status || cliente.andamento === filters.status) &&
        (!filters.documento || cliente.statusdocumento === filters.documento) &&
        (!filters.biometria || cliente.statusbiometria === filters.biometria) &&
        (!filters.telefone || cliente.telefone.includes(filters.telefone))
      );
    });
  }, [clientes, filters]);

  const totalPages = Math.ceil(filteredClientes.length / CLIENTES_POR_PAGINA);
  const indexOfFirstCliente = (currentPage - 1) * CLIENTES_POR_PAGINA;
  const currentClientes = useMemo(
    () =>
      filteredClientes.slice(
        indexOfFirstCliente,
        indexOfFirstCliente + CLIENTES_POR_PAGINA
      ),
    [filteredClientes, indexOfFirstCliente]
  );

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Erro ao carregar dados: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Listagem de Clientes
        </h1>

        <ClienteFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
          onRefresh={refetch}
        />

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <ClienteTable clientes={currentClientes} />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
            onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            firstItem={indexOfFirstCliente + 1}
            lastItem={indexOfFirstCliente + currentClientes.length}
            totalItems={filteredClientes.length}
          />
        </div>
      </div>
    </div>
  );
}
