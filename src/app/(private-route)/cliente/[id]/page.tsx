"use client";
import BiometriaCard from "@/components/biometria/BiometriaCard";
import ClientInfoCard from "@/components/cards/clientinfo-card";
import DocumentoCard from "@/components/documento/DocumentoCard";

import { use, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default function ClienteIdPage({ params }: Props) {
  const { id } = use(params);
  const [url, setUrl] = useState("");

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
        <div className="w-full h-80% flex flex-col md:flex-row gap-4 mb-4">
          <DocumentoCard
            onvalue={(value) => {
              setUrl(value);
            }}
            id={id}
          />

          <BiometriaCard id={id} />
        </div>

        <ClientInfoCard id={id} arquivo={url} />
      </div>
    </div>
  );
}
