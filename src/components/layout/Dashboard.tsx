import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IDrive, IHorizontalDots, IcreateFolder } from "../ui-icons";
import Modal from "../Modal/DModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addFolder,
  removeFolder,
  renameFolder,
  selectFolders,
} from "@/app/features/counter/folderSlice";
export default function Dashboard() {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const [isHorizontalClick, setIsHorizontalClick] = useState<any>(null);
  const [folderName, setFolderName] = useState("");
  const [editFolder, setEditFolder] = useState<any>();
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
    setIsDelete(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setFolderName("");
    setIsDelete(false);
  };

  const handleEdit = (folderName: string, folder: any) => {
    setFolderName(folderName);
    setEditFolder(folder);
    setIsEdit(true);
  };

  const handleSave = (id: any) => {
    const newItem = {
      id: id,
      label: folderName,
      link: `/folder/${id}`,
    };

    setSideBarItems([...sideBarItems, newItem]);
    closeModal();
    setIsDelete(false);
  };

  const handleChange = (e: any) => {
    setFolderName(e.target.value);
  };

  const handleCancel = () => {
    closeModal();
    setIsDelete(false);
  };

  return (
    <div className="">
      <div className="flex flex-col h-full transition-all duration-500">
        {/* Header */}
        <div className="px-[2rem] border-b min-h-[92px] h-[92px] flex items-center border-[#8d9fb73d]">
          <div className="flex items-center gap-4">
            {" "}
            <IDrive /> <span className="font-bold text-[24px]">Drive</span>{" "}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col justify-between h-full">
          <div className="h-[calc(100vh-241px)] overflow-auto">
            {folders &&
              folders.map(
                (item, index) =>
                  item.name && (
                    <NavLink
                      className={({ isActive }) =>
                        `${
                          isActive && "!bg-[#E9F7FF]"
                        } hover:bg-[#E9F7FF] flex min-h-[59px] gap-4 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis items-center rounded-full`
                      }
                      to={`/folder/${item.id}`}
                    >
                      <div
                        className={`flex min-h-[59px] gap-4 py-4 px-8 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis items-center rounded-full`}
                        key={item.id}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div className={`flex gap-x-4 items-center `}>
                            <IcreateFolder />
                            <div className=" text-[18px] font-bold text-navy-blue w-[8rem] truncate">
                              {item.name}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`transform rotate-90`}
                          onClick={() => {
                            setIsHorizontalClick(index);
                          }}
                        >
                          <IHorizontalDots />
                        </div>
                        <div className="relative ">
                          {" "}
                          {isHorizontalClick === index && (
                            <>
                              <div className=" absolute bottom-1 right-9 flex px-2 gap-2 flex-row  bg-gray-200 rounded-full">
                                <div
                                  className="hover:text-blue-400"
                                  onClick={() => {
                                    setIsEdit(true);
                                    setIsHorizontalClick(false);
                                    handleEdit(item.name, item);
                                  }}
                                >
                                  Edit
                                </div>
                                <div
                                  onClick={() => {
                                    setIsDelete(true);
                                    setIsHorizontalClick(false);
                                  }}
                                  className="hover:text-blue-400"
                                >
                                  Delete
                                </div>{" "}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  )
              )}
          </div>
        </div>
      </div>

      {/* Create Folder Button */}
      <div className="flex min-h-[59px] gap-4 py-4 px-8 whitespace-nowrap overflow-hidden overflow-ellipsis items-center">
        <div
          onClick={openModal}
          className="flex gap-2 font-semibold py-3 px-3 bg-gray-800 text-white rounded-full cursor-pointer fill-white stroke-white"
        >
          Create Folder <IcreateFolder />
        </div>
      </div>

      {/* Modal */}
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

      {/* Edit Modal */}
      <Modal isOpen={isEdit} onClose={closeModal} heading="Rename Folder">
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            value={folderName}
            onChange={handleChange}
            placeholder="Rename folder"
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
                dispatch(renameFolder({ id: editFolder.id, name: folderName }));
                setIsEdit(false);
              }}
              className="bg-white text-[#0f172a] font-semibold px-4 py-2 rounded hover:text-white hover:bg-[#0f172a]"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <>
        {folders &&
          folders.map((item) => (
            <Modal
              isOpen={isDelete}
              onClose={closeModal}
              heading={`Are you sure you want to delete ${item.name}`}
            >
              <div className="flex flex-col items-center w-full">
                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      dispatch(removeFolder({ id: item.id }));
                      setIsDelete(false);
                    }}
                    className="bg-white text-[#0f172a] font-semibold px-4 py-2 rounded hover:text-white hover:bg-[#0f172a]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Modal>
          ))}{" "}
      </>
    </div>
  );
}
