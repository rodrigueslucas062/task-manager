import { Handle, NodeToolbar } from "@xyflow/react";
import { handleDeleteNode } from "@/utils/utils";
import { useState } from "react";
import { Backspace, Trash } from "phosphor-react";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as ContextMenu from "@radix-ui/react-context-menu";

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
        <NodeToolbar position={"top"} className="bg-zinc-900 rounded-lg border border-purple-400">
          <Toolbar.Root
            className="flex w-full min-w-max rounded-md bg-zinc-900 shadow-[0_2px_10px] shadow-blackA4"
            aria-label="Formatting options"
          >
            <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
              <Toolbar.ToggleItem
                className="inline-flex hover:bg-zinc-800 size-9 flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-1 text-sm leading-none outline-none first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="bold"
                aria-label="Bold"
              >
                oi
              </Toolbar.ToggleItem>
              <Toolbar.ToggleItem
                className="inline-flex hover:bg-zinc-800 size-9 flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-1 text-sm leading-none outline-none first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="italic"
                aria-label="Italic"
              >
                oi
              </Toolbar.ToggleItem>
              <Toolbar.ToggleItem
                className="inline-flex hover:bg-zinc-800 size-9 flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-1 text-sm leading-none outline-none first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                value="strikethrough"
                aria-label="Strike through"
              >
                oi
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar.Root>
        </NodeToolbar>
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
          <ContextMenu.Item className="flex px-2 py-1 group hover:bg-zinc-900 border-none rounded-md cursor-pointer" shortcut="⌘ D" onClick={handleDelete}>
            <span className="flex w-full items-center justify-between group-hover:text-red-500">
              Deletar
              <Backspace weight="duotone" size={16} />
            </span>
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
        <NodeToolbar position={"top"}>
          <div className=" flex gap-2 bg-zinc-900 rounded-lg px-2 py-1 border border-purple-400">
            <button>Cor</button>
          </div>
        </NodeToolbar>
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
        <ContextMenu.Item className="flex px-2 py-1 group hover:bg-zinc-900 border-none rounded-md cursor-pointer" shortcut="⌘ D" onClick={handleDelete}>
          <span className="flex w-full items-center justify-between group-hover:text-red-500">
            Deletar
            <Trash weight="duotone" size={20} />
          </span>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

export function PostItNode({
  id,
  nodes,
  edges,
  setNodes,
  setEdges,
}) {
  const [postIt, setPostit] = useState("");
  const handleDelete = () => {
    handleDeleteNode({ id, nodes, edges, setNodes, setEdges });
  };

  const handleChange = (event) => {
    setPostit(event.target.value);
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <NodeToolbar position={"top"}>
          <div className=" flex gap-2 bg-zinc-900 rounded-lg px-2 py-1 border border-purple-400">
            <button>Cor</button>
          </div>
        </NodeToolbar>
        <div
          className="flex justify-center p-4 w-52 h-20 bg-yellow-300 rounded-md cursor-grabbing shadow-[8px_8px_0px_rgba(0,0,0,0.75)]"
        >
          <textarea
            className="w-full h-full border-none bg-transparent resize-none text-sm text-zinc-950 border border-zinc-900"
            placeholder="Digite seu texto aqui"
            value={postIt}
            onChange={handleChange}
          />
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-2 min-w-44">
        <ContextMenu.Item className="flex px-2 py-1 group hover:bg-zinc-900 border-none rounded-md cursor-pointer" shortcut="⌘ D" onClick={handleDelete}>
          <span className="flex w-full items-center justify-between group-hover:text-red-500">
            Deletar
            <Trash weight="duotone" size={20} />
          </span>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
