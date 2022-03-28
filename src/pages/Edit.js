import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InputForm from "../components/InputForm";

const Edit = (props) => {
  const { id } = useParams();
  const data = useSelector((state) => state.word.list).filter(
    (l) => l.id === id
  )[0];

  return <InputForm data={data} />;
};

export default Edit;
