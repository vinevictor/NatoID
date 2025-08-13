// /hooks/useBiometria.ts

import { useState, useEffect, useCallback } from "react";
import { Biometria } from "@/app/types/biometria.type";

export const useBiometria = (clienteId: string) => {
  const [biometria, setBiometria] = useState<Biometria | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFound, setIsFound] = useState(true);

  const fetchBiometria = useCallback(async () => {
    if (!clienteId) return;
    setLoading(true);
    setError(null);
    setIsFound(true);
    try {
      const response = await fetch(`/api/biometria/getclienteid/${clienteId}`);
      if (response.status === 404) {
        setIsFound(false);
        setBiometria(null);
        return;
      }
      if (!response.ok) {
        throw new Error(
          `Falha ao buscar a biometria (Status: ${response.status})`
        );
      }

      const data: Biometria = await response.json();
      setBiometria(data.error ? null : data);
      setIsFound(data.error ? false : true);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [clienteId]);

  useEffect(() => {
    fetchBiometria();
  }, [fetchBiometria]);

  const updateBiometria = async (dataToUpdate: Partial<Biometria>) => {
    if (!biometria?.id) return;
    try {
      // Agora ele envia exatamente o que recebe, sem forçar o status
      const payload = dataToUpdate;
      const response = await fetch(`/api/biometria/patch/${biometria.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok)
        throw new Error("Falha ao atualizar os dados da biometria.");
      alert("Biometria atualizada com sucesso!");
      await fetchBiometria();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro desconhecido.");
    }
  };

  const updateStatus = async (status: "APROVADO" | "ENVIADO" | "REJEITADO") => {
    await updateBiometria({ status });
  };

  return {
    biometria,
    loading,
    error,
    isFound,
    fetchBiometria,
    updateBiometria,
    updateStatus
  };
};
