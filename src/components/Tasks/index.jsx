import { placeholders, questions } from "@/utils/placeholders";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { CaretRight, DotsThreeOutline, List, Plus, Trash, X, XCircle } from "phosphor-react";

const Tasks = () => {
    const [randomQuestion, setRandomQuestion] = useState('');
    const [inputsFilled, setInputsFilled] = useState(5);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const generateRandomQuestion = () => {
            const randomIndex = Math.floor(Math.random() * questions.length);
            return questions[randomIndex];
        };

        setRandomQuestion(generateRandomQuestion());

        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const handleAddNewInput = () => {
        setInputsFilled((prevCount) => prevCount + 1);
    };

    const handleRemove = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        toast("Tarefa removida", {
            action: {
                label: "Desfazer",
                onClick: () => console.log("Desfazer"),
            },
            position: "bottom-center",
            duration: 2000,
        });
    };

    const handleDone = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        toast.success("Tarefa concluída!", {
            position: "bottom-center",
            duration: 2000,
        });
    };

    return (
        <Dialog.Root>
            <section className="min-h-screen">
                <div className="flex flex-col items-center pt-40 space-y-4 max-lg:px-4">
                    <h1 className="bg-sky-700 text-white py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                    <span className="text-white text-xl font-semibold">{randomQuestion}</span>
                    {[...Array(inputsFilled)].map((_, index) => (
                        <TaskItem key={index} index={index} tasks={tasks} setTasks={setTasks} handleRemove={handleRemove} handleDone={handleDone} />
                    ))}
                    <div className="pb-4">
                        <button
                            className="flex gap-1 bg-sky-700 hover:bg-sky-800 text-white font-semibold py-1 px-3 rounded-3xl"
                            onClick={handleAddNewInput}
                        >
                            <Plus size={20} />
                            Adicionar Tarefa
                        </button>
                    </div>
                </div>
            </section>
        </Dialog.Root>
    );
};

const TaskItem = ({ index, tasks, setTasks, handleRemove, handleDone }) => {
    const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };
    const isFirstInput = index === 0;
    const [randomPlaceholder, setRandomPlaceholder] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [taskText, setTaskText] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setTaskText(value);

        const newTasks = [...tasks];
        newTasks[index] = {
            id: newTasks[index]?.id || crypto.randomUUID(),
            date: new Date(),
            content: value,
        };
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const handleBlur = () => {
        setShowButton(taskText.trim() !== '');
    };

    useEffect(() => {
        const generateRandomPlaceholder = () => {
            const randomIndex = Math.floor(Math.random() * placeholders.length);
            return placeholders[randomIndex];
        };

        setRandomPlaceholder(generateRandomPlaceholder());
    }, []);

    useEffect(() => {
        if (tasks[index]) {
            setTaskText(tasks[index].content);
        }
    }, [tasks, index]);

    return (
        <Dialog.Root>
            <div className="rounded-lg inline-block m-1 max-md:px-2 p-3 w-full lg:w-1/3 relative bg-white border-4 border-zinc-900 text-zinc-900" style={shadowStyle}>
                <div className="flex items-center gap-2 lg:gap-4 justify-between group">
                    <div className="group-hover:visible cursor-grab bg-white hover:bg-gray-200 p-2 rounded-full">
                        <List size={20} />
                    </div>
                    <div className="w-full">
                        <input
                            className="bg-transparent focus:outline-none w-full text-wrap text-ellipsis"
                            type="text"
                            placeholder={isFirstInput ? randomPlaceholder : ""}
                            value={taskText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="flex gap-2 lg:gap-4">
                        {showButton && (
                            <button
                                className="bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl"
                                onClick={() => handleDone(tasks[index]?.id)}
                            >
                                Concluir
                            </button>
                        )}
                        <Dialog.Trigger
                            className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full"
                        >
                            <DotsThreeOutline size={20} weight="duotone" />
                        </Dialog.Trigger>
                    </div>
                </div>

                <Dialog.Portal tasks={tasks} >
                    <Dialog.Overlay className="inset-0 fixed bg-black/20">
                        <Dialog.Content className="fixed z-10 inset-0 md:inset-auto max-md:top-[70%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
                            <Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-900">
                                <XCircle size={20} weight="duotone" />
                            </Dialog.Close>
                            <div className="flex items-center justify-center p-4">
                                <div className="rounded-lg mt-8 inline-block w-5/6 relative text-zinc-900">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <span className="font-semibold text-zinc-900 text-lg">
                                            Mais opções
                                        </span>
                                        <div className="flex flex-col mt-6 space-y-4 font-semibold">
                                            <button
                                                className="flex items-center justify-between mb-2 px-3 rounded-md group ring-2 ring-red-600 py-2.5 hover:bg-red-400"
                                                onClick={() => handleRemove(tasks[index]?.id)}
                                            >
                                                <Trash size={20} weight="duotone" className="text-red-600 group-hover:text-white" />
                                                <span className="flex-grow ml-4 text-red-600 group-hover:text-white">Remover tarefa</span>
                                                <CaretRight size={20} className="text-red-600 group-hover:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </div>
        </Dialog.Root>
    );
};

export default Tasks;
