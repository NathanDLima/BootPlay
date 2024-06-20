import React, { FormEvent, useState } from 'react'
import { Input2 } from '@/components/custom/Input';
import { user_api } from '../../services/apiService'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import logo from '../../assets/logo.svg';

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: FormEvent) {
    setLoading(true);
    const toastId = toast.loading("Criando conta...");
    event.preventDefault();

    const data = {
      name,
      email,
      password
    };

    console.log(data);

    await user_api.post("/users/create", data)
      .then(resp => {
        console.log(resp.data);
        toast.dismiss(toastId);
        toast.success("Conta criada com sucesso!");
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
      <div className="bg-fundo bg-cover bg-no-repeat h-screen">
        <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
          {/* Container */}
          <div className="flex max-w-[544px] bg-white p-10 rounded-2xl">
            <div className="flex flex-col items-center w-full gap-2">
              <img src={logo} className="h-12" />
              <h1 className="text-xl font-semibold">Criar conta</h1>
              {/* From */}
              <form onSubmit={handleSignup} className="flex flex-col w-72">
                <Input2 type='text' onChange={event => setName(event.target.value)}>Nome Completo</Input2>
                <Input2 type='email' onChange={event => setEmail(event.target.value)}>Email</Input2>
                <Input2 type='password' onChange={event => setPassword(event.target.value)}>Senha</Input2>
                {loading ?
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Carregando...
                  </Button>
                  :
                  <Button type='submit' disabled={false} className="p-3 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-3 rounded-full">
                    Criar conta
                  </Button>
                }
              </form>
              <p className="text-xs font-light">Já tem uma conta ? <a href="/login" className="font-semibold underline">Entrar</a></p>
              {/* From */}
            </div>
          </div>
          {/* Container */}
        </div>
      </div>
  )
}