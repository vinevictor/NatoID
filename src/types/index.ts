import { Cliente } from "@/app/types/cliente.type";
import { Biometria } from "@/app/types/biometria.type";
import { Documento } from "@/app/types/documeto.type";
import { ReactNode } from "react";

export type { Cliente, Biometria, Documento };

export type ClienteDetalhado = Cliente & {
  statusdocumento: string;
  statusbiometria: string;
};

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  route: string;
  color: string;
}
