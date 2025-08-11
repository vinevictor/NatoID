// /components/usuario/UsuariosTable.tsx

import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow
} from "@/components/table/tablecomponent";
import { Usuario } from "@/app/types/usuario.type";
import { formatDate } from "@/lib/utils";

interface UsuariosTableProps {
  usuarios: Usuario[];
}

export const UsuariosTable = ({ usuarios }: UsuariosTableProps) => {
  return (
    <TableContainer>
      <Table className="min-w-full">
        <TableHeader className="bg-gray-800">
          <TableCell isHeader className="text-white font-semibold">
            ID
          </TableCell>
          <TableCell isHeader className="text-white font-semibold">
            Nome
          </TableCell>
          <TableCell isHeader className="text-white font-semibold">
            Email
          </TableCell>
          <TableCell isHeader className="text-white font-semibold">
            Criado Em
          </TableCell>
        </TableHeader>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <TableRow key={usuario.id} className="border-b hover:bg-gray-50">
                <TableCell className="font-medium text-gray-600">
                  {usuario.id}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {usuario.nome}
                </TableCell>
                <TableCell className="text-gray-700">{usuario.email}</TableCell>
                <TableCell className="text-gray-700">
                  {formatDate(usuario.criadoEm)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center py-8 text-gray-500">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};
