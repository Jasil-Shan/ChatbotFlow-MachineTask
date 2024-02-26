import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import SidePanel from "../../SidePanel/pages/SidePanel";
import TextNode from "../Custom/TextNode/TextNode";
import Navbar from "../../NavBar/pages/Navbar";
import toast, { Toaster } from "react-hot-toast";

let id = 0;
const getId = () => `${id++}`;

const nodeTypes = {
  custom: TextNode,
};

const Flow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [editedNode, setEditedNode] = useState<string | undefined>()

  const onConnect = useCallback(
    (params: Edge) => setEdges((eds) => addEdge(params, eds)),
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

  const validateNodes = useCallback(() => {
    // Checking if there are more than one nodes
    if (nodes.length <= 1) {
      return true;
    }
    // Checking if any node has empty target
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const targetEdges = edges.filter((edge) => edge.target === node.id);
      if (targetEdges.length === 0) {
        return false;
      }
    }
    return true;
  }, [nodes, edges]);

  const saveEditedNode = useCallback(() => {
    if (!validateNodes()) {
      toast.error("Cannot Save Flow");
      return;
    }
    if (editedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: editedNode } }
            : node
        )
      );
    }
    toast.success("Saved Flow Successfully");
  }, [selectedNode, setNodes, editedNode, validateNodes]);

  const handleEdit = (newText) => {
    setEditedNode(newText);
  };

  const isValidConnection = useCallback(
    (connection) => {
      const { source, target } = connection;
      const sourceEdges = edges.filter((edge) => edge.source === source);
      const targetEdges = edges.filter((edge) => edge.target === target);

      // Prevent more than one edge from the same source
      if (sourceEdges.length > 0) {
        return false;
      }

      // Allow multiple edges to the same target
      return true;
    },
    [edges]
  );

  return (
    <>
      <Toaster />
      <Navbar saveEditedNode={saveEditedNode} />
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
              fitViewOptions={{ maxZoom: 30 }}
              isValidConnection={isValidConnection}
            >
              <Controls />
              <Background />
            </ReactFlow>
          </div>
          <SidePanel selectedNode={selectedNode} handleEdit={handleEdit} />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Flow;
