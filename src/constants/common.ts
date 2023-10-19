import { Edge, Node } from "reactflow";

import { MessageIcon } from "../assets/icons";
import TextNode from "../components/text-node/TextNode";

export const INITIAL_NODES: Node[] = [
  {
    id: "1",
    type: "textNode",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  }
];

export const INITIAL_EDGES: Edge[] = [];

export const NODE_TYPES = { textNode: TextNode };

export const CHATBOT_NODES = [
  {
    type: "textNode",
    icon: MessageIcon,
    label: "Message",
    content: "Sample Message",
  },
];

export const COLORS ={
  primary: "#2563EB",
  bg: "#aaa"
}
