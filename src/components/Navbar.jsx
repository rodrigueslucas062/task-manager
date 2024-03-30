import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image"
import Perfil from '../../public/images/perfil.jpeg'
import { ChevronRight, FlaskConical, MessageCircle, MoreHorizontal, Share2, X } from "lucide-react"
import { useEffect, useState } from "react"

const Navbar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [copied, setCopied] = useState(false)

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
        <nav className="flex w-full justify-center fixed mt-28">
            <div className={`mx-4 flex w-full lg:w-2/5 border-2 border-zinc-900 bg-gray-50/70 items-center justify-between px-4 py-2 rounded-full backdrop-blur-sm transition-visible duration-500 ease-in-out md:${isMenuVisible ? '' : 'invisible'}`}>
                <Image className="rounded-xl border-2 border-zinc-900" src={Perfil} alt="Lucas Rodrigues" width={50} height={50} />
                <h5 className="mb-1 text-xl font-semibold text-zinc-800">Lista diária</h5>
                <Dialog.Root>
                    <Dialog.Trigger className="visible bg-zinc-200 hover:bg-zinc-400 hover:text-zinc-200 p-2 rounded-full">
                        <MoreHorizontal size={18} />
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.DialogOverlay className="inset-0 fixed bg-black/20">
                            <Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-2/3 lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                                <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-800">
                                    <X className="size-5" />
                                </Dialog.Close>
                                <div className="flex items-center justify-center gap-3 p-4">
                                    <div className="rounded-lg mt-8 inline-block w-5/6 relative text-zinc-900">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="font-semibold text-zinc-900 text-lg">Lucas Rodrigues</span>
                                            <div className="flex mt-6 items-center justify-around gap-6">
                                                <Share2 />
                                                <span>Compartilhar esse projeto</span>
                                                <div className="hover:bg-zinc-400 hover:text-zinc-200 p-2 rounded-full" onClick={handleCopyLink}>
                                                    <ChevronRight />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative flex justify-center items-center">
                                            <div className="fixed flex bottom-0 mb-3">
                                                <span className="text-sm text-zinc-900 font-semibold">Made for </span>
                                                <FlaskConical className="text-lime-500" />{" "}
                                                <span className="text-sm text-zinc-900 font-semibold">By Lucas</span>
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