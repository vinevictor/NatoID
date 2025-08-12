// /hooks/useDocumento.ts

import { Documento } from "@/types";
import { useState, useEffect, useCallback } from "react";

export const useDocumento = (
  clienteId: string,
  onDocumentoUrlChange: (url: string) => void
) => {
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocumento = useCallback(async () => {
    if (!clienteId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/documento/getclienteid/${clienteId}`);
      const data: Documento = await response.json();
      if (!response.ok) {
        setDocumento(data);
        if (data.arquivoDocumento) {
          const url = JSON.parse(data.arquivoDocumento).downloadUrl;
          onDocumentoUrlChange(url);
        }
      }

      console.log("🚀 ~ useDocumento ~ data:", data);
      if (data && !data.error) {
        setDocumento(data);
        if (data.arquivoDocumento) {
          const url = JSON.parse(data.arquivoDocumento).downloadUrl;
          onDocumentoUrlChange(url);
        }
      } else {
        setDocumento(null);
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [clienteId, onDocumentoUrlChange]);

  useEffect(() => {
    fetchDocumento();
  }, [fetchDocumento]);

  const updateDocumentoStatus = async (
    status: "APROVADO" | "ENVIADO" | "REJEITADO",
    motivo?: string
  ) => {
    if (!documento?.id) return;
    try {
      const response = await fetch(`/api/documento/patch/${documento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...(motivo && { motivo }) })
      });
      if (!response.ok)
        throw new Error("Falha ao atualizar o status do documento.");
      await fetchDocumento(); // Re-fetch para obter os dados mais recentes
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro desconhecido.");
    }
  };

  const updateDocumentoData = async (dataToUpdate: Partial<Documento>) => {
    if (!documento?.id) return;
    try {
      const payload = {
        ...dataToUpdate,
        status: "APROVADO", // A lógica original sempre aprova ao atualizar
        ...(dataToUpdate.validade && {
          validade: new Date(dataToUpdate.validade)
        })
      };
      const response = await fetch(`/api/documento/patch/${documento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok)
        throw new Error("Falha ao atualizar os dados do documento.");
      alert("Documento atualizado com sucesso!");
      await fetchDocumento();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro desconhecido.");
    }
  };

  return {
    documento,
    loading,
    error,
    fetchDocumento,
    updateDocumentoStatus,
    updateDocumentoData
  };
};
