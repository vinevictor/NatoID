// export interface Biometria {
//     id: number;
//     tipoBiometria: string;
//     dadosBiometricos: string;
//     criadoEm: string;
//     atualizadoEm: string;
//     clienteId: number;
//     status: string;
// }

import { DocumentoStatus } from "./documeto.type";

export interface DadosBiometricosInfo {
  downloadUrl: string;
  viewUrl: string;
}

export interface Biometria {
  id: string;
  clienteId: string;
  tipoBiometria: string;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
  status: DocumentoStatus;
  dadosBiometricos: string | null;
  motivo?: string;
  error?: boolean;
}
