import { ChalkboardSimple, DotsThreeOutline, Kanban, ListChecks } from "phosphor-react"
import { DialogModal } from "../DialogModal"
import { NavButtons } from ".."
import Notepad from "@/pages/notepad"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const PagesMenu = () => {
  const router = useRouter();
  const [sectionName, setSectionName] = useState('');

  useEffect(() => {
    const route = router.pathname;
    const sectionName = getSectionNameFromRoute(route);
    setSectionName(sectionName);
  }, [router.pathname]);

  const getSectionNameFromRoute = (route) => {
    switch (route) {
      case '/tasks':
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
    <DialogModal Icon={<DotsThreeOutline size={20} weight="duotone" />}>
      <div className="flex flex-col items-center justify-center gap-3 px-2 lg:px-4 pt-1.5">
        <div className="mt-4 lg:mt-8 justify-center inline-block w-3/4 lg:w-3/5 relative text-zinc-900">
          <div className='flex justify-center'>
            <span className="font-semibold text-zinc-900 text-lg">{sectionName}</span>
          </div>
          <div className="flex flex-col space-y-4 lg:space-y-1.5 font-semibold">
            <NavButtons path={'/tasks'} icon={<ListChecks size={20} weight="duotone" />} text={'Tasks'} />
            <NavButtons path={'/notepad'} icon={<Notepad size={20} weight="duotone" />} text={'Anotações'} />
            <NavButtons path={'/jira'} icon={<Kanban size={20} weight="duotone" />} text={'Jira'} />
            <NavButtons path={'/jamboard'} icon={<ChalkboardSimple size={20} weight="duotone" />} text={'Jamboard'} />
          </div>
        </div>
      </div>
    </DialogModal>
  )
}