import React from "react";
import InputForm from "../components/InputForm";

const Add = () => {
  const empty = { word: "", description: "", example: "", url: "" };

  return (
    <div>
      <InputForm data={empty} />
    </div>
  );
};

export default Add;
