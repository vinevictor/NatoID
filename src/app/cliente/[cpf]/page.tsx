
const itens = {
    Nome: "João da Silva",
    CPF: "123.456.789-00",
    Documento: "RG 12.345.678-X",
    Andamento: "Em análise",
    Certificado: "Não emitido",
    Telefone: "(11) 98765-4321",
}



export default function idcliente() {
    return (
        <body className="gap-4">
            <div className=" flex flex-col gap-2 m-6  rounded-md w-3/5 justify-self-start h-fit bg-slate-200 p-4" >
                {Object.entries(itens).map(([key, value]) => (
                    <div key={key} className="bg-inherit ">
                        <label className="text-black text-bold ">{key}</label>
                        <input className="text-black font-bold p-2 bg-inherit" type="text" value={value} />
                    </div>
                ))}
            </div>

            <div className="border rounded-sm m-6 h-full">
                <img src="https://via.placeholder.com/150" alt="Imagem 1" className="rounded-md" />
            </div>

            <div className="border rounded-sm m-6 h-full">
                <img src="https://via.placeholder.com/150" alt="Imagem 2" className="rounded-md" />
            </div>
        </body>
    );
}