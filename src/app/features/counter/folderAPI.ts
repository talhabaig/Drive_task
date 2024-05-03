import { Folder } from "./folderSlice";
export function fetchFolderById(folderId: string) {
    const folderData = {
      id: folderId,
      name: `Folder name will appear here`,
    };
    
    return new Promise<{ data: Folder }>((resolve) =>
      setTimeout(() => resolve({ data: folderData }), 500)
    );
  }
  export function deleteFolderById(folderId: string) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        console.log(`Folder ${folderId} deleted`);
        resolve();
      }, 500)
    );
}
