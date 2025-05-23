import { Documento } from "@/app/types/documeto.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiInformation2Fill } from "react-icons/ri";
import RejectionModal from "./rejection-modal";
import Loading from "@/app/loading";

interface DocumentoCardProps {
  id: string;
  onvalue: (value: any) => void;
}

export default function DocumentoCard({ id, onvalue }: DocumentoCardProps) {
  const [documento, setDocumento] = useState<Documento | null>({} as Documento);
  const [atualizarDocumento, setAtualizarDocumento] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const documentoUrl = documento?.arquivoDocumento
    ? JSON.parse(documento.arquivoDocumento)
    : null;

  const [documentoData, setDocumentoData] = useState({
    id: "",
    tipodocumento: "",
    validade: "",
    numerodocumento: ""
  });

  const fetchCliente = async () => {
    setLoading(true);
    const reqDocumento = await fetch(`/api/documento/getclienteid/${id}`);
    const resDocumento = await reqDocumento.json();
    if (!resDocumento.error) {
      setDocumento(resDocumento);
      setDocumentoData(resDocumento);
      if (resDocumento.arquivoDocumento) {
        const url = JSON.parse(resDocumento.arquivoDocumento).downloadUrl;
        onvalue(url);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCliente();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtualizarDocumento(true);
    const { id, value } = e.target;
    setDocumentoData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAtualizarDocumento = async () => {
    if (atualizarDocumento) {
      try {
        const response = await fetch(
          `/api/documento/patch/${documentoData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status: "APROVADO",
              ...(documentoData.numerodocumento && {
                numerodocumento: documentoData.numerodocumento
              }),
              ...(documentoData.tipodocumento && {
                tipodocumento: documentoData.tipodocumento
              }),
              ...(documentoData.validade && {
                validade: new Date(documentoData.validade)
              })
            })
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        alert("Documento atualizado com sucesso");
        fetchCliente();
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const response = await fetch(
          `/api/documento/patch/${documentoData.id}`,
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
          throw new Error("Falha em atualizar o documento");
        }
        alert("Documento atualizado com sucesso");
        fetchCliente();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao atualizar documento."
        );
      }
    }
    setAtualizarDocumento(false);
    fetchCliente();
  };

  const handleCancelarAprovar = async () => {
    try {
      const req = await fetch(`/api/documento/patch/${documentoData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "ENVIADO"
        })
      });
      if (!req.ok) {
        throw new Error("Falha em atualizar o documento");
      }
      fetchCliente();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-black mb-4">Documento</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
            {documento && documentoUrl ? (
              <Image
                src={documentoUrl.viewUrl}
                alt="Imagem enviada"
                width={500}
                height={300}
                className="h-full w-auto object-contain rounded-lg"
              />
            ) : (
              <span className="text-gray-500">AGUARDANDO ENVIO</span>
            )}
          </div>

          {/* Espaços para informações do documento */}
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-black">
                Informações do Documento
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-2">
                  <div className="flex w-2/4 flex-col">
                    <label htmlFor="iddoc" className="text-black mb-1">
                      ID do Documento
                    </label>
                    <input
                      id="iddoc"
                      type="text"
                      placeholder="ID Documento"
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      value={documentoData.id}
                      readOnly
                    />
                  </div>
                  <div className="flex w-1/4 flex-col">
                    <label htmlFor="dataEnvio" className="text-black mb-1">
                      Enviado Em
                    </label>
                    <input
                      id="dataEnvio"
                      type="date"
                      placeholder="Endiado em"
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      value={
                        documento?.criadoEm
                          ? documento?.criadoEm.split("T")[0]
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="flex w-1/4 flex-col">
                    <label htmlFor="dataAtualizado" className="text-black mb-1">
                      Atualizado Em
                    </label>
                    <input
                      id="dataAtualizado"
                      type="date"
                      placeholder="Enviado em"
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      value={
                        documento?.atualizadoEm
                          ? documento?.atualizadoEm.split("T")[0]
                          : ""
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="tipodocumento" className="text-black mb-1">
                      Tipo Documento
                    </label>
                    <input
                      id="tipodocumento"
                      type="text"
                      placeholder="Tipo Documento"
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      value={documentoData.tipodocumento || ""}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="validade" className="text-black mb-1">
                      Data de validade
                    </label>
                    <input
                      id="validade"
                      type="date"
                      placeholder="Data de validade"
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      value={
                        documentoData.validade
                          ? documentoData.validade.split("T")[0]
                          : ""
                      }
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="numerodocumento" className="text-black mb-1">
                    Número do documento
                  </label>
                  <input
                    id="numerodocumento"
                    type="text"
                    placeholder="Número do documento"
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    value={documentoData.numerodocumento || ""}
                    onChange={(e) => handleInputChange(e)}
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
                    <a href={documentoUrl?.downloadUrl}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Download
                      </button>
                    </a>
                  </div>
                  <div className="flex w-1/6 flex-col gap-1">
                    <span className="text-black">Visualizar Arquivo</span>
                    <a href={documentoUrl?.viewUrl} target="_blank">
                      <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                        View
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões do documento */}
            {documento?.status === "AGUARDANDO" ||
            documento?.status === "ENVIADO" ? (
              <div className="flex gap-4">
                {atualizarDocumento ? (
                  <button
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    onClick={handleAtualizarDocumento}
                  >
                    Atualizar e Aprovar
                  </button>
                ) : (
                  <button
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    onClick={handleAtualizarDocumento}
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
            ) : documento?.status === "APROVADO" ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-6 bg-green-600 rounded-full mr-2"></div>
                  <h3 className="text-lg text-green-600 font-semibold">
                    Documento Aprovado
                  </h3>
                </div>

                <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-lg shadow-md p-4 items-center">
                  <div className="flex">
                    <RiInformation2Fill className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-700 font-medium">
                      Caso ocorra algum problema e deseje cancelar a aprovação
                      do documento:
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
                    Documento Rejeitado
                  </h3>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Motivo da rejeição:
                  </label>
                  <textarea
                    className="w-full p-3 border border-red-200 bg-white rounded-md text-gray-700 min-h-[80px] focus:outline-none focus:ring-1 focus:ring-red-300 shadow-sm"
                    value={documento?.motivo}
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
            documento={documento}
            documentoData={{ id: String(documentoData.id) }}
            fetchCliente={fetchCliente}
          />
        </>
      )}
    </div>
  );
}
