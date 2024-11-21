import * as Dialog from "@radix-ui/react-dialog";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CaretRight, ChalkboardSimple, DotsThreeOutline, Flask, Kanban, ListChecks, Notepad, Trash, XCircle } from "phosphor-react";

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
            case '/whiteboard':
                return 'White Board';
            default:
                return 'Home';
        }
    };

    return (
        <nav className="fixed flex top-4 w-full justify-center px-2 z-10">
            <div className="flex w-full lg:w-2/5 border-2 border-zinc-900 bg-gray-50/60 items-center justify-between px-4 py-2 rounded-xl backdrop-blur-sm transition-visible duration-500 ease-in-out">
                <h5 className="mx-auto text-xl font-semibold text-zinc-800">{sectionName}</h5>
                <Dialog.Root>
                    <Dialog.Trigger className="visible bg-zinc-200 hover:bg-zinc-400 text-zinc-900 hover:text-zinc-200 p-2 rounded-full">
                        <DotsThreeOutline size={20} weight="duotone" />
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="inset-0 fixed bg-black/70">
                            <Dialog.Content className="fixed z-10 inset-0 md:inset-auto max-md:top-[45%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[65vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                                <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-800">
                                    <XCircle size={20} weight="duotone" />
                                </Dialog.Close>
                                <div className="flex flex-col items-center justify-center gap-3 px-2 lg:px-4 pt-1.5">
                                    <div className="mt-4 lg:mt-8 justify-center inline-block w-3/4 lg:w-3/5 relative text-zinc-900">
                                        <div className='flex justify-center'>
                                            <span className="font-semibold text-zinc-900 text-lg">{sectionName}</span>
                                        </div>
                                        <div className="flex flex-col mt- space-y-4 lg:space-y-1.5 font-semibold">
                                            <Link href={'/'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <ListChecks size={20} weight="duotone" />
                                                <span>Tasks</span>
                                                <CaretRight size={20} />
                                            </Link>
                                            <Link href={'/notepad'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <Notepad size={20} weight="duotone" />
                                                <span>Anotações</span>
                                                <CaretRight size={20} />
                                            </Link>
                                            <Link href={'/jira'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <Kanban size={20} weight="duotone" />
                                                <span>Jira</span>
                                                <CaretRight size={20} />
                                            </Link>
                                            <Link href={'/whiteboard'} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
                                                <ChalkboardSimple size={20} weight="duotone" />
                                                <span>White Board</span>
                                                <CaretRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex text-zinc-800 font-semibold mt-auto pb-2 w-3/4 lg:w-3/5 mx-auto flex-col space-y-2 bottom-0">
                                    <div className="flex justify-center">
                                        <span className="text-sm">Made for </span>
                                        <Flask size={20} weight="duotone" className="text-lime-500" />{" "}
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
