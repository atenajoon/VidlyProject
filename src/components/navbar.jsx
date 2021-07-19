const NavBar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <span className="badge badge-pill badge-secondary sm m-2">
        {props.totalNumbers}
      </span>
    </nav>
  );
};

export default NavBar;
