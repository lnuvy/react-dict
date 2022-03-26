import React from "react";
import NavItem from "./NavItem";
import "./styles/Navigation.css";

const Navigation = () => {
  const menu = [
    { name: "Home", address: "/" },
    { name: "menu-1", address: "/menu1" },
    { name: "menu-2", address: "/menu2" },
  ];

  return (
    <nav className="navigation_wrap">
      <div>
        <h1 className="">단어장</h1>
      </div>
    </nav>
  );
};
export default Navigation;
