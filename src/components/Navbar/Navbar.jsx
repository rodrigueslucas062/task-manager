import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChalkboardSimple, Flask, Kanban, ListChecks, Notepad } from "phosphor-react";
import { DialogModal } from '../DialogModal';
import { NavButtons } from './NavButtons';

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
            case '/jamboard':
                return 'Jamboard';
            default:
                return 'Home';
        }
    };

    return (
        <nav className="fixed flex top-4 w-full justify-center px-2 z-10">
            <div className="flex w-full lg:w-2/5 border-2 border-zinc-900 bg-gray-50/60 items-center justify-between px-4 py-2 rounded-xl backdrop-blur-sm shadow-[4px_4px_0px_rgba(0,0,0,0.75)]">
                <h5 className="mx-auto text-xl font-semibold text-zinc-800">{sectionName}</h5>
                <DialogModal>
                    <div className="flex flex-col items-center justify-center gap-3 px-2 lg:px-4 pt-1.5">
                        <div className="mt-4 lg:mt-8 justify-center inline-block w-3/4 lg:w-3/5 relative text-zinc-900">
                            <div className='flex justify-center'>
                                <span className="font-semibold text-zinc-900 text-lg">{sectionName}</span>
                            </div>
                            <div className="flex flex-col space-y-4 lg:space-y-1.5 font-semibold">
                                <NavButtons path={'/'} icon={<ListChecks size={20} weight="duotone" />} text={'Tasks'} />
                                <NavButtons path={'/notepad'} icon={<Notepad size={20} weight="duotone" />} text={'Anotações'} />
                                <NavButtons path={'/jira'} icon={<Kanban size={20} weight="duotone" />} text={'Jira'} />
                                <NavButtons path={'/whiteboard'} icon={<ChalkboardSimple size={20} weight="duotone" />} text={'White Board'} />
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
                </DialogModal>
            </div>
        </nav>
    );
};

export default Navbar;
