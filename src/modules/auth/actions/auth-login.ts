'use server'

export default async function login(formData : FormData) {
    const cpf = formData.get('CPF') as string
    const password = formData.get('password') as string

    const data = {
        cpf: cpf,
        password: password
    }

    const req = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })   
}
