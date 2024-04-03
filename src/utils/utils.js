import { toast } from "sonner";

export const handleDone = (index, setTaskText) => {
    localStorage.removeItem(`taskText_${index}`);
    setTaskText('');
    console.log(`taskText_${index}`);
    toast.success('Tarefa concluída!', {
        position: 'bottom-center',
        duration: 2000,
    });
};

