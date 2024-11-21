import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { SquareNode } from "./nodes/nodes";
import { useCallback, useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Toolbox from "./Toolbox";

const CustomEdges = [];

const NODE_TYPES = {
    square: SquareNode,
};

export default function Whiteboard() {
    const [nodes, setNodes] = useState([
        {
            id: '1',
            type: 'square',
            position: { x: 100, y: 100 },
            data: { label: 'Meu Nó' }
        },
    ]);

    const [edges, setEdges] = useState(CustomEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div className="h-screen w-screen">
                    <ReactFlow
                        colorMode="dark"
                        nodeTypes={NODE_TYPES}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >
                        <Background gap={24} size={2} />
                        <Controls />
                        <Toolbox />
                    </ReactFlow>

                    <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-4">
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ E">Edit</ContextMenu.Item>
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ D">Duplicate</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ N">Archive</ContextMenu.Item>

                        <ContextMenu.Sub>
                            <ContextMenu.SubTrigger>Adicionar</ContextMenu.SubTrigger>
                            <ContextMenu.SubContent className="bg-zinc-950 rounded-lg overflow-hidden p-4">
                                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Texto</ContextMenu.Item>
                                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Bloco</ContextMenu.Item>
                                <ContextMenu.Separator />
                                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Outros</ContextMenu.Item>
                            </ContextMenu.SubContent>
                        </ContextMenu.Sub>

                        <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Share</ContextMenu.Item>
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Add to favorites</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ ⌫" color="red">
                            Delete
                        </ContextMenu.Item>
                    </ContextMenu.Content>
                </div>
            </ContextMenu.Trigger>
        </ContextMenu.Root>
    );
}
