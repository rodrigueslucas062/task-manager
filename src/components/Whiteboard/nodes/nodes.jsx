import { Handle, Position } from "@xyflow/react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { handleDeleteNode } from "@/utils/utils";

export function SquareNode({
  id,
  isConnectable,
  nodes,
  edges,
  setNodes,
  setEdges,
}) {
  const handleDelete = () => {
    handleDeleteNode({ id, nodes, edges, setNodes, setEdges });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="text-updater-node w-[150px] h-[150px] rounded-md bg-purple-400 cursor-pointer group">
          <Handle
            type="target"
            position="top"
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position="bottom"
            id="b"
            isConnectable={isConnectable}
          />
        </div>

        <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-2 min-w-44">
          <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
            <button>Adicionar Conexão</button>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
            <button onClick={handleDelete}>Deletar</button>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Trigger>
    </ContextMenu.Root>
  );
}

export function TextNode({
  id,
  isConnectable,
  nodes,
  edges,
  setNodes,
  setEdges,
}) {
  const handleDelete = () => {
    handleDeleteNode({ id, nodes, edges, setNodes, setEdges });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="text-updater-node w-[150px] h-[150px] rounded-md bg-blue-400 p-2 cursor-pointer group">
          <Handle
            type="target"
            position="top"
            isConnectable={isConnectable}
          />
          <div className="text-center">vai dar pra colocar um texto aqui</div>
          <Handle
            type="source"
            position="bottom"
            id="b"
            isConnectable={isConnectable}
          />
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-2 min-w-44">
        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
          <button>Adicionar texto</button>
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
          <button onClick={handleDelete}>Deletar</button>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
