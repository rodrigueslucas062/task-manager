import { useLocalStorage } from "@/hooks/useLocalStorage";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, ListTodo, Menu, MoreHorizontal, Trash2, X } from "lucide-react";

const TaskItem = ({ shadowStyle, index }) => {
    const [taskText, setTaskText] = useLocalStorage(`taskText_${index}`, '')

    const handleChange = (e) => {
        const text = e.target.value;
        setTaskText(text);
    };

    return (
        <div className="rounded-lg inline-block m-1 max-md:px-2 p-3 w-full lg:w-1/3 relative bg-white border-4 border-zinc-900 text-zinc-900" style={shadowStyle}>
            <div className="flex items-center justify-between group">
                <div className="flex gap-2 lg:gap-4">
                    <div className="group-hover:visible cursor-grab bg-white hover:bg-gray-200 p-2 rounded-full">
                        <Menu size={18} />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent focus:outline-none w-40 lg:w-[420px] border-2 border-zinc-700"
                        placeholder="Digite aqui..."
                        value={taskText}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2 lg:gap-4">
                    <span className={`${taskText ? 'bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl visible' : 'bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl invisible'}`}>Feito!</span>
                    <Dialog.Trigger
                        className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full"
                        onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={18} />
                    </Dialog.Trigger>
                </div>
            </div>
        </div>
    );
};

const Tasks = () => {
    const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };

    return (
        <Dialog.Root>
            <section className="min-h-screen">
                <div className="flex flex-col items-center pt-48 space-y-4 max-lg:px-4">
                    <h1 className="bg-sky-700 py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                    {[...Array(5)].map((_, index) => (
                        <TaskItem key={index} shadowStyle={shadowStyle} index={index} />
                    ))}
                </div>
            </section>

            <Dialog.Portal>
                <Dialog.DialogOverlay className="inset-0 fixed bg-black/20">
                    <Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-3/4 lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                        <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-900">
                            <X className="size-5" />
                        </Dialog.Close>
                        <div className="flex items-center justify-center p-4">
                            <div className="rounded-lg mt-8 inline-block w-5/6 relative text-zinc-900">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <span className="font-semibold text-zinc-900 text-lg">
                                        Mais opções
                                    </span>
                                    <div className="flex flex-col mt-6 space-y-4 font-semibold">
                                        <div className="flex items-center justify-between px-3 rounded-md border-2 border-zinc-700 hover:bg-gray-300">
                                            <ListTodo className="w-6 h-6" />
                                            <span className="flex-grow ml-4">Salvar nas tarefas diárias</span>
                                            <div className="hover:bg-zinc-400 hover:text-zinc-200 p-2 rounded-full">
                                                <ChevronRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between px-3 rounded-md border-2 border-zinc-700 hover:bg-gray-300">
                                            <Trash2 className="w-6 h-6" />
                                            <span className="flex-grow ml-4">Remover da lista de tarefas</span>
                                            <div className="hover:bg-zinc-400 hover:text-zinc-200 p-2 rounded-full">
                                                <ChevronRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.DialogContent>
                </Dialog.DialogOverlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Tasks;