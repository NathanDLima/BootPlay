import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrClose } from "react-icons/gr";
import { useAuth } from '@/hooks/UseAuth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Modal from '@/components/modal/Modal';
import './style.css';
import toast from 'react-hot-toast';




export function Home() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [albums2, setAlbums2] = useState<AlbumModel[]>([]);
  const [boughtalbum, setBoughtAlbum] = useState<AlbumModel[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);
  const [searchText, setSearchText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useAuth();
  const userData = JSON.parse(localStorage.getItem("@Auth.Data") || "{}");
  const token = localStorage.getItem("@Auth.Token");
  const [isSearching, setIsSearching] = useState(false);
  const _navigate = useNavigate();

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Rejection:', event.reason);
  });

  useEffect(() => {
    album_api.get('/albums/all?search=Sertanejo', { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}` } })
      .then((resp) => {

        setAlbums(resp.data);
        console.log(resp.data);
        console.log(resp.status);
        console.log(albums);
      })
  }, []);

  function Carousel() {
    return (
      <>
        <div className='flex pl-28 py-6'>
          <p className='font-bold text-white text-4xl'>Trends</p>
        </div>
        <div className='relative overflow-hidden h-full'>
          <div className="carousel-home inset-0 z-10 flex absolute items-center justify-center ">
            {albums?.map((album, i) => (
              <div className="pr-8">
                <div key={i} style={{ '--bg-fundo': `url(${album.images[0].url})` } as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
                  <div onClick={() => handleAlbumClick(album)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
                    <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                  </div>
                  <Modal isOpen={openModal}>
                    {/* children */}
                    <div onClick={() => setOpenModal(false)} className='absolute top-4 right-4 cursor-pointer z-[1000]'>
                      <GrClose />
                    </div>
                    <div className="w-1/2 h-full">
                      {selectedAlbum && (
                        <div className="absolute top-0 left-0 w-1/2 h-full">
                          <img src={selectedAlbum.images[0].url} alt={selectedAlbum.name} className="w-full h-full rounded-l-3xl" />
                        </div>
                      )
                      }
                    </div>
                    <div className="w-1/2 p-8">
                      {selectedAlbum && (
                        <>
                          <div className="flex absolute flex-col justify-center top-0 w-1/2 h-full">
                            <div className="flex absolute justify-center p-10 top-0 ">
                              <p className="text-3xl font-bold">{selectedAlbum.name}</p>
                            </div>
                            <div className="flex p-10 justify-center">
                              <div>
                                {/* album details content */}

                                <p className="text-gray-700 text-lg">Artista: <b>{selectedAlbum.artists[0].name}</b></p>
                                <p className="text-gray-700 text-lg">Data de lançamento: <b>{selectedAlbum.releaseDate}</b></p>
                                <p className="text-gray-700 text-lg">Preço: <b>R$ {selectedAlbum.value}</b></p>
                              </div>
                            </div>
                            <div className="flex absolute justify-center p-10 bottom-0 w-full">
                              <button onClick={handleBuy} className="bg-orange-500 hover:bg-orange-700 text-white text-lg font-bold py-2 px-4 rounded-full w-full">
                                Comprar
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Modal>
                </div>
              </div>
            ))}
          </div>
        </div>

      </>
    )
  }


  const handleAlbumClick = (album: AlbumModel) => {
    setSelectedAlbum(album);
    setOpenModal(true);
  };

  function handleLink(url?: string) {
    window.open(url, '_blank');
  }

  async function handleBuy() {
    if (selectedAlbum) {

      try {
        const albumData = {
          name: selectedAlbum.name,
          idSpotify: selectedAlbum.id,
          artistName: selectedAlbum.artists[0].name,
          imageUrl: selectedAlbum.images[0].url,
          value: selectedAlbum.value
        }
        album_api.post('/albums/sale', albumData, { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}` } })
          .then((resp) => {
            console.log(resp.status);
            console.log(resp.data);
            setBoughtAlbum(resp.data);
            console.log(boughtalbum);
            setOpenModal(false);
          })
        toast.success("Álbum comprado com sucesso!");
      } catch (error) {
        toast.error("Erro ao comprar o álbum, por favor verifique novamente!");
        console.error("Error: ", error);
      }
    }
  }

  async function handleSearch() {
    if (searchText == "") {
      setIsSearching(false);
      album_api.get('/albums/all?search=Sertanejo', { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}` } })
        .then((resp) => {
          setAlbums(resp.data);
          console.log(resp.data);
          console.log(resp.status);
          console.log(albums);
        })
    } else {
      setIsSearching(true);
      album_api.get(`/albums/all?search=${searchText}`, { headers: { Authorization: `Basic ${token?.replace(/"/g, '')}` } })
        .then((resp) => {
          setAlbums2(resp.data);
          console.log(resp.data);
          console.log(resp.status);
          console.log(albums2);
        })

    }

  }


  return (
    <>

      <div className="flex flex-col bg-fundohome bg-cover h-full w-full bg-center bg-blend-overlay bg-stone-700">
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
        <div className="flex-col items-center ml-28">
          <p className='mt-36 font-bold text-white text-4xl'>A história da música <br /> não pode ser esquecida!</p>
          <p className='mt-6  text-white text-lg'>Sucessos que marcaram os tempos!!!</p>
        </div>

        <div className="flex flex-col items-center h-screen bg-gradient-to-b from-transparent from-20% to-stronggray to-30% w-full -mt-24">
          <div className="flex flex-col w-full h-full pt-[210px]">
            <div className='flex p-6'>
              <div className="relative top-1/3 left-1/3 w-1/3">
                <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} className="w-full p-2 rounded-lg bg-stronggray ring-1 ring-white text-white"></input>
                <button onClick={handleSearch} className="absolute right-1 top-1/2 -translate-y-1/2 p-2 ">
                  <AiOutlineSearch
                    color="white"
                    stroke="white"
                  />
                </button>
              </div>
            </div>

            {isSearching ? (
              <div className="flex flex-row flex-wrap h-full overflow-auto py-6">
                <div className="flex justify-center flex-wrap items-center gap-4">
                  {/* Card */}
                  {albums2?.map((album, i) => (
                    <div key={i} style={{ '--bg-fundo': `url(${album.images[0].url})` } as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
                      <div onClick={() => { handleAlbumClick(album) }} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
                        <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                      </div>
                      <Modal isOpen={openModal}>
                        {/* children */}
                        <div onClick={() => setOpenModal(false)} className='absolute top-4 right-4 cursor-pointer z-[1000]'>
                          <GrClose />
                        </div>
                        <div className="w-1/2 h-full">
                          {selectedAlbum && (
                            <div className="absolute top-0 left-0 w-1/2 h-full">
                              <img src={selectedAlbum.images[0].url} alt={selectedAlbum.name} className="w-full h-full rounded-l-3xl" />
                            </div>
                          )
                          }
                        </div>
                        <div className="w-1/2 p-8">
                          {selectedAlbum && (
                            <>
                              <div className="flex absolute flex-col justify-center top-0 w-1/2 h-full">
                                <div className="flex absolute justify-center p-10 top-0 ">
                                  <p className="text-3xl font-bold">{selectedAlbum.name}</p>
                                </div>
                                <div className="flex p-10 justify-center">
                                  <div>
                                    {/* album details content */}

                                    <p className="text-gray-700 text-lg">Artista: <b>{selectedAlbum.artists[0].name}</b></p>
                                    <p className="text-gray-700 text-lg">Data de lançamento: <b>{selectedAlbum.releaseDate}</b></p>
                                    <p className="text-gray-700 text-lg">Preço: <b>R$ {selectedAlbum.value}</b></p>
                                  </div>
                                </div>
                                <div className="flex absolute justify-center p-10 bottom-0 w-full">
                                  <button onClick={handleBuy} className="bg-orange-500 hover:bg-orange-700 text-white text-lg font-bold py-2 px-4 rounded-full w-full">
                                    Comprar
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </Modal>
                    </div>
                  ))}
                  {/* Card */}
                </div>
              </div>
            ) : (
              <Carousel />
            )}

          </div>

        </div>


      </div>


    </>
  )
}