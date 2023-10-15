import React, { useState } from "react";
import "./navbar.css";
import { data } from "../data/navbar";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productshow, setProductShow] = useState();
  const toggleDropdown = (product, show) => {
    setIsDropdownOpen(show);
    setProductShow(product);
  };
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {data &&
          data.map((menu, index) => (
            <li
              key={index}
              className={`nav-item dropdown ${
                isDropdownOpen && productshow === menu.heading ? "open" : ""
              }`}
              onMouseEnter={() => toggleDropdown(menu.heading, true)}
              onMouseLeave={() => toggleDropdown("", false)}
            >
              <span className="dropdown-toggle">{menu.heading}</span>
              <ul className="dropdown-menu">
                <div
                  className="box"
                  style={{
                    width: `${
                      menu.items.length >= 4
                        ? 600
                        : menu.items.length === 3
                        ? 300
                        : menu.items.length === 2
                        ? 400
                        : 150
                    }px`,
                  }}
                >
                  {menu &&
                    menu.items.map((item, index) => {
                      return (
                        <div className="subbox" key={index}>
                          <p>
                            {" "}
                            <b>{item.sub_heading} </b>
                          </p>
                          {item &&
                            item.titles.map((list, key) => {
                              return (
                                <li className="dropdown-item" key={key}>
                                  {list}
                                </li>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </ul>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
