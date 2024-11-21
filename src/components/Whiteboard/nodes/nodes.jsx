import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";

const handleStyle = { left: 10 };

export function SquareNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
      }, []);
     
      return (
        <div className="text-updater-node w-[200px] h-[200px] bg-purple-400">
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <div>
            <label htmlFor="text">Text:</label>
            <input id="text" name="text" onChange={onChange} className="nodrag" />
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
          />
        </div>
      );
}


 
export function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className="text-updater-node w-[200px] h-[200px] bg-purple-400">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
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