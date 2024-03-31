import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MoreHorizontal } from "lucide-react";

const Tasks = () => {
    const shadowStyle = {
        boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)"
    };

    return (
        <Dialog.Root>
            <section className="min-h-screen">
                <div className="flex flex-col items-center pt-48 space-y-4 max-lg:px-4">
                    <h1 className="bg-sky-700 py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                    <div className="rounded-lg cursor-pointer inline-block m-1 max-md:p-3 p-3 w-full lg:w-1/3 relative bg-white border-4 border-zinc-900 text-zinc-900"
                        style={shadowStyle}>
                        <div className="flex items-center justify-between group">
                            <div className="flex gap-4">
                                <div className="group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full">
                                    <Menu size={18} />
                                </div>
                                <input type="text" className="bg-transparent border-0 " placeholder="Digite aqui..." />
                            </div>
                            <div className="flex gap-4">
                                <span className="hover:bg-sky-700 text-white font-semibold py-1 px-3 rounded-3xl">Feito!</span>
                                <Dialog.Trigger
                                    className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full"
                                    onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal size={18} />
                                </Dialog.Trigger>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Dialog.Root>
    )
}

export default Tasks;