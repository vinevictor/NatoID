export type DocumentoStatus =
  | "AGUARDANDO"
  | "ENVIADO"
  | "APROVADO"
  | "REJEITADO";

export interface ArquivoInfo {
  downloadUrl: string;
  viewUrl: string;
}

export interface Documento {
  id: string;
  clienteId: string;

  tipoDocumento: string;
  numeroDocumento: string;

  validade: Date | string;
  criadoEm: Date | string;
  atualizadoEm: Date | string;

  status: DocumentoStatus;

  arquivoDocumento: string | null;

  motivo?: string;

  error?: boolean;
}
