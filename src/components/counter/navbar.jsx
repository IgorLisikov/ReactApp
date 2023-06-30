import React from "react";

// Stateless Functional Component
// is functional components 'props' must be passed as argument; and 'props' is used without 'this.'
// const Navbar = (props) => {
const Navbar = ({ totalCounters }) => {
  // { totalCounters } - with destructuring arguments, arguments are used without 'props.'
  console.log("Navbar - Rendered");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default Navbar;
