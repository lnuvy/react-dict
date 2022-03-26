import { Link } from "react-router-dom";

const NavItem = (props) => {
  const { name, address } = props;

  return (
    <Link to={`${address}`} className="menu_item">
      {name}
    </Link>
  );
};
export default NavItem;
