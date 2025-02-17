import { useAuth, NavButtons, UserProfile, PagesMenu } from '@/components';

export const Navbar = () => {
  console.log(useAuth());

  return (
    <nav className="fixed flex top-4 w-full justify-center px-2 z-10">
      <div className="flex w-full lg:w-2/5 border-2 border-zinc-900 bg-gray-50/60 items-center justify-between px-4 py-2 rounded-lg backdrop-blur-sm shadow-[4px_4px_0px_rgba(0,0,0,0.75)]">
        <h5 className="mx-auto text-xl font-semibold text-zinc-800">{sectionName}</h5>
        <div className="flex items-center gap-2">
          <UserProfile />
          <PagesMenu />
        </div>
      </div>
    </nav>
  );
};
