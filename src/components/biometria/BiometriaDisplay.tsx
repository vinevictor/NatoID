// /app/(sua-pagina)/components/BiometriaDisplay.tsx

import Image from "next/image";

interface BiometriaDisplayProps {
  biometria: { dadosBiometricos?: string | null } | null;
}

export const BiometriaDisplay = ({ biometria }: BiometriaDisplayProps) => {
  const biometriaUrl = biometria?.dadosBiometricos
    ? JSON.parse(biometria.dadosBiometricos)
    : null;

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-gray-50">
      {biometriaUrl?.viewUrl ? (
        <Image
          src={biometriaUrl.viewUrl}
          alt="Imagem da biometria"
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
