import { useState, useEffect, useCallback } from "react";
import { Documento } from "@/app/types/documeto.type";

export const useDocumento = (
  clienteId: string,
  onDocumentoUrlChange: (url: string) => void
) => {
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFound, setIsFound] = useState(true);

  const fetchDocumento = useCallback(async () => {
    if (!clienteId) return;
    setLoading(true);
    setError(null);
    setIsFound(true);
    try {
      const response = await fetch(`/api/documento/getclienteid/${clienteId}`);
      if (response.status === 404) {
        setIsFound(false);
        setDocumento(null);
        return;
      }
      if (!response.ok) {
        throw new Error(
          `Falha ao buscar o documento (Status: ${response.status})`
        );
      }

      const data: Documento = await response.json();

      if (data && !data.error) {
        setDocumento(data);
        setIsFound(true);
        if (data.arquivoDocumento) {
          try {
            const url = JSON.parse(data.arquivoDocumento).downloadUrl;
            onDocumentoUrlChange(url);
          } catch (e) {
            console.error("Erro ao parsear o JSON do arquivoDocumento:", e);
          }
        }
      } else {
        setDocumento(null);
        setIsFound(false);
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [clienteId, onDocumentoUrlChange]);

  useEffect(() => {
    fetchDocumento();
  }, [fetchDocumento]);

  const updateDocumentoData = async (dataToUpdate: Partial<Documento>) => {
    if (!documento?.id) return;
    try {
      const payload = {
        ...dataToUpdate,
        ...(dataToUpdate.validade && {
          validade: new Date(dataToUpdate.validade)
        })
      };

      const response = await fetch(`/api/documento/patch/${documento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Falha ao atualizar o documento.");

      if (dataToUpdate.status) {
        alert(`Status do documento atualizado para: ${dataToUpdate.status}`);
      } else {
        alert("Dados do documento atualizados com sucesso!");
      }

      await fetchDocumento();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro desconhecido.");
    }
  };

  const updateDocumentoStatus = async (
    status: "APROVADO" | "ENVIADO" | "REJEITADO",
    motivo?: string
  ) => {
    await updateDocumentoData({ status, ...(motivo && { motivo }) });
  };

  return {
    documento,
    loading,
    error,
    isFound,
    fetchDocumento,
    updateDocumentoStatus,
    updateDocumentoData
  };
};
