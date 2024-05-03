import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectFolders,
  selectFiles,
  removeFile,
  editFile,
} from "@/app/features/counter/folderSlice";
import { FileIcon, IHorizontalDots } from "@/components/ui-icons";
import Modal from "@/components/Modal/DModal";

export default function FolderDetails() {
  const [isEdit, setIsEdit] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isHorizontalClick, setIsHorizontalClick] = useState<number | null>(
    null
  );
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const folders = useAppSelector(selectFolders);
  const files = useAppSelector(selectFiles);
  const folderId = id;

  const folder = useMemo(() => {
    return folders.find((folder) => folder.id === folderId);
  }, [folders, folderId]);

  const filesInFolder = useMemo(() => {
    return files.filter((file) => file.id === folderId);
  }, [files, folderId]);

  return (
    <>
      <div className="p-4 w-[84.2vw] h-[89vh] bg-gray-200 overflow-auto">
        {folder ? (
          <div>
            <div className="font-semibold text-[36px] text-navy-blue text-center sticky top-2 bg-[#E9F7FF] inline-block py-2 px-4 rounded-full">
              Folder : {folder.name}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex border-black flex-wrap gap-4 w-full">
                {filesInFolder.map((file, index) => (
                  <div
                    className="bg-[#d1d5dbad] w-[24%] min-h-[250px] flex items-center flex-col gap-3 truncate px-4 py-4 rounded-[6px] "
                    key={index}
                  >
                    <div className="flex justify-between w-full">
                      <span className="max-w-[90%] truncate">{file.file_name}</span>
                      <div
                        className="relative"
                        onClick={() => {
                          setIsHorizontalClick((pre) =>
                            pre === index ? null : index
                          );
                          setCurrentFileIndex(index);
                        }}
                      >
                        {" "}
                        <IHorizontalDots className="rotate-90 cursor-pointer" />{" "}
                        {isHorizontalClick === index && (
                          <>
                            <div className=" absolute bottom-1 min-h-fit top-7  right-0 flex px-2 gap-2 flex-row  bg-gray-200 rounded-full">
                              <div
                                className="hover:text-blue-400 cursor-pointer"
                                onClick={() => {
                                  setIsEdit(true);
                                  setFileName(file.file_name);
                                }}
                              >
                                Edit
                              </div>
                              <div
                                onClick={() => dispatch(removeFile(index))}
                                className="hover:text-blue-400 cursor-pointer"
                              >
                                Delete
                              </div>{" "}
                            </div>
                          </>
                        )}
                      </div>{" "}
                    </div>
                    <div className="flex-1 w-full rounded-md bg-white flex items-center justify-center">
                      <FileIcon width={105} height={105} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No Files available</p>
        )}
      </div>
      <Modal
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        heading="Rename Folder"
      >
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Rename folder"
            className="pl-2 border border-gray-400 rounded px- py-1 mb-2 w-full"
          />
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsEdit(false);
              }}
              className="text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                dispatch(editFile({ currentFileIndex, fileName }));
              }}
              className="bg-white text-[#0f172a] font-semibold px-4 py-2 rounded hover:text-white hover:bg-[#0f172a]"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
