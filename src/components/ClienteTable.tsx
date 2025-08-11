import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableContainer
} from "@/components/table/tablecomponent";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ClienteDetalhado } from "@/types";

interface ClienteTableProps {
  clientes: ClienteDetalhado[];
}

export const ClienteTable = React.memo(({ clientes }: ClienteTableProps) => {
  const router = useRouter();
  const handleRowClick = (id: string) => router.push(`/cliente/${id}`);

  return (
    <TableContainer>
      <Table className="min-w-full">
        <TableHeader className="bg-gray-800">
          <TableCell isHeader className="text-white">
            Nome
          </TableCell>
          <TableCell isHeader className="text-white">
            CPF
          </TableCell>
          <TableCell isHeader className="text-white">
            Documento
          </TableCell>
          <TableCell isHeader className="text-white">
            Biometria
          </TableCell>
          <TableCell isHeader className="text-white">
            Telefone
          </TableCell>
          <TableCell isHeader className="text-white">
            Status
          </TableCell>
          <TableCell isHeader className="text-white text-center">
            Ações
          </TableCell>
        </TableHeader>
        <tbody>
          {clientes.length === 0 ? (
            <TableRow>
              <TableCell className="text-center py-8 text-gray-500">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          ) : (
            clientes.map((cliente) => (
              <TableRow key={cliente.id} className="border-b hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {cliente.nome}
                </TableCell>
                <TableCell className="text-gray-700">{cliente.cpf}</TableCell>
                <TableCell>
                  <StatusBadge status={cliente.statusdocumento} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={cliente.statusbiometria} />
                </TableCell>
                <TableCell className="text-gray-700">
                  {cliente.telefone}
                </TableCell>
                <TableCell className="text-gray-700">
                  {cliente.andamento}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-md"
                    onClick={() => handleRowClick(cliente.id.toString())}
                  >
                    Detalhes
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
});

ClienteTable.displayName = "ClienteTable";
