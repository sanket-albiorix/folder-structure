import { useRef, useState, useEffect } from "react";

const FolderControls = ({
  onCreate = () => {},
  selectedItem,
  onDelete = () => {},
}) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  const [itemType, setItemType] = useState("");
  const inputRef = useRef(null);
  const handleClick = (type) => {
    setItemType(type);
    setShowInput(true);
  };

  const handleCancel = () => {
    setShowInput(false);
  };

  const handleSave = async () => {
    let payload = {};
    if (!selectedItem?._id) {
      payload = { value };
    } else {
      payload = {
        value,
        type: itemType,
        parent: selectedItem._id,
      };
    }
    await onCreate(payload);
    reset();
  };

  const reset = () => {
    setShowInput(false);
    setItemType("");
    setValue("");
  };

  const handleDelete = () => {
    onDelete(selectedItem._id);
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    setShowInput(false);
    setValue("");
  }, [selectedItem]);

  return (
    <div onClick={(e)=>e.stopPropagation()}>
      <button
        disabled={!(selectedItem?._id && selectedItem?.type !== "file")}
        onClick={(e) => handleClick("file")}
      >
        {" "}
        <i class="fa-solid fa-file-circle-plus"></i>
      </button>
      <button
        disabled={selectedItem?.type === "file"}
        onClick={(e) => handleClick("folder")}
      >
        <i class="fa-solid fa-folder-plus"></i>
      </button>
      <button disabled={!selectedItem?.type} onClick={handleDelete}>
        <i class="fa-solid fa-trash"></i>
      </button>
      <br />
      <br />
      {showInput && (
        <>
          <input
            ref={inputRef}
            type="text"
            name=""
            id=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSave}>Save {itemType}</button>
          <button onClick={handleCancel}>Cancel</button>
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default FolderControls;
