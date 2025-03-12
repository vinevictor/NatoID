"use client";
import Loading from "@/app/loading";
import { Biometria } from "@/app/types/biometria.type";
import { Cliente } from "@/app/types/cliente.type";
import { Documento } from "@/app/types/documeto.type";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/table/tablecomponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientePage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([] as Cliente[]);
  const [loading, setLoading] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const clientesPorPagina = 20;

  // Filtros adicionais
  const [statusFilter, setStatusFilter] = useState("");
  const [documentoFilter, setDocumentoFilter] = useState("");
  const [biometriaFilter, setBiometriaFilter] = useState("");
  const [telefoneFilter, setTelefoneFilter] = useState("");

  const statusClientOptions = ['INICIADO']
  const statusOptions = ["AGUARDANDO", "APROVADO", "REJEITADO", "", "ENVIADO"];

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => {
    setLoading(true);
    try {
      const reqCliente = await fetch("/api/cliente/getall");
      const resCliente = await reqCliente.json();
      if (resCliente.status && resCliente.status != 200) {
        throw new Error("Erro ao buscar clientes");
      }

      const reqBiometria = await fetch("/api/biometria/getall");
      const resBiometria = await reqBiometria.json();
      if (resBiometria.status && resBiometria.status != 200) {
        throw new Error("Erro ao buscar biometrias");
      }

      const reqDocumento = await fetch("/api/documento/getall");
      const resDocumento = await reqDocumento.json();
      if (resDocumento.status && resDocumento.status != 200) {
        throw new Error("Erro ao buscar documentos");
      }

      const dataFinal = resCliente.map((item: Cliente) => {
        const documento = resDocumento.find((documento: Documento) => {
          return documento.clienteId === item.id;
        });
        const biometria = resBiometria.find((biometria: Biometria) => {
          return biometria.clienteId === item.id;
        });
        return {
          ...item,
          ...(biometria && { biometria }),
          ...(documento && { documento }),
          ...((documento && documento.status) && documento.arquivoDocumento
            ? { statusdocumento: documento.status }
            : { statusdocumento: "AGUARDANDO" }),
          ...((biometria && biometria.status) && biometria.dadosBiometricos
            ? { statusbiometria: biometria.status }
            : { statusbiometria: "AGUARDANDO" })
        };
      });

      setClientes(dataFinal);
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

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDocumentoFilter("");
    setBiometriaFilter("");
    setTelefoneFilter("");
    setCurrentPage(1);
  };

  const filteredClientes = clientes.filter((cliente) => {
    const matchesNomeCpf =
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpf.includes(searchTerm);

    const matchesStatus =
      statusFilter === "" || cliente.andamento === statusFilter;

    const matchesDocumento =
      documentoFilter === "" || cliente.statusdocumento === documentoFilter;

    const matchesBiometria =
      biometriaFilter === "" || cliente.statusbiometria === biometriaFilter;

    const matchesTelefone =
      telefoneFilter === "" || cliente.telefone.includes(telefoneFilter);

    return (
      matchesNomeCpf &&
      matchesStatus &&
      matchesDocumento &&
      matchesBiometria &&
      matchesTelefone
    );
  });

  const indexOfLastCliente = currentPage * clientesPorPagina;
  const indexOfFirstCliente = indexOfLastCliente - clientesPorPagina;
  const currentClientes = filteredClientes.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  const totalPages = Math.ceil(filteredClientes.length / clientesPorPagina);

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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Listagem de Clientes
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Filtros
              </h2>

              <div className="flex flex-wrap items-start gap-4 mb-4">
                {/* Filtro por nome/CPF */}
                <div className="flex-1 min-w-[240px]">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome ou CPF
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      type="text"
                      placeholder="Buscar por nome ou CPF..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full text-black p-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Filtro por Telefone */}
                <div className="flex-1 min-w-[240px]">
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="text"
                    placeholder="Filtrar por telefone"
                    value={telefoneFilter}
                    onChange={(e) => {
                      setTelefoneFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filtro por Status */}
                <div className="flex-1 min-w-[240px]">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos os status</option>
                    {statusClientOptions
                      .filter((opt) => opt)
                      .map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Filtro por Documento */}
                <div className="flex-1 min-w-[240px]">
                  <label
                    htmlFor="documento"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Documento
                  </label>
                  <select
                    id="documento"
                    value={documentoFilter}
                    onChange={(e) => {
                      setDocumentoFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    {statusOptions
                      .filter((opt) => opt)
                      .map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Filtro por Biometria */}
                <div className="flex-1 min-w-[240px]">
                  <label
                    htmlFor="biometria"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Biometria
                  </label>
                  <select
                    id="biometria"
                    value={biometriaFilter}
                    onChange={(e) => {
                      setBiometriaFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    {statusOptions
                      .filter((opt) => opt)
                      .map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
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
                      Nome
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      CPF
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Documento
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Biometria
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Telefone
                    </TableCell>
                    <TableCell isHeader className="text-white font-semibold">
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-white font-semibold text-center"
                    >
                      Ações
                    </TableCell>
                  </TableHeader>
                  <tbody>
                    {currentClientes.length > 0 ? (
                      currentClientes.map((cliente: Cliente) => (
                        <TableRow
                          key={cliente.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="font-medium text-gray-900">
                            {cliente.nome}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {cliente.cpf}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                cliente.statusdocumento === "ENVIADO"
                                  ? "bg-blue-600 text-white "
                                  : cliente.statusdocumento === "APROVADO"
                                  ? "bg-green-100 text-green-800"
                                  : cliente.statusdocumento === "REJEITADO"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {cliente.statusdocumento}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                cliente.statusbiometria === "ENVIADO"
                                  ? "bg-blue-600 text-white "
                                  : cliente.statusbiometria === "APROVADO"
                                  ? "bg-green-100 text-green-800"
                                  : cliente.statusbiometria === "REJEITADO"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {cliente.statusbiometria}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {cliente.telefone}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {cliente.andamento}
                          </TableCell>
                          <TableCell className="text-center">
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-md transition-colors"
                              onClick={() => {
                                router.push(`/cliente/${cliente.id}`);
                              }}
                            >
                              Detalhes
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center py-8 text-gray-500">
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </tbody>
                </Table>
              </TableContainer>

              {/* Informações da paginação */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                    Mostrando{" "}
                    <span className="font-medium">
                      {indexOfFirstCliente + 1}
                    </span>{" "}
                    a{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastCliente, filteredClientes.length)}
                    </span>{" "}
                    de{" "}
                    <span className="font-medium">
                      {filteredClientes.length}
                    </span>{" "}
                    clientes
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

                    {/* Botões de página */}
                    <div className="hidden sm:flex">
                      {[...Array(totalPages).keys()].map((number) => {
                        // Mostrar apenas 5 páginas ao redor da página atual
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