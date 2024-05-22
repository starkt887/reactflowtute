import { Button } from '@mui/material'
import { Edge, addEdge, useReactFlow } from 'reactflow'

import NodeSelector from './NodeSelector';
import { useState } from 'react';
import { IT1LeadSource, IT2ColdEmail, IT3Delay } from '../modal/INodeData.modal';
import { createNode } from '../utils/nodeGenerator';
import {
    PersonAdd,
    AccessAlarmOutlined,
    MailOutline
} from '@mui/icons-material';




const AddNodeButton = () => {

    const { setEdges, setNodes, getNodes, setViewport } = useReactFlow()
    const [open, setOpen] = useState(false)
    const [isAtInit, setIsAtInit] = useState(true)
    const [selectedNode, setSelectedNode] = useState<string>("")
    const [data, setData] = useState<IT1LeadSource | IT2ColdEmail | IT3Delay>()


    const nodeStyleData = () => {
        let nodeStyle = {}
        if (selectedNode === "t1LeadSource") {
            nodeStyle = {
                id: "t1LeadSource",
                title: "Lead Source",
                description: "Email list is added",
                color: "#d36689",
                icon: <PersonAdd />,
                showAsTemplate: false
            }
        }
        else if (selectedNode === "t2ColdEmail") {
            nodeStyle = {
                id: "t2ColdEmail",
                title: "Cold Email",
                description: "Email template is selected",
                color: "#9054D8",
                icon: <MailOutline />,
                showAsTemplate: false
            }
        }
        else if (selectedNode === "t3Delay") {
            nodeStyle = {
                id: "t3Delay",
                title: "Wait",
                description: `Added delay`,
                color: "#6EC2FC",
                icon: <AccessAlarmOutlined />,
                showAsTemplate: false
            }
        }
        return nodeStyle
    }

    const addNode = () => {
        console.log(data);
        if (!data) {
            alert("Please configure the node")
            return;
        }
        let nodeStyle = nodeStyleData()

        let id = "1"
        let node = createNode(id, data!, nodeStyle)

        let edge = null
        let allNodes = getNodes();

        if (allNodes.length > 0) {
            let lastNode = allNodes[allNodes.length - 1]
            id = (parseInt(lastNode.id) + 1).toString()
            node.id = id
            node.position = { x: 0, y: lastNode.position.y + 100 }
            // node.data.label = id
            edge = {
                id: id,
                type: "customEdge",
                sourceHandle: 'bottom',
                source: lastNode.id,
                target: id,
            } as Edge
        }
        let wWidth = window.innerWidth
        setViewport({
            x: node.position.x + ((wWidth / 2) - 100),
            y: -node.position.y + 300, zoom: 1
        },
            { duration: 800 }
        );
        console.log(id);

        if (edge) {
            console.log("Edge", edge);
            setEdges((eds) => addEdge(edge, eds))
        }
        setNodes((nds) => nds.concat(node));
        setData(undefined)
        setOpen(false)
    }
    const handleNodeSelectorOpen = () => {
        if (getNodes().length > 0) {
            setIsAtInit(false)
        }
        setSelectedNode("")
        setOpen(true)
    }


    const showData = () => {
        console.log(data);
    }
    const showNodes = () => {
        console.log(getNodes());
    }

    return (
        <div>
            <NodeSelector
                open={open}
                setOpen={setOpen}
                isAtInit={isAtInit}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                data={data!}
                setData={setData}
                addNode={addNode} />
            <Button size='small' variant='contained' onClick={handleNodeSelectorOpen}
                sx={{
                    mr: 1
                }}>
                Add node
            </Button>
            {/* <Button onClick={showData}>Show Data</Button>
            <Button size='small' color='error' variant='contained' onClick={showNodes}>Show Nodes</Button> */}
        </div>
    )
}

export default AddNodeButton