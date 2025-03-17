export interface Documento {
    id: number;
    tipoDocumento: string;
    numeroDocumento: string;
    validade: string;
    arquivoDocumento: string;
    criadoEm: string;
    atualizadoEm: string;
    clienteId: number;
    status: string,
    motivo: string
}