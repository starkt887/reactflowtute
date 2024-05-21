import { useCallback } from 'react'
import './App.css'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, OnConnect, OnEdgesChange, OnNodesChange, OnNodesDelete, Panel, addEdge, applyEdgeChanges, applyNodeChanges, getConnectedEdges, getIncomers, getOutgoers, useEdgesState, useNodesState, useReactFlow } from 'reactflow'

import 'reactflow/dist/style.css';

import { Box, Button, ThemeProvider } from '@mui/material';
import AddNodeButton from './components/AddNodeButton';

import { useTheme } from '@emotion/react';
import { nodeTypes } from './reactFlowCustoms/NodeTypes';
import { edgeTypes } from './reactFlowCustoms/EdgeTypes';
import axios from 'axios';



function App() {

  const theme = useTheme()

  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])
  const { setViewport, getNodes } = useReactFlow()


  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      // console.log("Nds Changes: ", changes);
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      console.log("Eds Changes: ", changes);
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (params) => {
      console.log(params);
      let edge = { ...params, type: "customEdge" }
      setEdges((eds) => addEdge(edge, eds))
    },
    [setEdges],
  );

  const center = useCallback(
    () => {
      let wWidth = window.innerWidth
      setViewport({ x: (wWidth / 2) - 100, y: 100, zoom: 1 }, { duration: 800 });
      console.log("Hello there");
    },
    [setViewport],
  )
  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, type: "customEdge", source, target }))
          );
          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  const clear = () => {
    setEdges([])
    setNodes([])
  }

  const scheduleNode = () => {
    const nodes = getNodes();
    let dataNodes = nodes.map((node) => {
      let data = {
        ...node.data.dataSource
      }
      return data
    })

    console.log(dataNodes);
    console.log(import.meta.env.VITE_BACKEND_URL);

    axios.post(`${import.meta.env.VITE_BACKEND_URL}post-new-schedule`,
      dataNodes)
      .then((res) => {
        console.log(res);
        console.log(res.data);

      }).catch((error) => {
        console.log(error);
      })


  }



  return (
    <>

      <ThemeProvider theme={theme}>
        <div style={{ width: '100vw', height: '100vh' }}>
          {/* <LeadSourceNode />
        <TextUpdaterNode /> */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <Panel position="top-center">
              <Box display="flex">
                <Button size='small' variant='contained' onClick={center}
                  sx={{
                    mr: 1
                  }}>Center</Button>
                <AddNodeButton />
                <Button size='small' color='error' variant='contained' onClick={clear}>Clear</Button>

              </Box>
            </Panel>
            <Panel position='top-right'>
              <Button size='small' variant='contained' onClick={scheduleNode}>Save & Schedule</Button>
            </Panel>
            <Controls />
            <MiniMap />

            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div >
      </ThemeProvider>

    </>
  )
}

export default App
