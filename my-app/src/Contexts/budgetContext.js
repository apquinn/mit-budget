import React, { createContext, useContext, useState } from "react";

export const ShowContext = createContext();

export const ShowProvider = ({ children, data, setData }) => {
  const showContext = {
    data,
    setData,
  };

  return (
    <ShowContext.Provider value={showContext}>{children}</ShowContext.Provider>
  );
};
