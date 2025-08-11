"use client";
import Loading from "@/app/loading";
import { Cliente } from "@/app/types/cliente.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import Logs from "./logs";
import BtnFcweb from "../buttons/btn-fcweb";
import { ClienteSectionCard } from "../cliente/cliente-section-card";

interface Props {
  id: string;
  arquivo: string;
}

export default function ClientInfoCard({ id, arquivo }: Props) {
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [atualizarCliente, setAtualizarCliente] = useState(false);
  const [loading, setLoading] = useState(false);

  const [corretor, setCorretor] = useState({
    id: "",
    nome: "",
    telefone: ""
  });

  const [construtora, setConstrutora] = useState({
    id: "",
    fantasia: ""
  });

  const [empreendimento, setEmpreendimento] = useState({
    id: "",
    nome: "",
    cidade: "",
    uf: ""
  });

  const fetchCliente = async (id: string) => {
    setLoading(true);
    const reqCliente = await fetch(`/api/cliente/getone/${id}`);
    const resCliente = await reqCliente.json();
    const reqCorretor = JSON.parse(resCliente.corretor);
    const reqConstrutora = JSON.parse(resCliente.construtora);
    const reqEmpreendimento = JSON.parse(resCliente.empreendimento);
    setEmpreendimento(reqEmpreendimento);
    setCorretor(reqCorretor);
    setConstrutora(reqConstrutora);

    setCliente(resCliente);
    setClienteData(resCliente);
    setLoading(false);
  };
  useEffect(() => {
    fetchCliente(id);
  }, [id]);

  const formatDateToInput = (dateString: string | null) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0]; // Formato "YYYY-MM-DD"
  };

  const [clienteData, setClienteData] = useState({
    id: "",
    nome: "",
    cpf: "",
    dtNascimento: cliente?.dtNascimento
      ? formatDateToInput(cliente?.dtNascimento)
      : "",
    email: "",
    telefone: "",
    telefone2: "",
    andamento: "",
    statusdownload: "",
    linkdownload: "",
    logs: ""
  });
  console.log("🚀 ~ ClientInfoCard ~ clienteData:", clienteData);
  const handleClienteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtualizarCliente(true);
    const { id, value } = e.target;
    setClienteData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const gerarLinkDownload = async () => {
    try {
      const req = await fetch(`/api/cliente/link/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!req.ok) {
        throw new Error("Falha em gerar o link");
      }
      fetchCliente(id);
    } catch (error) {
      alert(error);
    }
  };

  const handleAtualizarCliente = async () => {
    if (atualizarCliente) {
      try {
        const response = await fetch(`/api/cliente/patch/${clienteData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...(clienteData.nome && { nome: clienteData.nome }),
            ...(clienteData.cpf && { cpf: clienteData.cpf }),
            ...(clienteData.dtNascimento && {
              dtNascimento: new Date(clienteData.dtNascimento)
            }),
            ...(clienteData.email && { email: clienteData.email }),
            ...(clienteData.telefone && { telefone: clienteData.telefone }),
            ...(clienteData.telefone2 && { telefone2: clienteData.telefone2 })
          })
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao atualizar cliente.");
        }
        alert("Cliente atualizado com sucesso");
        setAtualizarCliente(false);
        fetchCliente(id);
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao atualizar cliente."
        );
      }
    }
  };

  const handleRetorno = () => {
    fetchCliente(id);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Box de Dados Pessoais */}
              <ClienteSectionCard title="Dados Pessoais">
                <div className="flex flex-col">
                  <label htmlFor="nome" className="text-black mb-1">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={clienteData?.nome}
                    onChange={(e) => handleClienteInputChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cpf" className="text-black mb-1">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={clienteData?.cpf}
                    onChange={(e) => handleClienteInputChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dtNascimento" className="text-black mb-1">
                    Data de Nascimento
                  </label>
                  <input
                    id="dtNascimento"
                    type="date"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={clienteData?.dtNascimento}
                    onChange={(e) => handleClienteInputChange(e)}
                  />
                </div>
              </ClienteSectionCard>

              {/* Box de Contato */}
              <ClienteSectionCard title="Contato">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-black mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={clienteData?.email}
                    onChange={(e) => handleClienteInputChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="telefone" className="text-black mb-1">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={clienteData?.telefone}
                    onChange={(e) => handleClienteInputChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="telefone2" className="text-black mb-1">
                    Telefone 2{" "}
                  </label>
                  <input
                    id="telefone2"
                    type="tel"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={clienteData?.telefone2}
                    onChange={(e) => handleClienteInputChange(e)}
                  />
                </div>
              </ClienteSectionCard>

              {/* Box de Corretor */}
              <ClienteSectionCard title="Corretor">
                <div className="flex flex-col">
                  <label htmlFor="id" className="text-black mb-1">
                    ID
                  </label>
                  <input
                    id="id"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    readOnly
                    value={corretor?.id}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="nome" className="text-black mb-1">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    readOnly
                    value={corretor?.nome}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="telefone" className="text-black mb-1">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    readOnly
                    value={corretor?.telefone}
                  />
                </div>
              </ClienteSectionCard>

              {/* Box de Construtora */}
              <ClienteSectionCard title="Construtora">
                <div className="flex gap-2">
                  <div className="flex flex-col w-1/6">
                    <label htmlFor="id" className="text-black mb-1">
                      ID
                    </label>
                    <input
                      id="id"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={construtora?.id}
                    />
                  </div>
                  <div className="flex flex-col w-5/6">
                    <label htmlFor="fantasia" className="text-black mb-1">
                      Fantasia
                    </label>
                    <input
                      id="fantasia"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={construtora?.fantasia}
                    />
                  </div>
                </div>
              </ClienteSectionCard>

              {/* Box de Empreendimento */}
              <ClienteSectionCard title="Empreendimento">
                <div className="flex flex-col">
                  <label htmlFor="id" className="text-black mb-1">
                    ID
                  </label>
                  <input
                    id="id"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={empreendimento?.id}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="nome" className="text-black mb-1">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className="p-2 border border-gray-300 rounded text-black"
                    value={empreendimento?.nome}
                    readOnly
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col w-5/6">
                    <label htmlFor="cidade" className="text-black mb-1">
                      Cidade
                    </label>
                    <input
                      id="cidade"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={empreendimento?.cidade}
                    />
                  </div>
                  <div className="flex flex-col w-1/6">
                    <label htmlFor="uf" className="text-black mb-1">
                      UF
                    </label>
                    <input
                      id="uf"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={empreendimento?.uf}
                    />
                  </div>
                </div>
              </ClienteSectionCard>

              {/* Box de Status */}
              <ClienteSectionCard title="Status">
                <div className="flex gap-2">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="andamento" className="text-black mb-1">
                      Andamento
                    </label>
                    <input
                      id="andamento"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={clienteData?.andamento}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="statusdownload" className="text-black mb-1">
                      Status Download
                    </label>
                    <input
                      id="statusdownload"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={clienteData?.statusdownload}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col w-4/6">
                    <label htmlFor="linkdownload" className="text-black mb-1">
                      Link Download
                    </label>
                    <div className="flex">
                      <input
                        id="linkdownload"
                        type="text"
                        className="p-2 border border-gray-300 rounded-l text-black w-full"
                        readOnly
                        value={clienteData?.linkdownload || ""}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            clienteData?.linkdownload || ""
                          );
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r border border-gray-300 border-l-0 transition-colors"
                        title="Copiar link"
                      >
                        <LuClipboardCopy />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end w-2/6">
                    <button
                      className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded"
                      onClick={gerarLinkDownload}
                    >
                      Gerar Link
                    </button>
                  </div>
                </div>
              </ClienteSectionCard>
            </div>
          </>
        )}

        {/* Botões de ação para o cliente */}
        <div className="mt-6 flex justify-end gap-3">
          {cliente.idFcw && (
            <BtnFcweb
              cliente={cliente}
              fetchCliente={handleRetorno}
              arquivo={arquivo}
            />
          )}
          {atualizarCliente && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
              onClick={handleAtualizarCliente}
            >
              Salvar
            </button>
          )}
          <Link href="/cliente">
            <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded">
              Cancelar
            </button>
          </Link>
        </div>
      </div>
      <Logs cliente={cliente} />
    </>
  );
}
