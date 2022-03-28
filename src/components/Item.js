import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDataFB, editToggleFB } from "../redux/modules/word";
import { BsCheckLg, BsFillTrashFill } from "react-icons/bs";
import "./styles/Card.css";
import styled from "styled-components";

const Item = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, word, description, example, heard } = data;
  const [knew, setKnew] = useState(heard);

  const handleToggle = () => {
    setKnew(!knew);
    dispatch(editToggleFB(id, !knew));
  };

  const handleRemove = () => {
    dispatch(deleteDataFB(id));
    navigate("/");
  };

  return (
    <Card className="Card_wrap" knew={knew}>
      <h3
        onClick={() => {
          navigate(`/Edit/${id}`);
        }}
      >
        {word}
      </h3>
      <p>{description}</p>
      <p>{example}</p>
      <BsCheckLg
        className="bsCheckLg hoverEvent"
        size={25}
        onClick={handleToggle}
      ></BsCheckLg>
      <BsFillTrashFill
        className="hoverEvent"
        size={25}
        onClick={handleRemove}
      />
    </Card>
  );
};

const Card = styled.div`
  background: ${(props) => (props.knew ? "tomato" : "gray")};
`;

export default Item;
