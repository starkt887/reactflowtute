import { useCallback } from 'react'
import './App2.css'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, OnConnect, OnEdgesChange, OnNodesChange, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow'

import 'reactflow/dist/style.css';



function App2() {

  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])


  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      console.log("Nds Changes: ", changes);
      setNodes((nds) => {
        console.log("Nds: ", nds);
        return applyNodeChanges(changes, nds)
      })
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      console.log("Eds Changes: ", changes);
      setEdges((eds) => {
        console.log("Eds: ", eds)
        return applyEdgeChanges(changes, eds)
      })
    },
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (params) => {
      console.log(params);
      setEdges((eds) => {
        console.log(eds);

        return addEdge(params, eds)
      })
    },
    [setEdges],
  );

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />

          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  )
}

export default App2
