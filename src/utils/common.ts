import { Edge, Node } from "reactflow";

export const isAllNodesConnected = (nodes: Node[], edges: Edge[]) => {
  //id and source nodes of all nodes and edges are taken
  const allNodesIds = nodes.map((node: { id: string }) => node.id);
  const allSourceEdges = edges.map((edge) => edge.source);
  let count = 0;
  for (let i = 0; i < allNodesIds.length; i++) {
    //node id is included in the allSourceEdges else incrementing count
    if (!allSourceEdges.includes(allNodesIds[i])) count++;
  }
  //checks if there are two nodes that are not connected to any edge
  if (count >= 2) {
    return false;
  }
  return true;
};
