import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Perfil from '../../public/images/perfil.jpeg';
import { AppWindowMac, ChevronRight, CircuitBoard, FlaskConical, List, MoreHorizontal, Notebook, NotebookPen, Trash2, X } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const router = useRouter();
    const [sectionName, setSectionName] = useState('');

    useEffect(() => {
        const route = router.pathname;
        const sectionName = getSectionNameFromRoute(route);
        setSectionName(sectionName);
    }, [router.pathname]);

    const getSectionNameFromRoute = (route) => {
        switch (route) {
            case '/':
                return 'Tasks';
            case '/notepad':
                return 'Anotações';
            case '/jira':
                return 'Jira';
            case '/board':
                return 'White Board';
            default:
                return 'Home';
        }
    };

    return (
        <nav className="fixed flex top-4 w-full justify-center px-2 z-10">
            <div className="flex w-full lg:w-2/5 border-2 border-zinc-900 bg-gray-50/70 items-center justify-between px-4 py-2 rounded-full backdrop-blur-sm transition-visible duration-500 ease-in-out">
                <Image className="rounded-xl border-2 border-zinc-900 invisible" src={Perfil} alt="Lucas Rodrigues" width={50} height={50} />
                <h5 className="mb-1 text-xl font-semibold text-zinc-800">{sectionName}</h5>
                <Dialog.Root>
                    <Dialog.Trigger className="visible bg-zinc-200 hover:bg-zinc-400 text-zinc-900 hover:text-zinc-200 p-2 rounded-full">
                        <MoreHorizontal size={18} />
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="inset-0 fixed bg-black/70">
                            <Dialog.Content className="fixed z-10 inset-0 md:inset-auto max-md:top-[45%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[65vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                                <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-800">
                                    <X className="size-5" />
                                </Dialog.Close>
                                <div className="flex flex-col items-center justify-center gap-3 px-2 lg:px-4 pt-1.5">
                                    <div className="rounded-lg mt-4 lg:mt-8 justify-center inline-block w-3/4 lg:w-3/5 relative text-zinc-900">
                                        <div className='flex justify-center'>
                                            <span className="font-semibold text-zinc-900 text-lg">{sectionName}</span>
                                        </div>
                                        <div className="flex flex-col mt- space-y-4 lg:space-y-1.5 font-semibold">
                                            <Link href={'/'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <Notebook />
                                                <span>Tasks</span>
                                                <ChevronRight />
                                            </Link>
                                            <Link href={'/notepad'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <NotebookPen />
                                                <span>Anotações</span>
                                                <ChevronRight />
                                            </Link>
                                            <Link href={'/jira'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <List />
                                                <span>Jira</span>
                                                <ChevronRight />
                                            </Link>
                                            <Link href={'/board'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <AppWindowMac />
                                                <span>White Board</span>
                                                <ChevronRight />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex text-zinc-800 font-semibold mt-auto pb-2 w-3/4 lg:w-3/5 mx-auto flex-col space-y-2 bottom-0">
                                    <button className="flex items-center justify-between mb-2 px-3 rounded-md group hover:ring-2 hover:ring-red-600 py-2.5">
                                        <Trash2 className="group-hover:text-red-600" />
                                        <span className="flex-grow ml-4 group-hover:text-red-600">Remover todas as tarefas</span>
                                        <ChevronRight className="group-hover:text-red-600" />
                                    </button>
                                    <div className="flex justify-center">
                                        <span className="text-sm">Made for </span>
                                        <FlaskConical className="text-lime-500" />{" "}
                                        <span className="text-sm">By Lucas</span>
                                    </div>
                                </div>
                            </Dialog.Content>
                        </Dialog.Overlay>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </nav>
    );
};

export default Navbar;
