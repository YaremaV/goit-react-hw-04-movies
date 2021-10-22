import { NavLink } from "react-router-dom";
import s from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <NavLink exact className={s.navlink} activeClassName={s.active} to="/">
        Main
      </NavLink>
      <NavLink className={s.navlink} activeClassName={s.active} to="/about">
        About
      </NavLink>
      <NavLink className={s.navlink} activeClassName={s.active} to="/info">
        Information
      </NavLink>
    </nav>
  );
};

export default Navigation;
