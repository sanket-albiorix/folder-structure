const Folder = ({
  info,
  level,
  setSelected,
  selectedItem,
  isParentSelected = false,
}) => {
  const { children, value, _id } = info;
  const isSelected = selectedItem?._id === _id;

  const getSeperator = (level) => {
    let seperator = "";
    while (level > 0) {
      seperator += "-";
      let sublevel = level;
      while (sublevel > 1) {
        seperator += "--";
        sublevel--;
      }
      level--;
    }
    return (
      <span
        style={{
          color: isSelected ? "green" : isParentSelected ? "gray  " : "black",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(info);
        }}
      >
        {"|" + seperator + value}
      </span>
    );
  };

  return (
    <div>
      {getSeperator(level)}
      {children?.length > 0 && (
        <>
          {children.map((item) => (
            <Folder
              key={item._id}
              isParentSelected={isSelected || isParentSelected}
              selectedItem={selectedItem}
              setSelected={setSelected}
              level={level + 1}
              info={item}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Folder;
