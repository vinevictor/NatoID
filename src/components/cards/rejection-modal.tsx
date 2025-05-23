import { Biometria } from "@/app/types/biometria.type";
import { Documento } from "@/app/types/documeto.type";
import { useState } from "react";

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  rejectionType: "documento" | "biometria";
  biometria?: Biometria | null;
  documento?: Documento | null;
  biometriaData?: { id: string };
  documentoData?: { id: string };
  fetchCliente: () => void;
}

export default function RejectionModal({
  isOpen,
  onClose,
  rejectionType,
  biometria,
  documento,
  biometriaData,
  documentoData,
  fetchCliente
}: RejectionModalProps) {
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!motivo.trim()) {
      alert("Por favor, informe o motivo da rejeição.");
      return;
    }

    setLoading(true);

    try {
      if (rejectionType === "biometria") {
        if (biometria?.dadosBiometricos) {
          const urls = JSON.parse(biometria.dadosBiometricos);
          if (urls?.deleteUrl) {
            const req = await fetch(urls.deleteUrl, {
              method: "DELETE"
            });
            if (!req.ok) throw new Error("Falha em deletar a biometria");
          }
        }

        const response = await fetch(
          `/api/biometria/patch/${biometriaData?.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "REJEITADO",
              dadosBiometricos: null,
              motivo
            })
          }
        );

        if (!response.ok) {
          throw new Error("Falha em atualizar a biometria");
        }

        alert("Biometria rejeitada com sucesso");
      } else if (rejectionType === "documento") {
        if (documento?.arquivoDocumento) {
          const urls = JSON.parse(documento.arquivoDocumento);
          if (urls?.deleteUrl) {
            const req = await fetch(urls.deleteUrl, {
              method: "DELETE"
            });
            if (!req.ok) throw new Error("Falha em deletar o documento");
          }
        }

        const response = await fetch(
          `/api/documento/patch/${documentoData?.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "REJEITADO",
              arquivoDocumento: null,
              motivo
            })
          }
        );

        if (!response.ok) {
          throw new Error("Falha em atualizar o documento");
        }

        alert("Documento rejeitado com sucesso");
      }

      setMotivo("");
      onClose();
      fetchCliente();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Rejeitar {rejectionType === "biometria" ? "Biometria" : "Documento"}
        </h2>

        <textarea
          className="w-full border border-gray-300 rounded p-2 text-black min-h-[100px]"
          placeholder="Informe o motivo da rejeição..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <div className="flex justify-end mt-4 gap-3">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
              setMotivo("");
              onClose();
            }}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-400"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Rejeitando..." : "Confirmar Rejeição"}
          </button>
        </div>
      </div>
    </div>
  );
}
