import Folder from "./Folder";

const FolderCollection = ({
  folders = [],
  setSelected = () => {},
  selectedItem = {},
}) => {
  return (
    <div>
      {folders.map((item) => (
        <Folder
          key={item._id}
          selectedItem={selectedItem}
          setSelected={setSelected}
          level={1}
          info={item}
        />
      ))}
    </div>
  );
};

export default FolderCollection;
