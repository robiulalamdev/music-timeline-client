import React from "react";

import Timeline from "../Timeline/Timeline";
import Stepper from "../Stepper/Stepper";
import Login from "../Login/Login/Login";
import Payment from "./Payment/Payment";

const Home = () => {
  return (
    <>
      <Login />
      <Payment />
      {/* <Stepper/> */}
    </>
  );
};

export default Home;
