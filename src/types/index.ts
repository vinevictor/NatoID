import { Cliente } from "@/app/types/cliente.type";
import { Biometria } from "@/app/types/biometria.type";
import { Documento } from "@/app/types/documeto.type";

export type { Cliente, Biometria, Documento };

export type ClienteDetalhado = Cliente & {
  statusdocumento: string;
  statusbiometria: string;
};
