import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Navigation = () => {
  const location = useLocation().pathname;
  const paths = ["/gods", "/abodes", "/emblems", "/new"];
  return (
    <nav className="nav-links">
      {paths.map((path) => (
        <Link key={path} to={path} className={path == location ? "current-page" : ""}>
          {path.slice(1)}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
