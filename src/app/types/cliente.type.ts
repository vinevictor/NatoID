import { Biometria } from "./biometria.type";
import { Documento } from "./documeto.type";

export interface Cliente {
  alertaNow: boolean;
  biometria: Biometria[];
  documento: Documento[];
  andamento: string;
  ativo: boolean;
  construtora: string;
  corretor: string;
  cpf: string;
  docSuspenso: null;
  dtCriacaoNow: null;
  dtNascimento: string;
  dtSolicitacao: string;
  email: string;
  empreendimento: string;
  financeiro: string;
  id: number;
  idFcw: number;
  linkdownload: string;
  nome: string;
  statusAtendimento: boolean;
  statusPgto: string;
  statusdownload: string;
  statusdocumento: string;
  statusbiometria: string;
  telefone: string;
  telefone2: string;
  valorCd: number;
}
