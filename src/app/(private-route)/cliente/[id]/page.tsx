"use client";
import Loading from "@/app/loading";
import { Biometria } from "@/app/types/biometria.type";
import { Cliente } from "@/app/types/cliente.type";
import { Documento } from "@/app/types/documeto.type";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import { RiInformation2Fill } from "react-icons/ri";

type Props = {
  params: Promise<{ id: string }>;
};
export default function ClienteIdPage({ params }: Props) {
  const { id } = use(params);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [biometria, setBiometria] = useState<Biometria | null>(null);
  const [atualizarBiometria, setAtualizarBiometria] = useState(false);
  const [atualizarDocumento, setAtualizarDocumento] = useState(false);
  const [atualizarCliente, setAtualizarCliente] = useState(false);

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionType, setRejectionType] = useState(""); // "documento" ou "biometria"
  const [motivo, setMotivo] = useState("");

  const handleRejeitar = (type: string) => {
    setRejectionType(type);
    setMotivo("");
    setShowRejectionModal(true);
  };

  const confirmRejeitar = async () => {
    if (!motivo.trim()) {
      alert("Por favor, informe o motivo da rejeição.");
      return;
    }

    try {
      if (rejectionType === "biometria") {
        if (biometria?.dadosBiometricos) {
          const urls = JSON.parse(biometria?.dadosBiometricos);
          if (urls) {
            const urldelete = urls.deleteUrl;
            const req = await fetch(`${urldelete}`, {
              method: "DELETE"
            });
            if (!req.ok) {
              throw new Error("Falha em deletar a biometria");
            }
          }
        }
        const response = await fetch(
          `/api/biometria/patch/${biometriaData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status: "REJEITADO",
              dadosBiometricos: null,
              motivo: motivo
            })
          }
        );

        if (!response.ok) {
          throw new Error("Falha em atualizar a biometria");
        }
        alert("Biometria rejeitada com sucesso");
      } else if (rejectionType === "documento") {
        if (documento?.arquivoDocumento) {
          const urls = JSON.parse(documento?.arquivoDocumento);
          if (urls) {
            const urldelete = urls.deleteUrl;
            const req = await fetch(`${urldelete}`, {
              method: "DELETE"
            });
            if (!req.ok) {
              throw new Error("Falha em deletar o documento");
            }
          }
        }
        const response = await fetch(
          `/api/documento/patch/${documentoData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status: "REJEITADO",
              arquivoDocumento: null,
              motivo: motivo
            })
          }
        );
        if (!response.ok) {
          throw new Error("Falha em atualizar o documento");
        }
        alert("Documento rejeitado com sucesso");
      }

      setShowRejectionModal(false);
      fetchCliente();
    } catch (error) {
      alert(error);
    }
  };

  const formatDateToInput = (dateString: string | null) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0]; // Formato "YYYY-MM-DD"
  };
  const [corretor, setCorretor] = useState({
    id: "",
    nome: "",
    telefone: ""
  });

  const [construtora, setConstrutora] = useState({
    id: "",
    fantasia: ""
  });

  const [empreendimento, setEmpreendimento] = useState({
    id: "",
    nome: "",
    cidade: "",
    uf: ""
  });

  const [clienteData, setClienteData] = useState({
    id: "",
    nome: "",
    cpf: "",
    dtNascimento: cliente?.dtNascimento
      ? formatDateToInput(cliente.dtNascimento)
      : "",
    email: "",
    telefone: "",
    telefone2: "",
    andamento: "",
    statusdownload: "",
    linkdownload: "",
    logs: "",
  });

  const [documentoData, setDocumentoData] = useState({
    id: "",
    tipodocumento: "",
    validade: "",
    numerodocumento: ""
  });

  const [biometriaData, setBiometriaData] = useState({
    id: biometria ? biometria.id : "",
    tipoBiometria: biometria ? biometria.tipoBiometria : "",
    status: "",
    motivo: ""
  });

  const handleAtualizarCliente = async () => {
    if (atualizarCliente) {
      try {
        const response = await fetch(`/api/cliente/patch/${clienteData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...(clienteData.nome && { nome: clienteData.nome }),
            ...(clienteData.cpf && { cpf: clienteData.cpf }),
            ...(clienteData.dtNascimento && {
              dtNascimento: new Date(clienteData.dtNascimento)
            }),
            ...(clienteData.email && { email: clienteData.email }),
            ...(clienteData.telefone && { telefone: clienteData.telefone }),
            ...(clienteData.telefone2 && { telefone2: clienteData.telefone2 })
          })
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao atualizar cliente.");
        }
        alert("Cliente atualizado com sucesso");
        setAtualizarCliente(false);
        fetchCliente();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Erro desconhecido ao atualizar cliente.");
      }
    }
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
        if (!response.ok) {
          throw new Error("Falha em atualizar o documento");
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
        alert(error);
      }
    }
    setAtualizarDocumento(false);
    fetchCliente();
  };

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
        if (!response.ok) {
          throw new Error("Falha em atualizar a biometria");
        }
        alert("Biometria atualizada com sucesso");
        fetchCliente();
      } catch (error) {
        alert(error);
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

  // URLS
  const documentoUrl = documento?.arquivoDocumento
    ? JSON.parse(documento.arquivoDocumento)
    : null;
  const biometriaUrl = biometria?.dadosBiometricos
    ? JSON.parse(biometria.dadosBiometricos)
    : null;

  const fetchCliente = async () => {
    setLoading(true);
    const reqCliente = await fetch(`/api/cliente/getone/${id}`);
    const resCliente = await reqCliente.json();
    const reqBiometria = await fetch(`/api/biometria/getclienteid/${id}`);
    const resBiometria = await reqBiometria.json();
    const reqDocumento = await fetch(`/api/documento/getclienteid/${id}`);
    const resDocumento = await reqDocumento.json();
    const reqCorretor = JSON.parse(resCliente.corretor);
    const reqConstrutora = JSON.parse(resCliente.construtora);
    const reqEmpreendimento = JSON.parse(resCliente.empreendimento);
    setEmpreendimento(reqEmpreendimento);
    setCorretor(reqCorretor);
    setConstrutora(reqConstrutora);
    if (!resDocumento.error) {
      setDocumento(resDocumento);
      setDocumentoData(resDocumento);
    }
    if (!resBiometria.error) {
      setBiometria(resBiometria);
      setBiometriaData(resBiometria);
    }
    setCliente(resCliente);
    setClienteData(resCliente);
    setLoading(false);
  };
  useEffect(() => {
    fetchCliente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleClienteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtualizarCliente(true);
    const { id, value } = e.target;
    setClienteData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtualizarDocumento(true);
    const { id, value } = e.target;
    setDocumentoData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const gerarLinkDownload = async () => {
    try {
      const req = await fetch(`/api/cliente/link/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!req.ok) {
        throw new Error("Falha em gerar o link");
      }
      fetchCliente();
    } catch (error) {
      alert(error);
    }
  };

  const handleCancelarAprovar = async (type: string) => {
    if (type === "biometria") {
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
    }
    if (type === "documento") {
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
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
          <div className="w-full h-80% flex flex-col md:flex-row gap-4 mb-4">
            {/* Seção do Documento */}
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-4">Documento</h2>
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
                        <label
                          htmlFor="dataAtualizado"
                          className="text-black mb-1"
                        >
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
                        <label
                          htmlFor="tipodocumento"
                          className="text-black mb-1"
                        >
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
                      <label
                        htmlFor="numerodocumento"
                        className="text-black mb-1"
                      >
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
                  <h3 className="text-lg font-medium mb-2 text-black">
                    Opções
                  </h3>
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
                      onClick={() => handleRejeitar("documento")}
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
                          Caso ocorra algum problema e deseje cancelar a
                          aprovação do documento:
                        </p>
                        <button
                          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm flex items-center"
                          onClick={() => handleCancelarAprovar("documento")}
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
            </div>

            {/* Seção da Biometria */}
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl text-black font-bold mb-4">Biometria</h2>
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
                        <label
                          htmlFor="dataAtualizado"
                          className="text-black mb-1"
                        >
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
                      <label
                        htmlFor="tipoBiometria"
                        className="text-black mb-1"
                      >
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
                  <h3 className="text-lg font-medium mb-2 text-black">
                    Opções
                  </h3>
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
                      onClick={() => handleRejeitar("biometria")}
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
                          Caso ocorra algum problema e deseje cancelar a
                          aprovação da biometria:
                        </p>
                        <button
                          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm flex items-center"
                          onClick={() => handleCancelarAprovar("biometria")}
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
            </div>
          </div>

          {/* Seção de Cliente */}
          <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Box de Dados Pessoais */}
              <div className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Dados Pessoais
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="nome" className="text-black mb-1">
                      Nome Completo
                    </label>
                    <input
                      id="nome"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={clienteData?.nome}
                      onChange={(e) => handleClienteInputChange(e)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="cpf" className="text-black mb-1">
                      CPF
                    </label>
                    <input
                      id="cpf"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={clienteData?.cpf}
                      onChange={(e) => handleClienteInputChange(e)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dtNascimento" className="text-black mb-1">
                      Data de Nascimento
                    </label>
                    <input
                      id="dtNascimento"
                      type="date"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={clienteData?.dtNascimento.split("T")[0]}
                      onChange={(e) => handleClienteInputChange(e)}
                    />
                  </div>
                </div>
              </div>

              {/* Box de Contato */}
              <div className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Contato
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-black mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={clienteData?.email}
                      onChange={(e) => handleClienteInputChange(e)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="telefone" className="text-black mb-1">
                      Telefone
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={clienteData?.telefone}
                      onChange={(e) => handleClienteInputChange(e)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="telefone2" className="text-black mb-1">
                      Telefone 2{" "}
                    </label>
                    <input
                      id="telefone2"
                      type="tel"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={clienteData?.telefone2}
                      onChange={(e) => handleClienteInputChange(e)}
                    />
                  </div>
                </div>
              </div>

              {/* Box de Corretor */}
              <div className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Corretor
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="id" className="text-black mb-1">
                      ID
                    </label>
                    <input
                      id="id"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={corretor?.id}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="nome" className="text-black mb-1">
                      Nome
                    </label>
                    <input
                      id="nome"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={corretor?.nome}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="telefone" className="text-black mb-1">
                      Telefone
                    </label>
                    <input
                      id="telefone"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      readOnly
                      value={corretor?.telefone}
                    />
                  </div>
                </div>
              </div>

              {/* Box de Construtora */}
              <div className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Construtora
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex flex-col w-1/6">
                      <label htmlFor="id" className="text-black mb-1">
                        ID
                      </label>
                      <input
                        id="id"
                        type="text"
                        className="p-2 border border-gray-300 rounded text-black"
                        readOnly
                        value={construtora?.id}
                      />
                    </div>
                    <div className="flex flex-col w-5/6">
                      <label htmlFor="fantasia" className="text-black mb-1">
                        Fantasia
                      </label>
                      <input
                        id="fantasia"
                        type="text"
                        className="p-2 border border-gray-300 rounded text-black"
                        readOnly
                        value={construtora?.fantasia}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Box de Empreendimento */}
              <div className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Empreendimento
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="id" className="text-black mb-1">
                      ID
                    </label>
                    <input
                      id="id"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={empreendimento?.id}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="nome" className="text-black mb-1">
                      Nome
                    </label>
                    <input
                      id="nome"
                      type="text"
                      className="p-2 border border-gray-300 rounded text-black"
                      value={empreendimento?.nome}
                      readOnly
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col w-5/6">
                      <label htmlFor="cidade" className="text-black mb-1">
                        Cidade
                      </label>
                      <input
                        id="cidade"
                        type="text"
                        className="p-2 border border-gray-300 rounded text-black"
                        readOnly
                        value={empreendimento?.cidade}
                      />
                    </div>
                    <div className="flex flex-col w-1/6">
                      <label htmlFor="uf" className="text-black mb-1">
                        UF
                      </label>
                      <input
                        id="uf"
                        type="text"
                        className="p-2 border border-gray-300 rounded text-black"
                        readOnly
                        value={empreendimento?.uf}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Box de Status */}
              <div className="bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Status do Cliente
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="andamento" className="text-black mb-1">
                        Andamento
                      </label>
                      <input
                        id="andamento"
                        type="text"
                        className="p-2 border border-gray-300 rounded text-black"
                        readOnly
                        value={clienteData?.andamento}
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="statusdownload"
                        className="text-black mb-1"
                      >
                        Status Download
                      </label>
                      <input
                        id="statusdownload"
                        type="text"
                        className="p-2 border border-gray-300 rounded text-black"
                        readOnly
                        value={clienteData?.statusdownload}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col w-4/6">
                      <label htmlFor="linkdownload" className="text-black mb-1">
                        Link Download
                      </label>
                      <div className="flex">
                        <input
                          id="linkdownload"
                          type="text"
                          className="p-2 border border-gray-300 rounded-l text-black w-full"
                          readOnly
                          value={clienteData?.linkdownload || ""}
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              clienteData?.linkdownload || ""
                            );
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r border border-gray-300 border-l-0 transition-colors"
                          title="Copiar link"
                        >
                          <LuClipboardCopy />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end w-2/6">
                      <button
                        className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded"
                        onClick={gerarLinkDownload}
                      >
                        Gerar Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação para o cliente */}
            <div className="mt-6 flex justify-end gap-3">
              {atualizarCliente && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                  onClick={handleAtualizarCliente}
                >
                  Salvar
                </button>
              )}
              <Link href="/cliente">
                <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
          {showRejectionModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Confirmar Rejeição
                </h3>
                <p className="text-gray-700 mb-4">
                  {rejectionType === "documento" ? "Documento" : "Biometria"}{" "}
                  será rejeitado. Por favor, informe o motivo:
                </p>

                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded text-black min-h-[100px]"
                    placeholder="Informe o motivo da rejeição..."
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                    onClick={() => setShowRejectionModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded disabled:bg-red-300 disabled:cursor-not-allowed"
                    onClick={confirmRejeitar}
                    disabled={!motivo.trim()}
                  >
                    Confirmar Rejeição
                  </button>
                </div>
              </div>
            </div>
          )}
   <div className="mt-6 w-full">
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 font-medium flex justify-between items-center">
          <span>Logs</span>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">Sistema</span>
        </div>
        <div className="p-1 bg-gray-900">
          <pre className="text-green-400 font-mono text-sm p-3 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
            {cliente?.logs || "Nenhum log encontrado para este cliente."}
          </pre>
        </div>
      </div>
    </div>
        </div>
      )}
    </div>
  );
}
