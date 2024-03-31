import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MoreHorizontal } from "lucide-react";
import { useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableDiv = ({ children }) => {
    const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };
    const [{ isDragging }, drag] = useDrag({
        type: 'div',
        item: { type: 'div' },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    });

    return (
        <div
            ref={drag}
            className="rounded-lg inline-block m-1 max-md:px-2 p-3 w-full lg:w-1/3 relative bg-white border-4 border-zinc-900 text-zinc-900"
            style={shadowStyle}>
            {children}
        </div>
    );
};

const Tasks = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <Dialog.Root>
                <section className="min-h-screen">
                    <div className="flex flex-col items-center pt-48 space-y-4 max-lg:px-4">
                        <h1 className="bg-sky-700 py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                        <DraggableDiv>
                            <div className="flex items-center justify-between group">
                                <div className="flex gap-2 lg:gap-4">
                                    <div className="group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full">
                                        <Menu size={18} />
                                    </div>
                                    <input type="text" className="bg-transparent lg:w-[435px] focus:outline-none " placeholder="Digite aqui..." />
                                </div>
                                <div className="flex gap-2 lg:gap-4">
                                    <span className="bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl">Feito!</span>
                                    <Dialog.Trigger
                                        className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full"
                                        onClick={(e) => e.stopPropagation()}>
                                        <MoreHorizontal size={18} />
                                    </Dialog.Trigger>
                                </div>
                            </div>
                        </DraggableDiv>
                    </div>
                </section>
            </Dialog.Root>
        </DndProvider>
    );
};

export default Tasks;
