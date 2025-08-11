"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useUsuariosData } from "@/hooks/useUsuariosData";
import { UsuarioToolbar } from "@/components/usuario/UsuarioToolbar";
import { UsuariosTable } from "@/components/usuario/UsuariosTable";
import { Pagination } from "@/components/ui/Pagination";
import { USUARIOS_POR_PAGINA } from "@/lib/constants";

export default function UsuariosPage() {
  const router = useRouter();
  const { usuarios, loading, error, refetch } = useUsuariosData();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsuarios = useMemo(() => {
    return usuarios.filter((usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [usuarios, searchTerm]);

  const totalPages = Math.ceil(filteredUsuarios.length / USUARIOS_POR_PAGINA);
  const indexOfFirstUsuario = (currentPage - 1) * USUARIOS_POR_PAGINA;
  const currentUsuarios = useMemo(
    () =>
      filteredUsuarios.slice(
        indexOfFirstUsuario,
        indexOfFirstUsuario + USUARIOS_POR_PAGINA
      ),
    [filteredUsuarios, indexOfFirstUsuario]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  const itemsInfo = `Mostrando ${indexOfFirstUsuario + 1} a ${
    indexOfFirstUsuario + currentUsuarios.length
  } de ${filteredUsuarios.length} usuários`;

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 mt-10">Erro: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <UsuarioToolbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearFilters={clearFilters}
        onRefresh={refetch}
        onCadastrar={() => router.push("/usuario/cadastro")}
      />
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <UsuariosTable usuarios={currentUsuarios} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsInfo={itemsInfo}
        />
      </div>
    </div>
  );
}
