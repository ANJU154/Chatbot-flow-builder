import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  XYPosition,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  COLORS,
  INITIAL_EDGES,
  INITIAL_NODES,
  NODE_TYPES,
} from "../constants/common";
import { isAllNodesConnected } from "../utils/common";
import { ToastTypes } from "../components/toast/types";
import SidePanel from "../components/side-panel/SidePanel";
import Toast from "../components/toast/Toast";

let id = 0;
const getId = () => `dndnode_${id++}`;

const ChatbotFlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLInputElement>(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodeName, setNodeName] = useState<string | undefined>("");
  const [selectedNode, setSelectedNode] = useState<Node>();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  useEffect(() => {
    // Filter the 'nodes' array to find selected nodes (nodes with 'selected' property set to true)
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    // Check if there is at least one selected node
    if (node[0] as Node) {
      setSelectedNode(node[0] as Node);
      setIsSelected(true);
    } else {
      setSelectedNode(undefined);
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    //Updating the node name where there is a change in the selected node
    setNodeName(selectedNode?.data.label);
  }, [selectedNode]);

  useEffect(() => {
    //Updating the node label of the selected node when the node name is edited
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            label: nodeName || " ",
          };
        }
        return node;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeName, setNodes]);

  const onInit = (reactFlowInstance: ReactFlowInstance) =>
    setReactFlowInstance(reactFlowInstance);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    //provides visual feedback to indicate that a move operation is allowed
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    // Extract data transferred during the drag operation
    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("label");
    // Calculate the position of the dropped element
    let position = { x: event.clientX, y: event.clientY };
    if (reactFlowInstance && reactFlowBounds)
      position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds?.left,
        y: event.clientY - reactFlowBounds?.top,
      } as XYPosition);
    // Create a new node with unique ID, type, and position
    const newNode: Node = {
      id: getId(),
      type,
      position,
      data: { heading: "Send Message", label: label },
    };
    // Add the new node to the 'nodes' state
    setNodes((es) => es.concat(newNode));
    // Set the newly added node as the selected node
    setSelectedNode(newNode);
  };

  const onConnect = useCallback(
    (params: Edge<any> | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.primary },
            style: { stroke: COLORS.primary, opacity: 0.7 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handleSaveChanges = () => {
    if (isAllNodesConnected(nodes, edges)) {
      Toast(ToastTypes.SUCCESS, "Success");
      clearSelectedNode();
    } else
      Toast(ToastTypes.ERROR, "More than one Node has empty target handles");
  };

  const clearSelectedNode = () => {
    setIsSelected(false);
  };

  return (
    <div style={{ height: "calc(100vh - 58px)" }}>
      <div className="flex w-full bg-slate-200 py-2">
        <div className="flex items-center text-blue-600 text-lg font-medium ml-6">
          Chatbot Flow Builder
        </div>
        <button
          onClick={handleSaveChanges}
          className="flex ml-auto mr-6 text-base px-3 py-2 rounded-md bg-white text-blue-600 border border-blue-600"
        >
          Save Changes
        </button>
      </div>
      <div className="flex border h-full p-3">
        <ReactFlowProvider>
          <div ref={reactFlowWrapper} className="w-full md:w-3/4 p-3">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              nodeTypes={NODE_TYPES}
              fitView
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="bottom-center"
            >
              <MiniMap zoomable pannable />
              <Controls />
              <Background color={COLORS.bg} gap={16} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <div className="w-full md:w-1/4 border-l border-gray-300 p-3">
          <SidePanel
            isSelected={isSelected}
            nodeName={nodeName || ""}
            setNodeName={setNodeName}
            clearSelectedNode={clearSelectedNode}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotFlowBuilder;
