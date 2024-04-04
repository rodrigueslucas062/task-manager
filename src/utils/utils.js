import { toast } from "sonner";

export const handleDone = (index, setTaskText) => {
    console.log(index)
    localStorage.removeItem(`taskText_${index}`);
    setTaskText('');
    console.log(`taskText_${index}`);
    toast.success('Tarefa concluída!', {
        position: 'bottom-center',
        duration: 2000,
    });
};

export const handleRemove = (index, setTaskText) => {
    console.log(index)
    localStorage.removeItem(`taskText_${index}`);
    console.log('socorro deus')
    setTaskText('');
    console.log(`taskText_${index}`);
    toast('Tarefa removida', {
        action: {
            label: 'Desfazer',
            onClick: () => console.log('Desfazer')
        },
        position: 'bottom-center',
        duration: 2000,
    })
}

