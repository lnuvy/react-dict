import React, { useState } from "react";
import { BsFillFilterSquareFill } from "react-icons/bs";
import "./Filter.css";

const Filter = () => {
  const [filter, setFilter] = useState("보기");

  const handleFilter = (e) => {
    const target = e.target.id;
    setFilter(e.target.text);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn">
        <BsFillFilterSquareFill size={20} />
        {filter}
      </button>
      <div className="dropdown-content">
        <a id="checked" onClick={handleFilter}>
          체크된 항목만 보기
        </a>
        <a id="unchecked" onClick={handleFilter}>
          체크안된 항목만 보기
        </a>
      </div>
    </div>
  );
};
export default Filter;
