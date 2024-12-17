import { Handle, Position } from "@xyflow/react";

const handleStyle = { left: 10 };

export function SquareNode({ isConnectable }) {
  return (
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
  );
}

export function TextNode({ isConnectable }) {
  return (
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
  );
}