import { album_api } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PiCurrencyDollarFill } from "react-icons/pi";
import { BsFileEarmarkPlayFill } from "react-icons/bs";
import { useAuth } from '@/hooks/UseAuth';
import { useEffect, useState} from 'react';
import { databaseAlbum } from '@/models/databaseAlbum';



export function Collection() {
    const [albums, setAlbums] = useState<databaseAlbum[]>([]);
    const _navigate = useNavigate();
    const token = localStorage.getItem("@Auth.Token");
    const { logout } = useAuth();
    

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Rejection:', event.reason);
    });

    useEffect(() => {
        album_api.get('/albums/my-collection', { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}` } })
            .then((resp) => {
                setAlbums(resp.data);
                console.log(resp.data);
                console.log(resp.status);
                console.log(albums);
            })
    }, []);

    const calculateSum = (albums: any[]) => {
        let sum = 0;
        albums.forEach((album) => {
            sum += album.value;
        });
        return sum;
    };

    

    return (
        <div className="flex flex-col bg-stronggray bg-cover bg-no-repeat h-full w-full bg-center">
            <div className="flex-nowrap justify-between flex flex-row py-2 px-6 backdrop-blur-md bg-white/30 w-full">

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
            <div className="flex flex-col px-20 pt-20 pb-10 items-center justify-start w-full h-full h-1/3">
                <div className='flex flex-row w-full p-4'>
                    <div className='flex justify-start'>
                        <p className='font-bold text-white text-4xl'>Meus discos</p>
                    </div>
                </div>
                <div className='flex flex-row w-full pr-4 pt-4 pb-4'>
                    <div className="flex flex-row max-w-[544px] bg-white h-[80px] w-[200px] mr-4 mt-4 mb-4 rounded-lg">
                        <div className="flex justify-center items-center w-1/4  h-full">
                            <BsFileEarmarkPlayFill className='w-[30px] h-[30px]' />
                        </div>
                        <div className='flex flex-col justify-center pl-1 items-center'>
                            <p className='text-sm pl-1'>Total de Albums</p>
                            <p className='font-bold text-xl'>{albums.length}</p>
                        </div>
                    </div>
                    <div className="flex flex-row max-w-[544px] bg-white h-[80px] w-[200px] mr-4 mt-4 mb-4 rounded-lg">
                        <div className="flex justify-center items-center w-1/4  h-full">
                            <PiCurrencyDollarFill className='w-[40px] h-[40px]' />
                        </div>
                        <div className='flex flex-col justify-center pl-1 items-center'>
                            <p className='text-sm pl-1'>Valor investido</p>
                            <p className='font-bold text-xl'>R$ {calculateSum(albums).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex px-4 pb-4 flex-row items-center w-full h-full">
                <div className="flex">
                    <div className="flex h-full w-full flex-wrap justify-center items-center gap-4">
                        {/* Card */}
                        {albums?.map((album, i) => (
                            <div key={i} style={{ '--bg-fundo': `url(${album.imageUrl})` } as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
                                <div className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
                                    <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                                </div>
                            </div>
                        ))}
                        {/* Card */}
                    </div>
                </div>
            </div>
        </div>
    )
}