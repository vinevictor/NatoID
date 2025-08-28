import { Cliente } from "@/app/types/cliente.type";

interface Props {
  fetchCliente: () => void;
  cliente: Cliente;
  arquivo: string;
}
export default function BtnFcweb({ fetchCliente, cliente, arquivo }: Props) {
  const handleFCWB = async () => {
    try {
      if (!cliente) {
        return;
      }
      const body = {
        id: cliente.id,
        cpf: cliente.cpf,
        nome: cliente.nome,
        valorcd: String(cliente.valorCd),
        telefone: cliente.telefone,
        email: cliente.email,
        dtnascimento: cliente.dtNascimento,
        documento: arquivo || ""
      };
      const req = await fetch(`/api/cliente/fcweb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!req.ok) {
        throw new Error("Falha em atualizar o documento");
      }
      alert("Fcweb Criada com sucesso");
      fetchCliente();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
      onClick={handleFCWB}
    >
      FCWB
    </button>
  );
}
