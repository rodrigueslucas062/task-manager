import { addEdge, Background, ConnectionMode, Controls, MiniMap, ReactFlow, SelectionMode, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { SquareNode, TextNode } from "./nodes/nodes";
import { useCallback, useMemo, useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Toolbox from "./Toolbox";
import { handleAddNode, handleAddTextNode, handleDeleteNode } from "@/utils/utils";
import { DefaultEdges } from "./edges/DefaultEdges";

export default function Whiteboard() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [activeTool, setActiveTool] = useState("pointer")

    const NODE_TYPES = useMemo(
        () => ({
            square: (props) => (
                <SquareNode
                    {...props}
                    nodes={nodes}
                    edges={edges}
                    setNodes={setNodes}
                    setEdges={setEdges}
                />
            ),
            text: (props) => (
                <TextNode
                    {...props}
                    nodes={nodes}
                    edges={edges}
                    setNodes={setNodes}
                    setEdges={setEdges}
                />
            ),
        }),
        [nodes, edges, setNodes, setEdges]
    );

    const EDGE_TYPES = { default: DefaultEdges };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const flowProps = useMemo(() => {
        if (activeTool === "pointer") {
            console.log('hehe true')
            return {
                panOnScroll: false,
                selectionOnDrag: true,
                panOnDrag: [],
            };
        }
    }, [activeTool]);

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div className="h-screen w-screen">
                    <ReactFlow
                        colorMode="dark"
                        nodeTypes={NODE_TYPES}
                        edgeTypes={EDGE_TYPES}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDelete={handleDeleteNode}
                        defaultEdgeOptions={{ type: 'default' }}
                        connectionMode={ConnectionMode.Loose}
                        {...flowProps}
                    >
                        <Background gap={24} size={2} />
                        <Controls />
                        <MiniMap pannable zoomable nodeStrokeColor={"transparent"} maskStrokeColor={"none"} maskColor={"rgb(255, 255, 255, 0.0)"} position={"top-right"} className="bg-transparent" ariaLabel={"React Flow mini map"} />
                        <Toolbox setNodes={setNodes} activeTool={activeTool} setActiveTool={setActiveTool} />
                    </ReactFlow>
                </div>
            </ContextMenu.Trigger>

            <ContextMenu.Content className="bg-zinc-950 rounded-lg overflow-hidden p-2 min-w-32 w-64">
                {/* <ContextMenu.Item>
                            <button onClick={handleAddNode}>
                                Adicionar bloco
                            </button>
                        </ContextMenu.Item> */}
                {/* <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ D">Duplicate</ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ N">Archive</ContextMenu.Item> */}

                <ContextMenu.Sub>
                    <ContextMenu.SubTrigger className="flex justify-center px-2 py-1 hover:bg-violet-600 border-none rounded-md" shortcut="⌘ E">Adicionar</ContextMenu.SubTrigger>
                    <ContextMenu.SubContent className="bg-zinc-950 rounded-lg overflow-hidden p-4">
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ E"
                            onClick={(event) => handleAddNode(event, setNodes)}>
                            Adicionar bloco
                        </ContextMenu.Item>
                        <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md w-full cursor-pointer">
                            <button onClick={(event) => handleAddTextNode(event, setNodes)}>
                                Adicionar bloco de texto
                            </button>
                        </ContextMenu.Item>
                        {/* <ContextMenu.Separator /> */}
                    </ContextMenu.SubContent>
                </ContextMenu.Sub>

                <ContextMenu.Separator />
                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Texto</ContextMenu.Item>
                <ContextMenu.Item className="flex px-2 py-1 hover:bg-zinc-900 border-none rounded-md">Comentários</ContextMenu.Item>
                <ContextMenu.Separator />
            </ContextMenu.Content>
        </ContextMenu.Root>
    );
}
