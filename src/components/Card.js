import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Card.css";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const { id, word, description, example } = data;

  return (
    <div
      className="Card_wrap"
      onClick={() => {
        navigate(`/Edit/${id}`);
      }}
    >
      <h3>{word}</h3>
      <p>{description}</p>
      <p>{example}</p>
    </div>
  );
};
export default Card;
