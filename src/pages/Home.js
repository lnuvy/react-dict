import React from "react";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";
import { CardWrap, FixBtn } from "../Styled";

const Home = ({ list }) => {
  const navigate = useNavigate();

  return (
    <CardWrap className="flex-row-start">
      {list.map((word) => {
        return <Item key={word.id} data={word} />;
      })}
      <FixBtn
        onClick={() => {
          navigate("/add");
        }}
      >
        {/* ➕ */}+
      </FixBtn>
    </CardWrap>
  );
};

export default Home;
