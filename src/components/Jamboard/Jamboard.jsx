import { addEdge, Background, ConnectionMode, Controls, MiniMap, ReactFlow, SelectionMode, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { CircleNode, PostItNode, SquareNode, TextNode } from "./nodes/nodes";
import { useCallback, useMemo, useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Toolbox from "./Toolbox";
import { handleAddCircleNode, handleAddNode, handleAddPostIt, handleAddStickyNotesNode, handleAddTextNode, handleDeleteNode } from "@/utils/utils";
import { DefaultEdges } from "./edges/DefaultEdges";
import { CaretRight } from "phosphor-react";

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
      circle: (props) => (
        <CircleNode
          {...props}
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      ),
      postit: (props) => (
        <PostItNode
          {...props}
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      )
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
                        </ContextMenu.Item>
                <ContextMenu.Item className="flex px-2 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ D">Duplicate</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item className="flex px-2 hover:bg-zinc-900 border-none rounded-md" shortcut="⌘ N">Archive</ContextMenu.Item> */}

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger className="flex justify-center px-2 hover:bg-violet-600 rounded-md cursor-pointer" shortcut="⌘ E">
            <span className="flex w-full items-center justify-between">
              Adicionar
              <CaretRight size={16} />
            </span>
          </ContextMenu.SubTrigger>
          <ContextMenu.SubContent className="bg-zinc-950 rounded-lg overflow-hidden p-2">
            <ContextMenu.Item className="flex px-2 py-0.5 hover:bg-violet-600 border-none rounded-md w-full cursor-pointer" shortcut="⌘ E"
              onClick={(event) => handleAddNode(event, setNodes)}>
              Adicionar bloco
            </ContextMenu.Item>
            <ContextMenu.Item className="flex px-2 py-0.5 hover:bg-violet-600 border-none rounded-md w-full cursor-pointer"
              onClick={(event) => handleAddCircleNode(event, setNodes)}>
              Adicionar bloco azul
            </ContextMenu.Item>
            <ContextMenu.Separator className="my-3 h-0.5 bg-white rounded-full" />
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator className="my-3 h-0.5 bg-white rounded-full" />
        <ContextMenu.Item className="flex px-2 hover:bg-violet-600 border-none rounded-md w-full cursor-pointer"
          onClick={(event) => handleAddStickyNotesNode(event, setNodes)}>
          Adicionar Sticky Note
        </ContextMenu.Item>
        {/* <ContextMenu.Item className="flex px-2 hover:bg-violet-600 border-none rounded-md w-full cursor-pointer">Texto</ContextMenu.Item>
                <ContextMenu.Item className="flex px-2 hover:bg-violet-600 border-none rounded-md w-full cursor-pointer">Comentários</ContextMenu.Item> */}
        <ContextMenu.Separator />
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
