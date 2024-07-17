import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

const availableColors = [
  "bg-amber-200",
  "bg-sky-300",
  "bg-emerald-300",
  "bg-pink-200",
  "bg-white",
];

const NoteCardProps = {
  id: String,
  date: Date,
  content: String,
};

const handleDeleteNote = {
  id: String,
  date: Date,
  content: String,
};

const NoteCards = (NoteCardProps, handleDeleteNote) => {
  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];
  const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`flex flex-col rounded-lg m-1 text-left p-3 overflow-hidden md:px-2 relative border-4 border-zinc-900 ${randomColor}`}
        style={shadowStyle} >
        {" "}
        <span className="font-semibold text-zinc-600">
          {formatDistanceToNow(NoteCardProps.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="leading-6 font-semibold text-zinc-900 ">
          {NoteCardProps.content}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-black/0 pointer-events-none"></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.DialogOverlay className="inset-0 fixed bg-black/70">
          <Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-[70%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-900">
              <X className="size-5" />
            </Dialog.Close>
            <div className="flex flex-1 flex-col gap-3 p-5 overflow-auto">
              <span className="font-semibold text-zinc-600">
                {formatDistanceToNow(NoteCardProps.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
              <p className="leading-6 font-semibold text-zinc-900 ">
                {NoteCardProps.content}
              </p>
            </div>
            <button
              type="button"
              onClick={NoteCardProps.handleDeleteNote}
              className="w-full bg-slate-800 py-4 text-center text-slate-300 outline-none font-semibold group"
            >
              Deseja{" "}
              <span className="text-red-400 group-hover:underline">
                apagar essa nota?
              </span>
            </button>
          </Dialog.DialogContent>
        </Dialog.DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NoteCards;
