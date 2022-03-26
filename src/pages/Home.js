import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "./styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const list = useSelector((state) => state.word.list);

  return (
    <>
      <div className="contents_wrap">
        {list.map((word, i) => {
          return <Card key={word.id} data={word} />;
        })}
      </div>
      <div
        className="fixed_add_button"
        onClick={() => {
          navigate("/add");
        }}
      >
        <h4>+</h4>
      </div>
    </>
  );
};

export default Home;
