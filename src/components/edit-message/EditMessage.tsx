import { FC } from "react";

import { EditMessageProps } from "./types";

const EditMessage: FC<EditMessageProps> = ({ nodeName, setNodeName }) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <label className="mr-3 text-gray-600 ">Text</label>
      <textarea
        className=" border-2 focus:border-blue-600 rounded-md focus:outline-none text-gray-700 pl-3 w-[100%] h-[100px]"
        value={nodeName}
        onChange={(event) => setNodeName(event.target.value)}
      />
    </div>
  );
};

export default EditMessage;
