import React from "react";

interface CardProps {
  data: {
    id: string;
    word: string;
    description: string;
    example: string;
  };
}

const Card = ({ data }: CardProps) => {
  const { id, word, description, example } = data;

  return (
    <div>
      <h3>{word}</h3>
      <p>{description}</p>
      <p>{example}</p>
    </div>
  );
};
export default Card;
