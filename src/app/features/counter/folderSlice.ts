import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { deleteFolderById, fetchFolderById } from "./folderAPI";
export interface Folder {
  id: string;
  name: any;
}
export interface File {
  id: any;
  file_name: any;
}

export interface FolderState {
  folders: Folder[];
  files: File[];
  status: "idle" | "loading" | "failed";
}

const initialState: FolderState = {
  folders: [],
  files: [],
  status: "idle",
};

export const fetchFolderByIdAsync = createAsyncThunk(
  "folder/fetchFolderById",
  async (folderId: string) => {
    const response = await fetchFolderById(folderId);
    return response.data;
  }
);

export const deleteFolderByIdAsync = createAsyncThunk(
  "folder/deleteFolderById",
  async (folderId: string) => {
    await deleteFolderById(folderId);
    return folderId;
  }
);

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
    removeFile: (state, action: PayloadAction<number>) => {
      state.files = state.files.filter(
        (file, index) => index !== action.payload
      );
    },
    editFile: (state, action: PayloadAction<any>) => {
      const { currentFileIndex, fileName } = action.payload;
      state.files = state.files.map((file, index) =>
        index === currentFileIndex ? { ...file, file_name: fileName } : file
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFolderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.folders.push(action.payload);
      })
      .addCase(fetchFolderByIdAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteFolderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFolderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.folders = state.folders.filter(
          (folder) => folder.id !== action.payload
        );
      })
      .addCase(deleteFolderByIdAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addFolder, addFile, removeFolder, removeFile, editFile } =
  folderSlice.actions;

export const selectFolders = (state: RootState) => state.folder.folders;
export const selectFiles = (state: RootState) => state.folder.files;

export default folderSlice.reducer;
