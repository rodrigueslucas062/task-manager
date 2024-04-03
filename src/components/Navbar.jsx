import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image"
import Perfil from '../../public/images/perfil.jpeg'
import { ChevronRight, FlaskConical, Moon, MoreHorizontal, Share2, Sun, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner";

const Navbar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [copied, setCopied] = useState(false)
    const [isSun, setIsSun] = useState(true)

    const handleToggleTheme = () => {
        setIsSun(!isSun)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsMenuVisible(true);
            } else {
                setIsMenuVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast.success('Link copiado', {
            position: 'bottom-center',
            duration: 2000,
        })
    }

    return (
        <nav className="fixed flex top-8 w-full justify-center px-2">
            <div className={`flex w-full lg:w-2/5 border-2 border-zinc-900 bg-gray-50/70 items-center justify-between px-4 py-2 rounded-full backdrop-blur-sm transition-visible duration-500 ease-in-out md:${isMenuVisible ? '' : 'invisible'}`}>
                <Image className="rounded-xl border-2 border-zinc-900" src={Perfil} alt="Lucas Rodrigues" width={50} height={50} />
                <h5 className="mb-1 text-xl font-semibold text-zinc-800">Lista diária</h5>
                <Dialog.Root>
                    <Dialog.Trigger className="visible bg-zinc-200 hover:bg-zinc-400 text-zinc-900 hover:text-zinc-200 p-2 rounded-full">
                        <MoreHorizontal size={18} />
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.DialogOverlay className="inset-0 fixed bg-black/70">
                            <Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-[55%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                                <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-800">
                                    <X className="size-5" />
                                </Dialog.Close>
                                <div className="flex items-center justify-center gap-3 px-2 lg:px-4 py-1.5">
                                    <div className="rounded-lg mt-4 lg:mt-8 inline-block w-5/6 relative text-zinc-900">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <span className="font-semibold text-zinc-900 text-lg">Lista diárias</span>
                                            <div className="flex flex-col mt-4 lg:mt-6 space-y-4 font-semibold">
                                                <button className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5" onClick={handleCopyLink}>
                                                    <Share2 />
                                                    <span>Compartilhar esse projeto</span>
                                                    <ChevronRight />
                                                </button>
                                                <button className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2.5"
                                                    onClick={handleToggleTheme} >
                                                    {isSun ? <Sun /> : <Moon />}
                                                    <span>Mudar tema</span>
                                                    <ChevronRight />
                                                </button>
                                                <div className="fixed flex flex-col space-y-2 bottom-0">
                                                    <button className="flex items-center justify-between mb-2 px-3 rounded-md group hover:ring-2 hover:ring-red-600 py-2.5">
                                                        <Trash2 className="w-6 h-6 group-hover:text-red-600" />
                                                        <span className="flex-grow ml-4 group-hover:text-red-600">Remover todas as tarefas</span>
                                                        <ChevronRight className="group-hover:text-red-600"/>
                                                    </button>
                                                    <div className="flex justify-center pb-3">
                                                        <span className="text-sm text-zinc-900 font-semibold">Made for </span>
                                                        <FlaskConical className="text-lime-500" />{" "}
                                                        <span className="text-sm text-zinc-900 font-semibold">By Lucas</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.DialogContent>
                        </Dialog.DialogOverlay>
                    </Dialog.Portal>

                </Dialog.Root>
            </div>
        </nav>
    );
};

export default Navbar;