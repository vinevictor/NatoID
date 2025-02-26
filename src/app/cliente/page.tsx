import { TableContainer, Table, TableHeader, TableRow, TableCell } from "@/components/table/tablecomponent";
export default function cliente() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <TableContainer className="rounded-lg shadow-md border border-gray-700">
                <Table className="bg-gray-800 text-white text-left">
                    <TableHeader className="bg-gray-700 text-White">
                        <TableCell isHeader className="text-White">Nome</TableCell>
                        <TableCell isHeader className="text-White">CPF</TableCell>
                        <TableCell isHeader className="text-White">Documento</TableCell>
                        <TableCell isHeader className="text-White">Andamento</TableCell>
                        <TableCell isHeader className="text-White">Certificado</TableCell>
                        <TableCell isHeader className="text-White">Telefone</TableCell>
                    </TableHeader>
                    <tbody>
                        <TableRow className="border-b border-gray-700 hover:bg-gray-700">
                            <TableCell className="text-blue-200">João Silva</TableCell>
                            <TableCell className="text-green-200">joao@email.com</TableCell>
                            <TableCell className="text-red-200">28</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-700 hover:bg-gray-700">
                            <TableCell className="text-blue-200">Maria Souza</TableCell>
                            <TableCell className="text-green-200">maria@email.com</TableCell>
                            <TableCell className="text-red-200">34</TableCell>
                        </TableRow>
                    </tbody>
                </Table>
            </TableContainer>
        </div>
    );
}
