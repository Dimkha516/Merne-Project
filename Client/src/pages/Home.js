import React, { useContext } from "react";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log";
import Trends from "../components/Trends";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div>
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        <Thread />
      </div>
      <div className="right-nav">
        <Trends />
      </div>
    </div>
  );
};

export default Home;
