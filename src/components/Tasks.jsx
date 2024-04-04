import { useLocalStorage } from "@/hooks/useLocalStorage";
import { handleDone, handleRemove } from "@/utils/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, ListTodo, Menu, MoreHorizontal, Trash2, X } from "lucide-react";

const placeholders = ["Estudar programação", "Tirar o lixo", "Limpar a casa", "Pagar as contas"]

const GenerateRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length)
    return placeholders[randomIndex]
}

const TaskItem = ({ index }) => {
    const [taskText, setTaskText] = useLocalStorage(`taskText_${index}`, '')
    const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };
    const isFirstInput = index === 0
    const placeholder = GenerateRandomPlaceholder()

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
                        className="bg-transparent focus:outline-none w-40 lg:w-[420px]"
                        placeholder={isFirstInput ? placeholder : ""}
                        value={taskText}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2 lg:gap-4">
                    <button className={`${taskText ? 'bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl visible' : 'bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl invisible'}`}
                        onClick={() => handleDone(index, setTaskText)}>Feito!</button>
                    <Dialog.Trigger
                        className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full"
                        onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={18} />
                    </Dialog.Trigger>
                </div>
            </div>

            <Dialog.Portal>
                <Dialog.DialogOverlay className="inset-0 fixed bg-black/70">
                    <Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-[70%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
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
                                        <button className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2.5">
                                            <ListTodo />
                                            <span className="flex-grow ml-4">Salvar nas tarefas diárias</span>
                                            <ChevronRight />
                                        </button>
                                        <button className="flex items-center justify-between mb-2 px-3 rounded-md group hover:ring-2 hover:ring-red-600 py-2.5"
                                            onClick={() => handleRemove(index, setTaskText)}>
                                            <Trash2 className="w-6 h-6 group-hover:text-red-600" />
                                            <span className="flex-grow ml-4 group-hover:text-red-600">Remover tarefa</span>
                                            <ChevronRight className="group-hover:text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.DialogContent>
                </Dialog.DialogOverlay>
            </Dialog.Portal>
        </div>
    );
};

const Tasks = () => {

    return (
        <Dialog.Root>
            <section className="min-h-screen">
                <div className="flex flex-col items-center pt-48 space-y-4 max-lg:px-4">
                    <h1 className="bg-sky-700 text-white py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                    {[...Array(5)].map((_, index) => (
                        <TaskItem key={index} index={index} />
                    ))}
                </div>
            </section>
        </Dialog.Root>
    );
};

export default Tasks;