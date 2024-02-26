import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Background,
  Node,
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
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [editedNode, setEditedNode] = useState<string | undefined>();

  const onConnect = useCallback(
    (params: Edge) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  //function for draging elements
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //function for drop elements
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      //setting custom node and label
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

  //function for selecting node when click
  const onNodeClick = useCallback((event:MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const validateNodes = useCallback(() => {
    const numberOfNodes = nodes.length;
    const numberOfEdges = edges.length;

    // Check if number of nodes is more than number of edges plus one
    return numberOfNodes > numberOfEdges + 1;
}, [nodes, edges]);


  //save node after editing
  const saveEditedNode = useCallback(() => {
    //validating nodes before saving
    if (validateNodes()) {
      toast.error("Cannot Save Flow");
      return;
    }
    if (editedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode?.id
            ? { ...node, data: { ...node.data, label: editedNode } }
            : node
        )
      );
    }
    toast.success("Saved Flow Successfully");
  }, [selectedNode, setNodes, editedNode, validateNodes]);

  const handleEdit = (newText : string) => {
    setEditedNode(newText);
  };

  //validating target handle
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
