import Flow from "../../components/Flow/Flow";
import Navbar from "../../components/NavBar/Navbar";

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="h-screen w-full">
      <Flow />
    </div>
    </>
  );
};

export default Home;
