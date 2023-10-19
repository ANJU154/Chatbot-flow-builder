import { FC, useState } from "react";
import { Connection, Handle, NodeProps, Position } from "reactflow";

import { MessageIcon } from "../../assets/icons";
import { COLORS } from "../../constants/common";

const TextNode: FC<NodeProps> = ({
  data,
  isConnectable = true,
  targetPosition = Position.Left,
  sourcePosition = Position.Right,
  id,
  // sourceNodes,
}) => {
  const [sourceConnected, setSourceConnected] = useState(false);

  const handleConnect = (connection: Connection) => {
    // Check if this is a source handle and if it's already connected
    if (connection.source === id) {
      setSourceConnected(true);
    }
  };

  return (
    <div
      className={`min-w-40 shadow-md rounded-md bg-white   ${
        isConnectable ? "border-solid border-2 border-blue-600/50" : ""
      } `}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        style={{
          backgroundColor: COLORS.primary,
          top: "50%",
          left: "-1%",
          transform: "translateY(-50%)",
        }}
      />
      <div className="flex flex-col">
        <div className="flex max-h-max px-2 py-1 text-left text-blue-600 text-xs font-bold rounded-t-md bg-blue-300">
          <MessageIcon className="mr-2" />
          Send Message
        </div>
        <div className="px-3 py-2">
          <div className="text-xs font-normal text-black">{data.label}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        style={{
          backgroundColor: COLORS.primary,
          top: "50%",
          left: "97.5%",
          transform: "translateY(-50%)",
        }}
        isConnectable={!sourceConnected && isConnectable}
        onConnect={handleConnect}
      />
    </div>
  );
};

export default TextNode;
