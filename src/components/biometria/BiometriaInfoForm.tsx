import React from "react";
import { Biometria } from "@/app/types/biometria.type";
import { formatDateForInput } from "@/lib/utils";

interface BiometriaInfoFormProps {
  formData: Partial<Biometria>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export const BiometriaInfoForm = ({
  formData,
  onInputChange,
  isReadOnly = false
}: BiometriaInfoFormProps) => {
  return (
    <div className="p-3 bg-gray-50 rounded-md mt-4 space-y-4">
      <h3 className="text-lg font-medium text-black">Detalhes da Biometria</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="tipoBiometria"
            className="block text-sm font-medium text-black mb-1"
          >
            Tipo de Biometria
          </label>
          <input
            id="tipoBiometria"
            type="text"
            value={formData.tipoBiometria || ""}
            onChange={onInputChange}
            readOnly={isReadOnly}
            className={`w-full p-2 border border-gray-300 rounded text-black ${
              isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="criadoEm"
            className="block text-sm font-medium text-black mb-1"
          >
            Enviado Em
          </label>
          <input
            id="criadoEm"
            type="date"
            value={formatDateForInput(formData.criadoEm)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded text-black bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};
