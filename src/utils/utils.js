import { getConnectedEdges, getIncomers, getOutgoers } from "@xyflow/react";
import { toast } from "sonner";

export const handleChange = (e, setTaskText) => {
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

export const handleDelete = () => {
  setNodes((nodes) => nodes.filter((node) => node.id !== id));
};

export const handleDeleteNode = ({ id, nodes, edges, setNodes, setEdges }) => {
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));

  setEdges((prevEdges) => {
    const nodeToDelete = nodes.find((node) => node.id === id);
    if (!nodeToDelete) return prevEdges;

    const incomers = getIncomers(nodeToDelete, nodes, edges);
    const outgoers = getOutgoers(nodeToDelete, nodes, edges);
    const connectedEdges = getConnectedEdges([nodeToDelete], edges);

    const remainingEdges = prevEdges.filter(
      (edge) => !connectedEdges.includes(edge)
    );

    const newEdges = incomers.flatMap(({ id: source }) =>
      outgoers.map(({ id: target }) => ({
        id: `${source}->${target}`,
        source,
        target,
      }))
    );

    return [...remainingEdges, ...newEdges];
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

export const handleAddCircleNode = (event, setNodes) => {
  const position = { x: event.clientX, y: event.clientY };
  addCircleNode({ setNodes, position });
};

export const handleAddStickyNotesNode = (event, setNodes) => {
  const position = { x: event.clientX, y: event.clientY };
  handleAddPostIt({ setNodes, position });
};

export const addSquareNode = ({ setNodes, position = { x: 800, y: 400 } }) => {
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

export const addCircleNode = ({ setNodes, position = { x: 800, y: 400 } }) => {
  setNodes((nodes) => [
    ...nodes,
    {
      id: crypto.randomUUID(),
      type: "circle",
      position,
      data: { label: "Meu Nó" },
    },
  ]);
};

export const addTextSquareNode = ({
  setNodes,
  position = { x: 800, y: 400 },
}) => {
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

export const handleAddPostIt = ({
  setNodes,
  position = { x: 800, y: 400 },
}) => {
  setNodes((nodes) => [
    ...nodes,
    {
      id: crypto.randomUUID(),
      type: "postit",
      position,
      data: { label: "Meu Nó" },
    },
  ]);
};
