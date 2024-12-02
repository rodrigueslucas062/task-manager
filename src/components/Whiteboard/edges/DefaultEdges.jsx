import { getSmoothStepPath } from "@xyflow/react"

export function DefaultEdges( id, style, markerEnd, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition) {
    const [edgePath] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })

    return (
        <path id={id} style={style} className="stroke-2 stroke-zinc-300"
            d={edgePath} markerEnd={markerEnd} />
    )
}