// /hooks/useClienteDetalhado.ts

import { useState, useEffect, useCallback } from "react";
import { ClienteDetalhado } from "@/types";

export const useClienteDetalhado = (clienteId: string) => {
  const [cliente, setCliente] = useState<ClienteDetalhado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCliente = useCallback(async () => {
    if (!clienteId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/cliente/getone/${clienteId}`);
      if (!response.ok) throw new Error("Cliente não encontrado.");

      const resCliente = await response.json();

      const clienteDetalhado: ClienteDetalhado = {
        ...resCliente,
        corretorData: resCliente.corretor
          ? JSON.parse(resCliente.corretor)
          : undefined,
        construtoraData: resCliente.construtora
          ? JSON.parse(resCliente.construtora)
          : undefined,
        empreendimentoData: resCliente.empreendimento
          ? JSON.parse(resCliente.empreendimento)
          : undefined
      };

      setCliente(clienteDetalhado);
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Ocorreu um erro ao buscar os dados do cliente.";
      console.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [clienteId]);

  useEffect(() => {
    fetchCliente();
  }, [fetchCliente]);

  const gerarLinkDownload = async () => {
    if (!clienteId) return;
    try {
      const req = await fetch(`/api/cliente/link/${clienteId}`, {
        method: "POST"
      });
      if (!req.ok) throw new Error("Falha ao gerar o link de download.");
      alert("Novo link de download gerado!");
      await fetchCliente();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro desconhecido.");
    }
  };

  const atualizarCliente = async (dataToUpdate: Partial<ClienteDetalhado>) => {
    if (!cliente?.id) return;
    try {
      const response = await fetch(`/api/cliente/patch/${cliente.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToUpdate)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao atualizar o cliente.");
      }
      alert("Cliente atualizado com sucesso!");
      await fetchCliente();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro desconhecido.");
    }
  };

  return {
    cliente,
    loading,
    error,
    fetchCliente,
    gerarLinkDownload,
    atualizarCliente
  };
};
