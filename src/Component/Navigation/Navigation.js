import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" exact className={s.navlink} activeClassName={s.active}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.navlink} activeClassName={s.active}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
