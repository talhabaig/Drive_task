import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectFolders, fetchFolderByIdAsync, selectFiles } from "@/app/features/counter/folderSlice";

export default function FolderDetails() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const folders = useAppSelector(selectFolders);
  const files = useAppSelector(selectFiles);
  useEffect(() => {
    const folderId = location.pathname.split("/").pop();
    if (folderId) {
      dispatch(fetchFolderByIdAsync(folderId));
    }
  }, [dispatch, location]);

  const folderId = location.pathname.split("/").pop();
  const folder = folders.find(folder => folder.id === folderId);

  const filesInFolder = files.filter(file => file.id === folderId);
  return (
    <div className="p-4 w-[84.2vw] h-[80vh] bg-gray-200">
      { folder  ?  (
        <div>
          <div className="font-semibold text-[36px] text-navy-blue">{folder.name}</div>
          <div className="mt-6">
            <div className="flex border-black flex-wrap justify-start gap-4 items-center">
            {filesInFolder.map(file => (
                <div className="bg-white min-w-[10rem]   text-center  max-w-[10rem]  truncate px-4 py-3 rounded-[6px] " key={file.id}>{file.file_name}</div>
              ))}
            </div>
          </div>
        </div>
      ) : 
    ( <p>Loading...</p>
       )}
    </div>
  );
}
