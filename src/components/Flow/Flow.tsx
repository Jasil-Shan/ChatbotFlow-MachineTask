import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import SidePanel from "../SidePanel/SidePanel";
import TextNode from "./Custom/TextNode/TextNode";

let id = 0;
const getId = () => `${id++}`;

const nodeTypes = {
  custom: TextNode,
};

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: { label: `${type} ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeLabel = useCallback(
    (newLabel) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [selectedNode, setNodes]
  );

  return (
    <div className="dndflow flex flex-col md:flex-row flex-grow h-full">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper flex-grow h-full"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <SidePanel selectedNode={selectedNode} updateNode={updateNodeLabel} />
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
