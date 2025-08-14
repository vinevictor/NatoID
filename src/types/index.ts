import { Cliente } from "@/app/types/cliente.type";
import { Biometria } from "@/app/types/biometria.type";
import { Documento } from "@/app/types/documeto.type";
import { ReactNode } from "react";

export type { Cliente, Biometria, Documento };

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  route: string;
  color: string;
}

export type ClienteParaLista = Cliente & {
  statusdocumento: string;
  statusbiometria: string;
};

export interface Corretor {
  id: string;
  nome: string;
  telefone: string;
}

export interface Construtora {
  id: string;
  fantasia: string;
}

export interface Empreendimento {
  id: string;
  nome: string;
  cidade: string;
  uf: string;
}

export interface ClienteDetalhado extends Cliente {
  corretorData?: Corretor;
  construtoraData?: Construtora;
  empreendimentoData?: Empreendimento;
}
