import { Biometria } from "@/app/types/biometria.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiInformation2Fill } from "react-icons/ri";
import RejectionModal from "./rejection-modal";
import Loading from "@/app/loading";
interface BiometriaCardProps {
  id: string;
}

export default function BiometriaCard({ id }: BiometriaCardProps) {
  const [biometria, setBiometria] = useState<Biometria | null>(null);
  const [atualizarBiometria, setAtualizarBiometria] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const biometriaUrl = biometria?.dadosBiometricos
    ? JSON.parse(biometria.dadosBiometricos)
    : null;

  const [biometriaData, setBiometriaData] = useState({
    id: biometria ? biometria.id : "",
    tipoBiometria: biometria ? biometria.tipoBiometria : "",
    status: "",
    motivo: ""
  });

  const handleBiometriaInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAtualizarBiometria(true);
    const { id, value } = e.target;
    setBiometriaData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const fetchCliente = async () => {
    setLoading(true);
    const reqBiometria = await fetch(`/api/biometria/getclienteid/${id}`);
    const resBiometria = await reqBiometria.json();
    if (!resBiometria.error) {
      setBiometria(resBiometria);
      setBiometriaData(resBiometria);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCliente();
  }, [id]);

  const handleAtualizarBiometria = async () => {
    if (atualizarBiometria) {
      try {
        const response = await fetch(
          `/api/biometria/patch/${biometriaData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status: "APROVADO",
              ...(biometriaData.tipoBiometria && {
                tipoBiometria: biometriaData.tipoBiometria
              })
            })
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        alert("Biometria atualizada com sucesso");
        fetchCliente();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao atualizar biometria."
        );
      }
    } else {
      try {
        const response = await fetch(
          `/api/biometria/patch/${biometriaData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status: "APROVADO"
            })
          }
        );
        if (!response.ok) {
          throw new Error("Falha em atualizar a biometria");
        }
        alert("Biometria atualizada com sucesso");
        fetchCliente();
      } catch (error) {
        alert(error);
      }
    }
    setAtualizarBiometria(false);
    fetchCliente();
  };

  const handleCancelarAprovar = async () => {
    try {
      const req = await fetch(`/api/biometria/patch/${biometriaData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "ENVIADO"
        })
      });
      if (!req.ok) {
        throw new Error("Falha em atualizar a biometria");
      }
      fetchCliente();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl text-black font-bold mb-4">Biometria</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
            {biometria && biometriaUrl ? (
              <Image
                src={biometriaUrl.viewUrl}
                alt="Imagem enviada"
                width={500}
                height={300}
                className="h-full w-auto object-contain rounded-lg"
              />
            ) : (
              <span className="text-gray-500">AGUARDANDO ENVIO</span>
            )}
          </div>

          {/* Espaços para informações da biometria */}
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-black">
                Detalhes da Biometria
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col">
                  <label htmlFor="biometria-id" className="text-black mb-1">
                    ID da Biometria
                  </label>
                  <input
                    id="biometria-id"
                    type="text"
                    placeholder="ID da Biometria"
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    readOnly
                    value={biometria?.id}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="dataEnvio" className="text-black mb-1">
                      Enviado Em
                    </label>
                    <input
                      id="dataEnvio"
                      type="date"
                      placeholder="Endiado em "
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={
                        biometria?.criadoEm
                          ? biometria?.criadoEm.split("T")[0]
                          : ""
                      }
                    />
                  </div>

                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="dataAtualizado" className="text-black mb-1">
                      Atualizado Em
                    </label>
                    <input
                      id="dataAtualizado"
                      type="date"
                      placeholder="Atualizado em "
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={
                        biometria?.atualizadoEm
                          ? biometria?.atualizadoEm.split("T")[0]
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="tipoBiometria" className="text-black mb-1">
                    Tipo de Biometria
                  </label>
                  <input
                    id="tipoBiometria"
                    type="text"
                    placeholder="Tipo de biometria"
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    value={biometriaData?.tipoBiometria}
                    onChange={(e) => handleBiometriaInputChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-black">Opções</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-2">
                  <div className="flex w-1/6 flex-col gap-1">
                    <span className="text-black">Baixar Arquivo</span>
                    <a href={biometriaUrl?.downloadUrl}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        {" "}
                        Download
                      </button>
                    </a>
                  </div>
                  <div className="flex w-1/6 flex-col gap-1">
                    <span className="text-black">Visualizar Arquivo</span>
                    <a href={biometriaUrl?.viewUrl} target="_blank">
                      <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                        View
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões da biometria */}
            {biometria?.status === "AGUARDANDO" ||
            biometria?.status === "ENVIADO" ? (
              <div className="flex gap-4">
                {atualizarBiometria ? (
                  <button
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    onClick={handleAtualizarBiometria}
                  >
                    Atualizar e Aprovar
                  </button>
                ) : (
                  <button
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    onClick={handleAtualizarBiometria}
                  >
                    Aprovar
                  </button>
                )}

                <button
                  className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                  onClick={() => setShowRejectionModal(true)}
                >
                  Rejeitar
                </button>
              </div>
            ) : biometria?.status === "APROVADO" ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-6 bg-green-600 rounded-full mr-2"></div>
                  <h3 className="text-lg text-green-600 font-semibold">
                    Biometria Aprovada
                  </h3>
                </div>

                <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-lg shadow-md p-4 items-center">
                  <div className="flex">
                    <RiInformation2Fill className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-700 font-medium">
                      Caso ocorra algum problema e deseje cancelar a aprovação
                      da biometria:
                    </p>
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm flex items-center"
                      onClick={() => handleCancelarAprovar()}
                    >
                      <span>Cancelar</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-6 bg-red-600 rounded-full mr-2"></div>
                  <h3 className="text-lg text-red-600 font-semibold">
                    Biometria Rejeitada
                  </h3>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Motivo da rejeição:
                  </label>
                  <textarea
                    className="w-full p-3 border border-red-200 bg-white rounded-md text-gray-700 min-h-[80px] focus:outline-none focus:ring-1 focus:ring-red-300 shadow-sm"
                    value={biometriaData?.motivo}
                    readOnly
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          <RejectionModal
            isOpen={showRejectionModal}
            onClose={() => setShowRejectionModal(false)}
            rejectionType="biometria"
            biometria={biometria}
            biometriaData={{ id: String(biometriaData.id) }}
            fetchCliente={fetchCliente}
          />
        </>
      )}
    </div>
  );
}
