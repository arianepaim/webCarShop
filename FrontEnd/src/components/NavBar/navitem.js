import React from "react";
import { Link as ScrollLink } from "react-scroll";

const NavItem = ({ text, to, active, onClick, offset,component, href }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <ScrollLink
      to={to}
      duration={500}
      offset={offset}
      className={`nav__item ${active ? "active" : ""}`}
      onClick={handleClick}
      component={component}
      href={href}
    >
      {text}
    </ScrollLink>
  );
};

export default NavItem;

