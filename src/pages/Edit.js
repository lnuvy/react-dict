import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InputForm from "../components/InputForm";
import NotFound from "./NotFound";

const Edit = () => {
  const params = useParams();
  const { id } = params;
  const data = useSelector((state) => state.word.list).filter(
    (l) => l.id === id
  )[0];
  console.log(data);

  return data ? <InputForm data={data} /> : <NotFound />;
};

export default Edit;
