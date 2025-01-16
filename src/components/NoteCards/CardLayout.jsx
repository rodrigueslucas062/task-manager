import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "phosphor-react";

export const CardLayout = ({ triggerStyle, trigger, content }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger
                className={triggerStyle}>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.DialogOverlay className="inset-0 fixed bg-black/70">
                    <Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-[70%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                        <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-900">
                            <XCircle size={20} weight="duotone" />
                        </Dialog.Close>

                        {content}
                    </Dialog.DialogContent>
                </Dialog.DialogOverlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
