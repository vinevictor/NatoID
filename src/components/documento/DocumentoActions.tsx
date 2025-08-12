// /app/(sua-pagina)/components/DocumentoActions.tsx

import React from "react";
import { Documento } from "@/app/types/documeto.type";
import { RiInformation2Fill } from "react-icons/ri";

interface DocumentoActionsProps {
  documento: Documento | null;
  hasChanges: boolean;
  onApprove: () => void;
  onReject: () => void;
  onCancelApproval: () => void;
}

export const DocumentoActions = ({
  documento,
  hasChanges,
  onApprove,
  onReject,
  onCancelApproval
}: DocumentoActionsProps) => {
  if (!documento) return null;

  const documentoUrl = documento.arquivoDocumento
    ? JSON.parse(documento.arquivoDocumento)
    : null;

  const renderStatus = () => {
    switch (documento.status) {
      case "APROVADO":
        return (
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg text-green-600 font-semibold border-l-4 border-green-600 pl-2">
              Documento Aprovado
            </h3>
            <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <RiInformation2Fill className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <p className="text-gray-700">Para reverter, clique em:</p>
              <button
                onClick={onCancelApproval}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Cancelar Aprovação
              </button>
            </div>
          </div>
        );
      case "REJEITADO":
        return (
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg text-red-600 font-semibold border-l-4 border-red-600 pl-2">
              Documento Rejeitado
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <label className="block text-gray-700 font-medium mb-2">
                Motivo:
              </label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={documento.motivo}
                readOnly
              />
            </div>
          </div>
        );
      default: // AGUARDANDO ou ENVIADO
        return (
          <div className="flex gap-4">
            <button
              onClick={onApprove}
              className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              {hasChanges ? "Atualizar e Aprovar" : "Aprovar"}
            </button>
            <button
              onClick={onReject}
              className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Rejeitar
            </button>
          </div>
        );
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="p-3 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-2 text-black">Opções</h3>
        <div className="flex gap-4">
          <a
            href={documentoUrl?.downloadUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Download
          </a>
          <a
            href={documentoUrl?.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Visualizar
          </a>
        </div>
      </div>
      {renderStatus()}
    </div>
  );
};
