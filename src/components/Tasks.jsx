import { useLocalStorage } from "@/hooks/useLocalStorage";
import { placeholders, questions } from "@/utils/placeholders";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, ListTodo, Menu, MoreHorizontal, Trash2, X } from "lucide-react";

const Tasks = () => {
    const [taskData, setTaskData] = useLocalStorage("taskData", []);

    const handleInputChange = (index, value) => {
        const updatedTaskData = [...taskData];
        updatedTaskData[index] = value;
        setTaskData(updatedTaskData);
    };

    const handleDone = (index) => {
        const updatedTaskData = [...taskData];
        updatedTaskData[index] = { ...updatedTaskData[index], completed: true };
        setTaskData(updatedTaskData);
    };

    const handleRemove = (index) => {
        const updatedTaskData = [...taskData];
        updatedTaskData.splice(index, 1);
        setTaskData(updatedTaskData);
    };

    useEffect(() => {
        // Initialize with random placeholders if taskData is empty
        if (taskData.length === 0) {
            const initialData = Array.from({ length: 5 }, () => ({
                text: '',
                completed: false,
            }));
            setTaskData(initialData);
        }
    }, []);

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    return (
        <Dialog.Root>
            <section className="min-h-screen">
                <div className="flex flex-col items-center pt-48 space-y-4 max-lg:px-4">
                    <h1 className="bg-sky-700 text-white ring-1 ring-white py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                    <span className="text-white text-xl font-semibold">{randomQuestion}</span>
                    {taskData.map((task, index) => (
                        <TaskItem
                            key={index}
                            index={index}
                            taskText={task.text}
                            completed={task.completed}
                            onChange={(value) => handleInputChange(index, value)}
                            onDone={() => handleDone(index)}
                            onRemove={() => handleRemove(index)}
                        />
                    ))}
                </div>
            </section>
        </Dialog.Root>
    );
};

const TaskItem = ({ index, taskText, completed, onChange, onDone, onRemove }) => {
    const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };
    const isFirstInput = index === 0;
    const [randomPlaceholder, setRandomPlaceholder] = useState('');

    useEffect(() => {
        const generateRandomPlaceholder = () => {
            const randomIndex = Math.floor(Math.random() * placeholders.length);
            return placeholders[randomIndex];
        };

        setRandomPlaceholder(generateRandomPlaceholder());
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        onChange(value);
    };

    return (
        <div className="rounded-lg inline-block m-1 max-md:px-2 p-3 w-full lg:w-1/3 relative bg-white border-4 border-zinc-900 text-zinc-900" style={shadowStyle}>
            <div className="flex items-center gap-2 lg:gap-4 justify-between group">
                <div className="group-hover:visible cursor-grab bg-white hover:bg-gray-200 p-2 rounded-full">
                    <Menu size={18} />
                </div>
                <div className="w-full">
                    <input
                        className="bg-transparent focus:outline-none w-full text-wrap text-ellipsis"
                        type="text"
                        placeholder={isFirstInput ? randomPlaceholder : ""}
                        value={taskText}
                        onChange={handleChange}
                        disabled={completed}
                    />
                </div>
                <div className="flex gap-2 lg:gap-4">
                    <button className={`${taskText ? 'bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl' : 'hidden'}`}
                        onClick={() => handleDone(index, setTaskText)}>Feito!</button>
                    <Dialog.Trigger
                        className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full">
                        <MoreHorizontal size={18} />
                    </Dialog.Trigger>
                </div>
            </div>

            <Dialog.Portal>
                <Dialog.DialogOverlay className="inset-0 fixed bg-black/20">
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
                                        <button className="flex items-center justify-between mb-2 px-3 rounded-md group ring-2 ring-red-600 py-2.5 hover:bg-red-400"
                                            onClick={(onRemove)}>
                                            <Trash2 className="w-6 h-6 text-red-600 group-hover:text-white" />
                                            <span className="flex-grow ml-4 text-red-600 group-hover:text-white">Remover tarefa</span>
                                            <ChevronRight className="text-red-600 group-hover:text-white" />
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

export default Tasks;
