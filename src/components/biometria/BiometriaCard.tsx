// /app/(sua-pagina)/components/BiometriaCard.tsx

"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import { useBiometria } from "@/hooks/useBiometria";
import { Biometria } from "@/app/types/biometria.type";

import { BiometriaDisplay } from "./BiometriaDisplay";
import { BiometriaInfoForm } from "./BiometriaInfoForm";
import { BiometriaActions } from "./BiometriaActions";
import RejectionModal from "../cards/rejection-modal";

interface BiometriaCardProps {
  id: string; // ID do Cliente
}

export default function BiometriaCard({ id }: BiometriaCardProps) {
  const {
    biometria,
    loading,
    error,
    isFound,
    fetchBiometria,
    updateBiometria,
    updateStatus
  } = useBiometria(id);

  const [formData, setFormData] = useState<Partial<Biometria>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  useEffect(() => {
    setFormData(biometria || {});
    setHasChanges(false);
  }, [biometria]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanges(true);
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleApprove = () => {
    if (hasChanges) {
      updateBiometria({ ...formData, status: "APROVADO" });
    } else {
      updateStatus("APROVADO");
    }
  };
  if (loading) {
    return (
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-black font-bold mb-4">Biometria</h2>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col min-h-[50rem]">
      <h2 className="text-2xl text-black font-bold mb-4">Biometria</h2>

      <BiometriaDisplay biometria={biometria} />

      <div className="flex-grow">
        <BiometriaInfoForm
          formData={formData}
          onInputChange={handleInputChange}
          isReadOnly={
            !isFound ||
            !biometria ||
            ["APROVADO", "REJEITADO"].includes(biometria.status)
          }
        />
      </div>

      <div className="mt-auto pt-6">
        <BiometriaActions
          biometria={biometria}
          isFound={isFound}
          error={error}
          hasChanges={hasChanges}
          onApprove={handleApprove}
          onReject={() => setShowRejectionModal(true)}
          onCancelApproval={() => updateStatus("ENVIADO")}
        />
      </div>

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        rejectionType="biometria"
        biometria={biometria}
        biometriaData={{ id: String(biometria?.id) }}
        fetchCliente={fetchBiometria}
      />
    </div>
  );
}
