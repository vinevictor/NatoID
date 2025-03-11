"use client";
import Loading from "@/app/loading";
import { Biometria } from "@/app/types/biometria.type";
import { Cliente } from "@/app/types/cliente.type";
import { Documento } from "@/app/types/documeto.type";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/table/tablecomponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ClientePage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([] as Cliente[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => {
    setLoading(true);
    const reqCliente = await fetch("/api/cliente/getall");
    const resCliente = await reqCliente.json();
    if (resCliente.status && resCliente.status != 200) {
      alert("Error ao buscar clientes");
    }
    const reqBiometria = await fetch("/api/biometria/getall");
    const resBiometria = await reqBiometria.json();
    if (resCliente.status && resBiometria.status != 200) {
      alert("Error ao buscar biometrias");
    }
    const reqDocumento = await fetch("/api/documento/getall");
    const resDocumento = await reqDocumento.json();
    if (resCliente.status && resDocumento.status != 200) {
      alert("Error ao buscar documentos");
    }
    const dataFinal = resCliente.map((item: Cliente) => {
      const documento = resDocumento.find((documento: Documento) => {
        return documento.clienteId === item.id;
      });
      const biometria = resBiometria.find((biometria: Biometria) => {
        return biometria.clienteId === item.id;
      });
      return { ...item, biometria, documento };
    });
    setClientes(dataFinal);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <TableContainer className="rounded-lg shadow-md border border-gray-700">
            <Table className="bg-gray-800 text-white text-left">
              <TableHeader className="bg-gray-700 text-White">
                <TableCell isHeader className="text-White">
                  Nome
                </TableCell>
                <TableCell isHeader className="text-White">
                  CPF
                </TableCell>
                <TableCell isHeader className="text-White">
                  Documento
                </TableCell>
                <TableCell isHeader className="text-White">
                  Biometria
                </TableCell>
                <TableCell isHeader className="text-White">
                  Telefone
                </TableCell>
                <TableCell isHeader className="text-White">
                  Status
                </TableCell>
                <TableCell isHeader className="text-White">
                  Ações
                </TableCell>
              </TableHeader>
              <tbody>
                {clientes.map((cliente: Cliente) => (
                  <TableRow
                    key={cliente.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <TableCell className="text-blue-200">
                      {" "}
                      {cliente.nome}
                    </TableCell>
                    <TableCell className="text-green-200">
                      {cliente.cpf}
                    </TableCell>
                    <TableCell
                      className={
                        cliente.biometria ? "text-green-500" : "text-red-500"
                      }
                    >
                      {cliente.documento ? "ENVIADO" : "AGUARDANDO"}
                    </TableCell>
                    <TableCell
                      className={
                        cliente.biometria ? "text-green-500" : "text-red-500"
                      }
                    >
                      {cliente.biometria ? "ENVIADO" : "AGUARDANDO"}
                    </TableCell>
                    <TableCell className="text-blue-200">
                      {cliente.telefone}
                    </TableCell>
                    <TableCell className="text-green-200">
                      {cliente.andamento}
                    </TableCell>
                    <TableCell className="text-blue-200">
                      <button
                        className="bg-blue-500 p-2 hover:bg-blue-700 text-white py-1 rounded"
                        onClick={() => {
                          router.push(`/cliente/${cliente.id}`);
                        }}
                      >
                        Detalhes
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
