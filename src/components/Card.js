import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { heardWord } from "../redux/modules/word";
import "./styles/Card.css";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, word, description, example, heard } = data;
  const [knew, setKnew] = useState(heard);

  const handleToggle = () => {
    setKnew(!knew);
    dispatch(heardWord(id));
  };

  return (
    <div className="Card_wrap">
      <h3
        onClick={() => {
          navigate(`/Edit/${id}`);
        }}
      >
        {word}
      </h3>
      <p>{description}</p>
      <p>{example}</p>
      <button onClick={handleToggle}>체크</button>
    </div>
  );
};
export default Card;
