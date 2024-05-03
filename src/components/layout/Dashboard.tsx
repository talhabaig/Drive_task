import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IDrive, IHorizontalDots, IcreateFolder } from "../ui-icons";
import Modal from "../Modal/DModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addFolder, selectFolders } from "@/app/features/counter/folderSlice";

export default function Dashboard() {
  const foldername = useAppSelector(selectFolders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [sideBarItems, setSideBarItems] = useState([
    {
      id: 1,
      label: "",
      link: `/folder/id`,
    },
  ]);
  const generateRandomId = (length = 6) => {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFolderName("");
  };

  const handleSave = (id: any) => {
    const newItem = {
      id: id,
      label: folderName,
      link: `/folder/${id}`,
    };

    setSideBarItems([...sideBarItems, newItem]);
    closeModal();
  };

  const handleChange = (e: any) => {
    setFolderName(e.target.value);
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="">
      <div className="flex flex-col h-full transition-all duration-500">
        <div className="px-[2rem] border-b min-h-[92px] h-[92px] flex items-center  border-[#8d9fb73d]">
          <div className="flex  items-center gap-4">
            {" "}
            <IDrive /> <span className="font-bold text-[24px]">Drive</span>{" "}
          </div>
        </div>

        <div className="flex flex-col justify-between h-full ">
          <div className="h-[calc(100vh-241px)]  overflow-auto">
          {sideBarItems && sideBarItems?.map((item) => (
  item.label && (
    <div
      className={`flex min-h-[59px] gap-4 py-4 px-8 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis items-center hover:bg-[#E9F7FF] rounded-full`}
      key={item.id}
      onClick={() => {
        navigate(item.link);
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className={`flex gap-x-4 items-center `}>
          <IcreateFolder />
          <div className="text-[18px] font-bold text-navy-blue w-[8rem] truncate">
            {item.label}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
))}


          </div>
          <div></div>
        </div>
      </div>
      <div className="flex min-h-[59px] gap-4 py-4 px-8 whitespace-nowrap overflow-hidden overflow-ellipsis items-center">
        <div className="">
          <div
            onClick={openModal}
            className="flex gap-2 font-semibold py-3 px-3 bg-gray-800 text-white rounded-full cursor-pointer fill-white stroke-white"
          >
            Create Folder <IcreateFolder />
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal} heading="Create Folder">
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                value={folderName}
                onChange={handleChange}
                placeholder="Enter folder name"
                className="pl-2 border border-gray-400 rounded px- py-1 mb-2 w-full"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const newId = generateRandomId(6);
                    dispatch(addFolder({ id: newId, name: folderName }));
                    handleSave(newId);
                  }}
                  className="bg-white text-[#0f172a] font-semibold px-4 py-2 rounded hover:text-white hover:bg-[#0f172a]"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
