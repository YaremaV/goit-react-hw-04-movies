import { NavLink } from 'react-router-dom';
import s from './navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={s.navigation}>
      <NavLink to="/" exact className={s.navLink} activeClassName={s.active}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.navLink} activeClassName={s.active}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
