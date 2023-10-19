import React from "react";

const NavigationBar = () => {
  return (
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a href="HomePage" class="navbar-brand">Navbar</a>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavigationBar;
