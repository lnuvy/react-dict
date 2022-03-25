import React, { useState } from "react";
import NavItem from "./NavItem";
import "./styles/Navigation.css";

function Navigation(): JSX.Element {
  const [toggle, setToggle] = useState<Boolean>(false);
  const menu = [
    { name: "Home", address: "/" },
    { name: "menu-1", address: "/menu1" },
    { name: "menu-2", address: "/menu2" },
  ];

  return (
    <nav className="navigation_wrap">
      <div
        className={!toggle ? "burger_menu" : "x_menu"}
        onClick={() => (toggle ? setToggle(false) : setToggle(true))}
      >
        <div className="burger_line1"></div>
        <div className="burger_line2"></div>
        <div className="burger_line3"></div>
      </div>

      <div
        className={[
          "menu_box",
          !toggle ? "menu_box_hidden" : "menu_box_visible",
        ].join(" ")}
      >
        <div className="menu_list">
          {menu.map((data) => {
            return (
              <NavItem
                data={data}
                key={data.address}
                offNav={() => setToggle(false)}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
