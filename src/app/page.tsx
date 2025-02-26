import Input from "@/components/inputs/input";

export default function Home() {
  return (
    <div className="bg-gray-800 flex flex-col gap-4 justify-self-end justify-center w-fit h-full p-4 m-8">

      <Input name="Nome de usuario" placeholder="Digite seu Usuario">
      </Input>

      <Input name="Senha" placeholder="Digite Sua Senha">
      </Input>

      <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 rounded">
        Enviar
      </button>

    </div>
  );
}
