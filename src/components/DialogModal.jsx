import { Flask, XCircle } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "./Context/authContext/authContext";

export const DialogModal = ({ children, Icon }) => {
  const { logout } = useAuth();

  return (
    <Dialog.Root>
      <Dialog.Trigger className="visible bg-zinc-200 hover:bg-zinc-400 text-zinc-900 hover:text-zinc-200 p-2 rounded-full">
        {Icon}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/70">
          <Dialog.Content className="fixed z-10 inset-0 md:inset-auto max-md:top-[45%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[65vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-800">
              <XCircle size={20} weight="duotone" />
            </Dialog.Close>
            {children}
            <div className="flex text-zinc-800 font-semibold mt-auto pb-2 w-3/4 lg:w-3/5 mx-auto flex-col space-y-2 bottom-0">
              <button className="flex justify-center items-center w-full py-1.5 bg-lime-500 text-white rounded-lg font-semibold"
                onClick={() => logout()}>Logout</button>
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
  )
}