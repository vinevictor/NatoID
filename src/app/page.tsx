

// export default function Home() {
//   return (
//     <div className="bg-gray-800 flex flex-col gap-4 justify-self-end justify-center w-fit h-full p-4 m-8">

//       <Input name="Nome de usuario" placeholder="Digite seu Usuario">
//       </Input>

//       <Input name="Senha" placeholder="Digite Sua Senha">
//       </Input>

//       <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 rounded">
//         Enviar
//       </button>

//     </div>
//   );
// }


export default function Loading() {
  return (
    <div className="flex items-center gap-4 justify-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      Carregando...
    </div>
  );
}
