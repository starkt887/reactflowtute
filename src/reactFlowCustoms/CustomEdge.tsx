import { Button } from '@mui/material';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getStraightPath, useReactFlow } from 'reactflow';
import CloseIcon from '@mui/icons-material/Close';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {

    const { setEdges } = useReactFlow()
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        // borderRadius: 10
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <Button sx={{
                    fontSize:"10px"
                }} color='info' size='small' variant='outlined' startIcon={<CloseIcon />}
                    style={{
                        position: 'absolute',
                        transform: `translate(-500%,-50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                    onClick={() => {
                        setEdges((es) => es.filter((e) => e.id !== id));
                    }}
                >
                    Remove
                </Button>
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomEdge