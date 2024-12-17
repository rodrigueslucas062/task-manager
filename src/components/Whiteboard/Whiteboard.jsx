import { addEdge, Background, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { SquareNode, TextNode } from "./nodes/nodes";
import { useCallback } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Toolbox from "./Toolbox";
import { handleAddNode, handleAddTextNode } from "@/utils/utils";

const CustomEdges = [];

const NODE_TYPES = {
    square: SquareNode,
    text: TextNode,
};

export default function Whiteboard() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const [edges, setEdges, onEdgesChange] = useEdgesState(CustomEdges);

    const onConnect = useCallback(
        (params) => {
            return setEdges((eds) => addEdge(params, eds))
        }, [setEdges],
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
                        defaultEdgeOptions={{ type: 'default' }}
                    >
                        <Background gap={24} size={2} />
                        <Controls />
                        <Toolbox setNodes={setNodes} />
                    </ReactFlow>

                    <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-2 min-w-32">
                        {/* <ContextMenu.Item>
                            <button onClick={handleAddNode}>
                                Adicionar bloco
                            </button>
                        </ContextMenu.Item> */}
                        {/* <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ D">Duplicate</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ N">Archive</ContextMenu.Item> */}

                        <ContextMenu.Sub>
                            <ContextMenu.SubTrigger className="flex justify-center px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ E">Adicionar</ContextMenu.SubTrigger>
                            <ContextMenu.SubContent className="bg-zinc-950 rounded-lg overflow-hidden p-4">
                                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ E">
                                    <button onClick={(event) => handleAddNode(event, setNodes)}>
                                        Adicionar bloco
                                    </button>
                                </ContextMenu.Item>
                                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">
                                    <button onClick={(event) => handleAddTextNode(event, setNodes)}>
                                        Adicionar bloco de texto
                                    </button>
                                </ContextMenu.Item>
                                {/* <ContextMenu.Separator /> */}
                            </ContextMenu.SubContent>
                        </ContextMenu.Sub>

                        {/* <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Share</ContextMenu.Item>
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Add to favorites</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ ⌫" color="red">
                            Delete
                        </ContextMenu.Item> */}
                    </ContextMenu.Content>
                </div>
            </ContextMenu.Trigger>
        </ContextMenu.Root>
    );
}
