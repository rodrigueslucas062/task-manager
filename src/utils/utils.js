import { toast } from "sonner";

export const handleChange = (index, e, setTaskText) => {
  const text = e.target.value;
  setTaskText(text);
};

export const handleDone = (index, setTaskText, setShowButton) => {
  localStorage.removeItem(`taskText_${index}`);
  setTaskText("");
  setShowButton(false);
  toast.success("Tarefa concluída!", {
    position: "bottom-center",
    duration: 2000,
  });
};

export const handleRemove = (index, setTaskText) => {
  localStorage.removeItem(`taskText_${index}`);
  setTaskText("");
  toast("Tarefa removida", {
    action: {
      label: "Desfazer",
      onClick: () => console.log("Desfazer"),
    },
    position: "bottom-center",
    duration: 2000,
  });
};

export const handleAddNode = (event, setNodes) => {
    const position = { x: event.clientX, y: event.clientY };
    addSquareNode({ setNodes, position });
};

export const handleAddTextNode = (event, setNodes) => {
    const position = { x: event.clientX, y: event.clientY };
    addTextSquareNode({ setNodes, position });
};

export const addSquareNode = ({ setNodes, position = { x: 200, y: 100 } }) => {
  setNodes((nodes) => [
    ...nodes,
    {
      id: crypto.randomUUID(),
      type: "square",
      position,
      data: { label: "Meu Nó" },
    },
  ]);
};

export const addTextSquareNode = ({ setNodes, position = { x: 200, y: 100 } }) => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "text",
        position,
        data: { label: "Meu Nó" },
      },
    ]);
  };
