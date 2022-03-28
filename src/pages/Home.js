import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";
import "./styles/Home.css";

const Home = ({ list }) => {
  const navigate = useNavigate();

  return (
    <div className="contents_wrap">
      {list.map((word) => {
        return <Item key={word.id} data={word} />;
      })}
      <div
        className="fixed_add_button"
        onClick={() => {
          navigate("/add");
        }}
      >
        <h4>+</h4>
      </div>
    </div>
  );
};

export default Home;
