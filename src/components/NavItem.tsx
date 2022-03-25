import React from "react";
import { Link } from "react-router-dom";

interface NavProps {
  data: {
    name: string;
    address: string;
  };
  offNav: Function;
}

function NavItem({ data, offNav }: NavProps): JSX.Element {
  const { name, address } = data;

  return (
    <Link to={`${address}`} className="menu_item" onClick={() => offNav()}>
      {name}
    </Link>
  );
}

export default NavItem;
