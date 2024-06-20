import { user_api } from '@/services/apiService';
import { WalletModel } from '@/models/WalletModel';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/UseAuth';
import { BsFileEarmarkPlayFill } from 'react-icons/bs';
import { PiCurrencyDollarFill } from 'react-icons/pi';
import { AuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';



export function Wallet() {
    const [wallet, setWallet] = useState<WalletModel>();
    const [creditAmount, setCreditAmount] = useState('');
    const { logout } = useAuth();
    const token = localStorage.getItem("@Auth.Token");
    const { email } = useContext(AuthContext);
    const _navigate = useNavigate();

    useEffect(() => {
        console.log(token);
        console.log(email);
        user_api.get('/wallet', { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}` } })
            .then((resp) => {
                setWallet(resp.data);
                console.log(resp.data);
                console.log(resp.status);
                console.log(wallet);
            })
    }, []);

    async function handleCredit() {

        if (!creditAmount || isNaN(parseFloat(creditAmount))) {
            alert("Por favor, insira um valor válido para creditar!");
            return;
        } else {
            try {
                user_api.post('/wallet/credit/' + parseFloat(creditAmount), null, { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}`, "email": email } })
                    .then((resp) => {
                        console.log(resp.status);
                        setCreditAmount('');
                        toast.success("Crédito adicionado à carteira com sucesso!");
                    })

            } catch (error) {
                console.error("Erro na requisição de crédito: ", error);
                alert("Erro ao adicionar crédito. Por favor, tente novamente!");
            }
        }


    }

    return (
        <>
            <div className="flex flex-col bg-stronggray bg-cover bg-no-repeat h-screen bg-center">
                <div className="flex-nowrap justify-between flex flex-row py-2 px-6 backdrop-blur-md bg-white/30 w-screen">
                    <div onClick={() => _navigate('/home')} className="flex-nowrap flex items-center pl-20 flex-row cursor-pointer">
                        <img
                            className="h-12 w-auto"
                            src="src/assets/logo.svg"
                            alt="Your Company"

                        />
                        <div className='text-white px-2'>
                            BootPlay
                        </div>
                    </div>
                    <div className='w-1/3'></div>
                    <div className='flex-nowrap flex flex-row items-center pr-20'>
                        <a onClick={() => _navigate('/collection')} className="text-white mr-14 cursor-pointer">Meus Discos</a>
                        <a onClick={() => _navigate('/wallet')} className="text-white mr-14 cursor-pointer">Carteira</a>
                        <Menu as="div" className="relative inline-block text-left cursor-pointer">
                            <MenuButton>
                                <div>
                                    <img
                                        className="h-10 w-auto rounded-full"
                                        src="src/assets/avatar.jpg"
                                        alt="User avatar"
                                    />
                                </div>

                            </MenuButton>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1 px-12 justify-center intems-center">
                                    <MenuItem>
                                        <a
                                            className="active:bg-blue"
                                            onClick={() => logout()}
                                        >
                                            Sair
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <div className="flex flex-col px-20 pt-20 pb-5 items-center justify-start w-full h-full h-1/3">
                    <div className='flex flex-row w-full p-4'>
                        <div className='flex justify-start'>
                            <p className='font-bold text-white text-4xl'>Minha carteira</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full pr-4 pt-4 pb-4'>
                        <div className="flex flex-row max-w-[544px] bg-white h-[80px] w-[200px] mr-4 mt-4 mb-4 rounded-lg">
                            <div className="flex justify-center items-center w-1/4  h-full">
                                <BsFileEarmarkPlayFill className='w-[30px] h-[30px]' />
                            </div>
                            <div className='flex flex-col justify-center pl-1 items-center'>
                                <p className='text-sm pl-1'>Total de pontos</p>
                                <p className='font-bold text-xl'>{wallet?.points}</p>
                            </div>
                        </div>
                        <div className="flex flex-row max-w-[544px] bg-white h-[80px] w-[200px] mr-4 mt-4 mb-4 rounded-lg">
                            <div className="flex justify-center items-center w-1/4  h-full">
                                <PiCurrencyDollarFill className='w-[40px] h-[40px]' />
                            </div>
                            <div className='flex flex-col justify-center pl-2 items-center'>
                                <p className='text-sm pl-1'>Saldo</p>
                                <p className='font-bold text-xl'>R$ {wallet?.balance}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-20 pb-10 items-center justify-start w-full h-full h-1/3">
                    <div className='flex flex-row w-full pr-4 pt-4 pb-4'>
                        <div className="flex flex-row max-w-[544px] bg-white h-[120px] w-[500px] mr-4 mt-4 mb-4 rounded-lg">
                            <div className="flex justify-center items-center w-1/4  h-full">
                                <BsFileEarmarkPlayFill className='w-[30px] h-[30px]' />
                            </div>
                            <div className='flex flex-col justify-center pl-1 items-center'>
                                <p className='text-xl pl-1 pb-2'>Adicionar Saldo</p>
                                <div className='flex flex-row'>
                                    <input type='number' value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} className="w-full px-3 py-2 border rounded-md ring-1 ring-black text-black"></input>
                                    <button onClick={handleCredit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-2'>Creditar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}