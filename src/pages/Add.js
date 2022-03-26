import React from "react";
import InputForm from "../components/InputForm";

const Add = () => {
  const empty = { word: "", description: "", example: "", url: "" };

  return <InputForm data={empty} />;
};

export default Add;
