import { useState, useEffect, useCallback } from "react";
import { Cliente, Biometria, Documento, ClienteDetalhado } from "@/types";

export const useClientesData = () => {
  const [clientes, setClientes] = useState<ClienteDetalhado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resCliente, resBiometria, resDocumento] = await Promise.all([
        fetch("/api/cliente/getall"),
        fetch("/api/biometria/getall"),
        fetch("/api/documento/getall")
      ]);

      if (!resCliente.ok || !resBiometria.ok || !resDocumento.ok) {
        throw new Error("Falha ao buscar os dados necessários.");
      }

      const clientesJson: Cliente[] = await resCliente.json();
      const biometriasJson: Biometria[] = await resBiometria.json();
      const documentosJson: Documento[] = await resDocumento.json();

      const documentosMap = new Map(
        documentosJson.map((doc) => [doc.clienteId, doc])
      );
      const biometriasMap = new Map(
        biometriasJson.map((bio) => [bio.clienteId, bio])
      );

      const dataFinal = clientesJson.map((cliente): ClienteDetalhado => {
        const documento = documentosMap.get(cliente.id);
        const biometria = biometriasMap.get(cliente.id);

        return {
          ...cliente,
          statusdocumento:
            documento?.status && documento.arquivoDocumento
              ? documento.status
              : "AGUARDANDO",
          statusbiometria:
            biometria?.status && biometria.dadosBiometricos
              ? biometria.status
              : "AGUARDANDO"
        };
      });

      setClientes(dataFinal);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { clientes, loading, error, refetch: fetchData };
};
