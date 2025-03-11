import { createUser } from "@/modules/auth/actions/auth-action";

export default function CadastroForm() {

  const handleSubmit = async (formData: FormData) => {
    const result = await createUser(formData);
    if (result.error) {
      alert(result.message);
    }else{
      alert("Usuario criado com sucesso.")
    }
  };

    return (
  
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Cadastro de Usuario
          </h2>
          <form className="space-y-4" action={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Nome e Sobrenome"
                name="nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Insira seu email"
                name="email"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Senha
              </label>
              <input
                type="password"
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                name="senha"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                name="confirmar-password"
                placeholder="••••••••"
                required
              />
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
  
    );
  }
  