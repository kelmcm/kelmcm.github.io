import { NavLink, Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <h1 className="site-title">
      <Link to="/">Kelly McManus</Link>
    </h1>
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blogs">Blog</NavLink>
      <NavLink to="/cv">CV</NavLink>
    </nav>
  </header>
);

export default Header;
