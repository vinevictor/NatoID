// /app/(sua-pagina)/components/ClientInfoCard.tsx

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/app/loading";
import { useClienteDetalhado } from "@/hooks/useClienteDetalhado";
import { ClienteDetalhado } from "@/types";
import { formatDateForInput } from "@/lib/utils"; // Sua função utilitária de data
import { ClienteSectionCard } from "../cliente/cliente-section-card";
import { FormField } from "@/components/ui/FormField";
import BtnFcweb from "../buttons/btn-fcweb";
import { LuClipboardCopy } from "react-icons/lu";
import Logs from "../cards/logs";

interface Props {
  id: string;
  arquivo: string;
}

export default function ClientInfoCard({ id, arquivo }: Props) {
  const {
    cliente,
    loading,
    error,
    fetchCliente,
    gerarLinkDownload,
    atualizarCliente
  } = useClienteDetalhado(id);

  const [formData, setFormData] = useState<Partial<ClienteDetalhado>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (cliente) {
      setFormData({
        ...cliente,
        dtNascimento: formatDateForInput(cliente.dtNascimento)
      });
      setHasChanges(false);
    }
  }, [cliente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanges(true);
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSaveChanges = () => {
    const dataToSave = {
      nome: formData.nome,
      cpf: formData.cpf,
      dtNascimento: formData.dtNascimento
        ? new Date(formData.dtNascimento)
        : undefined,
      email: formData.email,
      telefone: formData.telefone,
      telefone2: formData.telefone2
    };
    atualizarCliente(dataToSave);
    setHasChanges(false);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!cliente)
    return (
      <div className="text-center text-gray-500 p-8">
        Cliente não encontrado.
      </div>
    );

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          Informações do Cliente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ClienteSectionCard title="Dados Pessoais">
            <FormField
              label="Nome Completo"
              id="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <FormField
              label="CPF"
              id="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
            />
            <FormField
              label="Data de Nascimento"
              id="dtNascimento"
              type="date"
              value={formatDateForInput(formData.dtNascimento)}
              onChange={handleInputChange}
            />
          </ClienteSectionCard>

          <ClienteSectionCard title="Contato">
            <FormField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormField
              label="Telefone"
              id="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange}
            />
            <FormField
              label="Telefone 2"
              id="telefone2"
              type="tel"
              value={formData.telefone2}
              onChange={handleInputChange}
            />
          </ClienteSectionCard>

          <ClienteSectionCard title="Corretor">
            <FormField
              label="Nome"
              id="corretorNome"
              value={cliente.corretorData?.nome}
              readOnly
            />
            <FormField
              label="Telefone"
              id="corretorTelefone"
              value={cliente.corretorData?.telefone}
              readOnly
            />
          </ClienteSectionCard>

          <ClienteSectionCard title="Empreendimento">
            <FormField
              label="Nome"
              id="empreendimentoNome"
              value={cliente.empreendimentoData?.nome}
              readOnly
            />
            <FormField
              label="Cidade"
              id="empreendimentoCidade"
              value={`${cliente.empreendimentoData?.cidade || ""} ${
                cliente.empreendimentoData?.uf ? "-" : " "
              }${cliente.empreendimentoData?.uf || ""}`}
              readOnly
            />
          </ClienteSectionCard>

          <ClienteSectionCard title="Status e Ações">
            <FormField
              label="Andamento do Processo"
              id="andamento"
              value={cliente.andamento}
              readOnly
            />
            <div className="flex flex-col w-full">
              <label
                htmlFor="linkdownload"
                className="text-black mb-1 text-sm font-medium"
              >
                Link de Download
              </label>
              <div className="flex">
                <input
                  id="linkdownload"
                  type="text"
                  className="p-2 border border-gray-300 rounded-l text-black w-full bg-gray-100"
                  readOnly
                  value={cliente.linkdownload}
                />
                <button
                  color="blue"
                  onClick={() =>
                    navigator.clipboard.writeText(cliente.linkdownload || "")
                  }
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r border"
                  title="Copiar Link"
                >
                  <LuClipboardCopy />
                </button>
              </div>
            </div>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded w-full mt-2"
              onClick={gerarLinkDownload}
            >
              Gerar Novo Link
            </button>
          </ClienteSectionCard>
        </div>

        <div className="mt-6 flex justify-end items-center gap-3 border-t pt-4">
          {!cliente.idFcw && (
            <BtnFcweb
              cliente={cliente}
              fetchCliente={fetchCliente}
              arquivo={arquivo}
            />
          )}
          {hasChanges && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
              onClick={handleSaveChanges}
            >
              Salvar Alterações
            </button>
          )}
          <Link href="/cliente">
            <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded">
              Voltar
            </button>
          </Link>
        </div>
      </div>
      <Logs cliente={cliente} />
    </>
  );
}
