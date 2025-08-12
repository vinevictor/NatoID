// /app/(sua-pagina)/components/DocumentoCard.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import Loading from "@/app/loading";
import { useDocumento } from "@/hooks/useDocumento";
import { Documento } from "@/app/types/documeto.type";

import { DocumentoDisplay } from "./DocumentoDisplay";
import { DocumentoInfoForm } from "./DocumentoInfoForm";
import { DocumentoActions } from "./DocumentoActions";
import RejectionModal from "../cards/rejection-modal";

interface DocumentoCardProps {
  id: string;
  onvalue: (value: string) => void;
}

export default function DocumentoCard({ id, onvalue }: DocumentoCardProps) {
  const {
    documento,
    loading,
    error,
    fetchDocumento,
    updateDocumentoStatus,
    updateDocumentoData
  } = useDocumento(id, onvalue);

  const [formData, setFormData] = useState<Partial<Documento>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  useEffect(() => {
    if (documento) {
      setFormData(documento);
      setHasChanges(false);
    }
  }, [documento]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanges(true);
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleApprove = () => {
    if (hasChanges) {
      updateDocumentoData(formData);
    } else {
      updateDocumentoStatus("APROVADO");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-black mb-4">Documento</h2>

      <DocumentoDisplay documento={documento} />

      <DocumentoInfoForm
        documentoData={formData}
        onInputChange={handleInputChange}
        isReadOnly={
          documento?.status === "APROVADO" || documento?.status === "REJEITADO"
        }
      />

      <DocumentoActions
        documento={documento}
        hasChanges={hasChanges}
        onApprove={handleApprove}
        onReject={() => setShowRejectionModal(true)}
        onCancelApproval={() => updateDocumentoStatus("ENVIADO")}
      />

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        rejectionType="documento" // Ajuste conforme necessário
        documento={documento}
        documentoData={{ id: String(documento?.id) }}
        fetchCliente={fetchDocumento}
      />
    </div>
  );
}
