import { useState, useEffect, useCallback } from "react";
import { Usuario } from "@/app/types/usuario.type";

export const useUsuariosData = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/usuario/getall");
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Falha ao buscar usuários`);
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocorreu um erro desconhecido";
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return { usuarios, loading, error, refetch: fetchUsuarios };
};
