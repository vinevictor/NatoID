"use client";
import Loading from "@/app/loading";
import { Usuario } from "@/app/types/usuario.type";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/table/tablecomponent";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function UsuariosPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([] as Usuario[]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usuariosPorPagina = 20;


  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => {
    setLoading(true);
    try {
      const reqUser = await fetch("/api/usuario/getall");
      const resUser = await reqUser.json();
      if (resUser.status && resUser.status != 200) {
        throw new Error("Erro ao buscar usuarios");
      }
      setUsuarios(resUser);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao carregar os dados"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleCadastrarUsuario = () => {
    router.push('/usuario/cadastro');
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesNome =
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesNome
    ;
  });

  const indexOfLastUsuario = currentPage * usuariosPorPagina;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina;
  const currentUsuarios = filteredUsuarios.slice(
    indexOfFirstUsuario,
    indexOfLastUsuario
  );

  const totalPages = Math.ceil(filteredUsuarios.length / usuariosPorPagina);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                Listagem de Usuários
              </h1>
              <button
                onClick={handleCadastrarUsuario}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Cadastrar Novo Usuário
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Filtros
              </h2>

              <div className="flex flex-wrap items-start gap-4 mb-4">
                <div className="flex-1 min-w-[240px]">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      type="text"
                      placeholder="Buscar por nome..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full text-black p-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                </div>

              <div className="flex justify-between">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  Limpar Filtros
                </button>

                <button
                  onClick={fetchTable}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Atualizar
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <TableContainer>
                <Table className="min-w-full">
                  <TableHeader className="bg-gray-800">
                  <TableCell isHeader className="text-white font-semibold">
                      ID
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Nome
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Email
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Criado Em
                    </TableCell>
                  </TableHeader>
                  <tbody>
                    {currentUsuarios.length > 0 ? (
                      currentUsuarios.map((usuario: Usuario) => (
                        
                        <TableRow
                          key={usuario.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >                          
                        <TableCell className="font-medium text-gray-900">
                        {usuario.id}
                      </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            {usuario.nome}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {usuario.email}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {usuario.criadoEm.split("T")[0].split("-").reverse().join("/")}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center py-8 text-gray-500">
                          Nenhum usuario encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </tbody>
                </Table>
              </TableContainer>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                    Mostrando{" "}
                    <span className="font-medium">
                      {indexOfFirstUsuario + 1}
                    </span>{" "}
                    a{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastUsuario, filteredUsuarios.length)}
                    </span>{" "}
                    de{" "}
                    <span className="font-medium">
                      {filteredUsuarios.length}
                    </span>{" "}
                    usuarios
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      Anterior
                    </button>

                    <div className="hidden sm:flex">
                      {[...Array(totalPages).keys()].map((number) => {
                        if (
                          number + 1 === 1 ||
                          number + 1 === totalPages ||
                          (number + 1 >= currentPage - 2 &&
                            number + 1 <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={number + 1}
                              onClick={() => paginate(number + 1)}
                              className={`px-3 py-1 rounded-md ${
                                currentPage === number + 1
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                              }`}
                            >
                              {number + 1}
                            </button>
                          );
                        } else if (
                          (number + 1 === currentPage - 3 && currentPage > 4) ||
                          (number + 1 === currentPage + 3 &&
                            currentPage < totalPages - 3)
                        ) {
                          return (
                            <span
                              key={number + 1}
                              className="px-3 py-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages || totalPages === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}