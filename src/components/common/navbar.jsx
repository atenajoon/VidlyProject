import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>

            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>

            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>

            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    // <nav classNameName="navbar navbar-light bg-light">
    //   <Link to="#" classNameName="navbar-brand">
    //     Vidly
    //   </Link>

    //   <NavLink to="/movies">Movies</NavLink>

    //   <NavLink to="/customers">Customers</NavLink>

    //   <NavLink to="/rentals">Rentals</NavLink>
    // </nav>
  );
};

export default NavBar;
