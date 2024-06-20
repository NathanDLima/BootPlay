import { useAuth } from '@/hooks/UseAuth';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Page02() {
  const { logout } = useAuth();
  const _navigate = useNavigate();

  return (
    <div>
      <h1>Page02 - NÃO LOGADO</h1>
      <button onClick={() => _navigate('/page01')} className='bg-zinc-900 p-2 text-white m-1'>Navegar</button>

      <button onClick={() => logout()} className='bg-red-600 p-2 text-white'>Sair</button>
    </div>
  )
}