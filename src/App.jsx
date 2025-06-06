import { useEffect, useState } from "react";
import "./App.css";
import FolderControls from "./components/FolderControls";
import {
  createFolder,
  deleteFolder,
  getFolders,
  initializeRoot,
} from "./services/folderService";
import FolderCollection from "./components/FolderCollection";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [folders, setFolders] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    let res;
    setLoading(true);
    if (!selectedItem) {
      res = await initializeRoot(payload);
    } else {
      res = await createFolder(payload);
    }
    setLoading(false);
    if (res) {
      setFolders(res);
      setSelectedItem(null);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await deleteFolder(id);
    setLoading(false);
    if (res) {
      setFolders(res);
      setSelectedItem(null);
    }
  };

  const fetchFolders = async () => {
    setInitialLoading(true);
    const res = await getFolders();
    setInitialLoading(false);
    if (res) {
      setFolders(res);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <>
      {initialLoading ? (
        <>loading...</>
      ) : (
        <div
          onClick={() => setSelectedItem(null)}
          className="container"
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          <FolderControls
            onCreate={handleCreate}
            onDelete={handleDelete}
            selectedItem={selectedItem}
          />
          {loading && (
            <>
              saving details in database...
              <br />
              <br />
            </>
          )}
          <FolderCollection
            selectedItem={selectedItem}
            setSelected={setSelectedItem}
            folders={folders}
          />
        </div>
      )}
    </>
  );
}

export default App;
