// /app/(sua-pagina)/components/DocumentoCard.tsx

"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import { useDocumento } from "@/hooks/useDocumento";
import { Documento } from "@/app/types/documeto.type";

import { DocumentoDisplay } from "./DocumentoDisplay";
import { DocumentoInfoForm } from "./DocumentoInfoForm";
import { DocumentoActions } from "./DocumentoActions";
import RejectionModal from "../cards/rejection-modal";

interface DocumentoCardProps {
  id: string; // ID do Cliente
  onvalue: (value: string) => void;
}

export default function DocumentoCard({ id, onvalue }: DocumentoCardProps) {
  const {
    documento,
    loading,
    error,
    isFound,
    fetchDocumento,
    updateDocumentoStatus,
    updateDocumentoData
  } = useDocumento(id, onvalue);

  const [formData, setFormData] = useState<Partial<Documento>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  useEffect(() => {
    setFormData(documento || {});
    setHasChanges(false);
  }, [documento]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanges(true);
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // DocumentoCard.tsx
  const handleApprove = () => {
    if (hasChanges) {
      updateDocumentoData({ ...formData, status: "APROVADO" });
    } else {
      updateDocumentoStatus("APROVADO");
    }
  };

  if (loading) {
    return (
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Documento</h2>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-black mb-4">Documento</h2>

      <DocumentoDisplay documento={documento} />

      <DocumentoInfoForm
        documentoData={formData}
        onInputChange={handleInputChange}
        isReadOnly={
          !isFound ||
          !documento ||
          ["APROVADO", "REJEITADO"].includes(documento.status)
        }
      />

      <DocumentoActions
        documento={documento}
        isFound={isFound}
        error={error}
        hasChanges={hasChanges}
        onApprove={handleApprove}
        onReject={() => setShowRejectionModal(true)}
        onCancelApproval={() => updateDocumentoStatus("ENVIADO")}
      />

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        rejectionType="documento"
        documento={documento}
        documentoData={{ id: String(documento?.id) }}
        fetchCliente={fetchDocumento}
      />
    </div>
  );
}
