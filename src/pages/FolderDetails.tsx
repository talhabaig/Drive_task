import React, { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectFolders, selectFiles } from "@/app/features/counter/folderSlice";
import { FileIcon } from "@/components/ui-icons";

export default function FolderDetails() {
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
    <div className="p-4 w-[84.2vw] h-[89vh] bg-gray-200 overflow-auto">
      {folder ? (
        <div>
          <div className="font-semibold text-[36px] text-navy-blue text-center sticky top-2 bg-[#E9F7FF] inline-block py-2 px-4 rounded-full">
           Folder : {folder.name}
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex border-black flex-wrap justify-start gap-4 items-center">
              {filesInFolder.map((file, index) => (
                <div
                  className="bg-white flex items-center gap-3 min-w-[10rem] w-full truncate px-4 py-4 rounded-[6px] "
                  key={index}
                >
                  <FileIcon width={25} height={25} />
                  <span>{file.file_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No Files available</p>
      )}
    </div>
  );
}
