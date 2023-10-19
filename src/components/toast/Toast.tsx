import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CloseIcon, GreenTick, RedCloseIcon } from "../../assets/icons";
import { ToastTypes } from "./types";

const ToastObject = {
  [ToastTypes.ERROR]: {
    bg: "bg-[#FCEFEA]",
    border: "border-[#E7D3CE]",
    Icon: <RedCloseIcon height={36} width={36} />,
  },
  [ToastTypes.SUCCESS]: {
    bg: "bg-[#F1F9F4]",
    border: "border-[#D5E8D9]",
    Icon: <GreenTick height={36} width={36} />,
  },
};

const Toast = (type: ToastTypes, message: string, subText?: string) => {
  const toastData = ToastObject[type];
  return toast(
    ({ closeToast }) => (
      <div
        className={`flex w-[500px] flex-row items-center justify-between rounded-xl ${
          type === ToastTypes.SUCCESS ? "md:w-[290px]" : "md:w-[400px]"
        }
        ${toastData.bg} border border-solid 
        ${toastData.border} px-6 py-5`}
      >
        <div className="flex flex-row items-center w-[98%]">
          <div className="flex items-center mr-1.5">{toastData.Icon}</div>
          <div className="items-center ml-4 w-[98%]">
            <p className="text-base font-normal">{message}</p>
            {subText && <p className="text-sm font-normal">{subText}</p>}
          </div>
        </div>
        <button
          onClick={closeToast}
          className="flex self-center p-2 h-[28px] bg-white rounded-full shadow-md"
        >
          <CloseIcon height={12} width={12} />
        </button>
      </div>
    ),
    {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: false,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      draggable: true,
      progress: undefined,
    }
  );
};

export default Toast;
