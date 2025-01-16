import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CardLayout } from "./CardLayout";

const availableColors = [
  "bg-amber-200",
  "bg-sky-200",
  "bg-emerald-200",
  "bg-pink-200",
  "bg-violet-200",
  "bg-cyan-200",
]

const NoteCards = (NoteCardProps) => {
  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  return (
    <CardLayout
      triggerStyle={`flex flex-col rounded-lg m-1 text-left p-3 overflow-hidden md:px-2 relative border-4 border-zinc-900 shadow-[8px_8px_0px_rgba(0,0,0,0.75)] ${randomColor}`}
      trigger={
        <>
          <span className="font-semibold text-zinc-600">
            {formatDistanceToNow(NoteCardProps.date, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
          <p className="leading-6 font-semibold text-zinc-900 whitespace-pre-wrap">
            {NoteCardProps.content}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-black/0 pointer-events-none"></div>
        </>
      } content={
        <>
          <div className="flex flex-1 flex-col gap-3 p-5 overflow-auto">
            <span className="font-semibold text-zinc-600">
              {formatDistanceToNow(NoteCardProps.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="leading-6 font-semibold text-zinc-900 whitespace-pre-wrap">
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
        </>
      } />
  );
};

export default NoteCards;
