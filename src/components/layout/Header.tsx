import { useState } from "react";
import Modal from "../Modal/DModal";
import { IcreateFolder, Ifile } from "../ui-icons";
import {
  addFile,
  addFolder,
  selectFolders,
} from "@/app/features/counter/folderSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useParams } from "react-router-dom";

export default function Header() {
  const folders = useAppSelector(selectFolders);
  console.log("lo", folders);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFileName("");
  };

  const handleSave = () => {
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  // console.log(folders);

  const handleChange = (e: any) => {
    setFileName(e.target.value);
  };
  return (
    <>
      {
        <div className="flex items-center gap-4 min-h-[92px] py-[20px] px-4 border-b justify-start text-[18px] w-full ">
          {folders.length > 0 && id && (
            <div
              onClick={openModal}
              className="flex gap-2 font-semibold py-3 px-3 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-[#E9F7FF] hover:text-gray-800 fill-white stroke-white"
            >
              Create File <Ifile />
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            heading="Create File"
          >
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                value={fileName}
                onChange={handleChange}
                placeholder="Enter folder name"
                className="pl-2 border border-gray-400 rounded px-2 py-1 mb-2 w-full"
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
                    dispatch(addFile({ id: id, file_name: fileName }));
                    handleSave();
                  }}
                  className="bg-white text-[#0f172a] font-semibold px-4 py-2 rounded hover:text-white hover:bg-[#0f172a]"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        </div>
      }
    </>
  );
}
