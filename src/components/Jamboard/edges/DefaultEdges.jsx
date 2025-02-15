import { getSmoothStepPath } from "@xyflow/react"

export function DefaultEdges({ id, style, markerEnd, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }) {
  const [edgePath] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })

  return (
    <path id={id} style={style} className="react-flow__edge-path stroke-3 stroke-zinc-300"
      d={edgePath} markerEnd={markerEnd} />
  )
}