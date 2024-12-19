import { Handle, Position } from "@xyflow/react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const handleStyle = { left: 10 };

export function SquareNode({ isConnectable }) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="text-updater-node w-[150px] h-[150px] rounded-md bg-purple-400">
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
          />
        </div>

        <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-2 min-w-44">
          <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
            <button>Adicionar handle</button>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
            <button>Deletar</button>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Trigger>
    </ContextMenu.Root>
  );
}

export function TextNode({ isConnectable }) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="text-updater-node w-[150px] h-[150px] rounded-md bg-blue-400 p-2">
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <span>vai dar pra colocar um texto aqui</span>
          <Handle
            type="source"
            position={Position.Bottom}
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
          <button>Deletar</button>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}