import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Landing() {
 
  const _navigate = useNavigate();


  return (
    <div className="bg-fundo bg-cover bg-no-repeat h-screen bg-center bg-blend-overlay bg-stone-700">
      <div className="flex justify-between items-center py-2 px-6 backdrop-blur-md bg-white/25">
        <div className="flex flex-shrink-0 items-center ml-20">
          <img
            className="h-12 w-auto"
            src="src/assets/logo.svg"
            alt="Your Company"
          />
          <div className='text-white ml-2'>
            BootPlay
          </div>
        </div>
        <div>
          <button onClick={() => _navigate('/login')} className='bg-strongblue font-bold text-white rounded-full py-2 px-16 mr-4'>Entrar</button>
          <button onClick={() => _navigate('/signup')} className='bg-skyblue font-bold rounded-full py-2 px-10 mr-20'>Inscrever-se</button>
        </div>
      </div>
      <div className="flex-col items-center ml-28">
        <p className='mt-36 font-bold text-white text-6xl'>A história da música <br/> não pode ser <br/> esquecida!</p>
        <p className='mt-6  text-white text-lg'>Crie já sua conta e curta os sucessos que <br/> marcaram os tempos no Vinil</p>
        <button onClick={() => _navigate('/signup')} className='mt-6 bg-skyblue font-bold rounded-full py-3 px-12 mr-20'>Inscrever-se</button>
      </div>
    </div>
  )
}