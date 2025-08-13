import React from "react";
import { Documento } from "@/app/types/documeto.type";
import { formatDateForInput } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  id: string;
  value?: string | number;
  readOnly?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  label,
  id,
  value,
  readOnly = false,
  type = "text",
  onChange
}: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value || ""}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded text-black ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

interface DocumentoInfoFormProps {
  documentoData: Partial<Documento>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export const DocumentoInfoForm = ({
  documentoData,
  onInputChange,
  isReadOnly = false
}: DocumentoInfoFormProps) => {
  return (
    <div className="p-3 bg-gray-50 rounded-md mt-4 space-y-4">
      <h3 className="text-lg font-medium text-black">
        Informações do Documento
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Tipo Documento"
          id="tipoDocumento"
          value={documentoData.tipoDocumento || ""}
          onChange={onInputChange}
          readOnly={isReadOnly}
        />
        <FormField
          label="Data de Validade"
          id="validade"
          type="date"
          value={formatDateForInput(documentoData.validade)}
          onChange={onInputChange}
          readOnly={isReadOnly}
        />
        <FormField
          label="Número do Documento"
          id="numeroDocumento"
          value={documentoData.numeroDocumento || ""}
          onChange={onInputChange}
          readOnly={isReadOnly}
        />
        <FormField
          label="Enviado Em"
          id="criadoEm"
          type="date"
          value={formatDateForInput(documentoData.criadoEm)}
          readOnly
        />
      </div>
    </div>
  );
};
