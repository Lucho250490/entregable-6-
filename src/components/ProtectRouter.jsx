import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";

const ProtectRouter = () => {
  const nameTrainer = useSelector((store) => store.nameTrainer);

  console.log(nameTrainer);

  if (nameTrainer) {
    return (
      <>
        <Navbar />
        <Outlet />;
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectRouter;
