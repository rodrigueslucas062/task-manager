import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { SquareNode } from "./nodes/nodes";
import { useCallback, useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const CustomEdges = [];

const CustomNodes = [
    {
        id: '1',
        position: { x: 500, y: 500 },
        data: { label: 'Hello' },
        type: SquareNode,
    },
    {
        id: '2',
        position: { x: 800, y: 500 },
        data: { label: 'World' },
        type: SquareNode,
    },
];

const NODE_TYPES = {
    square: SquareNode
}

export default function Whiteboard() {
    const [nodes, setNodes] = useState(CustomNodes);
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
                    <ReactFlow colorMode="dark"
                        nodeTypes={NODE_TYPES}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}>
                        <Background gap={24} size={2} />
                        <Controls />
                    </ReactFlow>

                    <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-4 ">
                        <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
                        <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

                        {/* <ContextMenu.Sub>
                            <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
                            <ContextMenu.SubContent>
                                <ContextMenu.Item>Move to project…</ContextMenu.Item>
                                <ContextMenu.Item>Move to folder…</ContextMenu.Item>
                                <ContextMenu.Separator />
                                <ContextMenu.Item>Advanced options…</ContextMenu.Item>
                            </ContextMenu.SubContent>
                        </ContextMenu.Sub> */}

                        <ContextMenu.Separator />
                        <ContextMenu.Item>Share</ContextMenu.Item>
                        <ContextMenu.Item>Add to favorites</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item shortcut="⌘ ⌫" color="red">
                            Delete
                        </ContextMenu.Item>
                    </ContextMenu.Content>
                </div>
            </ContextMenu.Trigger>
        </ContextMenu.Root>
    )
}