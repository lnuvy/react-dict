import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDataFB, editToggleFB } from "../redux/modules/word";
import { BsCheckLg, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Card } from "../Styled";

const Item = forwardRef(({ data }, ref) => {
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
    <Card className="flex-column-ss" knew={knew} ref={ref}>
      <h3>{word}</h3>
      <div className="description_wrap flex-column-center">
        <p>
          {description.length < 100
            ? description
            : description.slice(0, 98) + "..."}
        </p>
      </div>
      <p>활용 예)</p>
      <div className="exam_wrap flex-column-center">
        <p>{example.length < 100 ? example : example.slice(0, 98) + "..."}</p>
      </div>

      <BsCheckLg
        className="BsCheckLg hoverEvent"
        size={25}
        onClick={handleToggle}
      />

      <BsPencilSquare
        className="BsPencilSquare hoverEvent"
        size={25}
        onClick={() => {
          navigate(`/Edit/${id}`);
        }}
      />
      <BsFillTrashFill
        className="BsFillTrashFill hoverEvent"
        size={25}
        onClick={handleRemove}
      />
    </Card>
  );
});

export default Item;
