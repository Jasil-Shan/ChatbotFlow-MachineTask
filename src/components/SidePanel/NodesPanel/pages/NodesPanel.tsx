import MessageNode from "../MessageNode/MessageNode";

const NodesPanel = () => {
  return (
    // grid columns will make this extensible
    <div className="grid grid-cols-2 gap-5"> 
      <MessageNode />
    </div>
  );
};

export default NodesPanel;
