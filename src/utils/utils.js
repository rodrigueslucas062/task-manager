import { toast } from "sonner";

export const handleChange = (index, e, setTaskText) => {
    const text = e.target.value
    setTaskText(text)
}

export const handleDone = (index, setTaskText, setShowButton) => {
    console.log(index)
    localStorage.removeItem(`taskText_${index}`);
    setTaskText('');
    setShowButton(false)
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

