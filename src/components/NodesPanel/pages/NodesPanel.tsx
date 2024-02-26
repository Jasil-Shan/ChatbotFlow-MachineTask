import MessageNode from "../MessageNode/MessageNode";

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col gap-5">
      <MessageNode />
    </div>
  );
};

export default NodesPanel;
