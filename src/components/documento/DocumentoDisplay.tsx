// /app/(sua-pagina)/components/DocumentoDisplay.tsx

import Image from "next/image";

interface DocumentoDisplayProps {
  documento: { arquivoDocumento?: string | null } | null;
}

export const DocumentoDisplay = ({ documento }: DocumentoDisplayProps) => {
  const documentoUrl = documento?.arquivoDocumento
    ? JSON.parse(documento.arquivoDocumento)
    : null;

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-gray-50">
      {documentoUrl?.viewUrl ? (
        <Image
          src={documentoUrl.viewUrl}
          alt="Imagem do documento"
          width={500}
          height={300}
          className="h-full w-auto object-contain rounded-lg p-2"
        />
      ) : (
        <span className="text-gray-500">AGUARDANDO ENVIO</span>
      )}
    </div>
  );
};
