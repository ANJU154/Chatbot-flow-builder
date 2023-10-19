import { FC } from "react";

import { SidePanelProps } from "./types";
import { CHATBOT_NODES } from "../../constants/common";
import { BackIcon } from "../../assets/icons";
import EditMessage from "../edit-message/EditMessage";

const SidePanel: FC<SidePanelProps> = ({
  nodeName,
  setNodeName,
  isSelected,
  clearSelectedNode,
}) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    label: string
  ) => {
    if (event.dataTransfer) {
      //store data that can be transferred to the drop target during the drag-and-drop operation
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.setData("label", label);
      event.dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <>
      <div className="text-blue-600 font-medium border-b border-gray-300 mb-3 pl-3 pb-3 shadow-sm">
        {isSelected ? (
          <div className="flex flex-row items-center">
            <BackIcon onClick={clearSelectedNode} className="mr-2" />
            Edit Message
          </div>
        ) : (
          "Nodes Panel"
        )}
      </div>
      <div className="flex justify-start pl-3">
        {isSelected ? (
          <EditMessage nodeName={nodeName} setNodeName={setNodeName} />
        ) : (
          CHATBOT_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.type}
                className="flex flex-col justify-center items-center border border-blue-600 text-blue-600 bg-white rounded-md py-4 px-5 min-w-20"
                onDragStart={(event) =>
                  onDragStart(event, node.type, node.content)
                }
                draggable
              >
                <Icon />
                {node.label}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default SidePanel;
