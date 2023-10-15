import React, { useState } from "react";
import "./megamenu.css";
import { data } from "../data/navbar";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productshow, setProductShow] = useState();
  const toggleDropdown = (product, show) => {
    setIsDropdownOpen(show);
    setProductShow(product);
  };
  return (
    <div className="top-mega-menu">
    <nav className="topnav">
      <ul class="menu">
        {data &&
          data.map((menu, index) => (
            <li key={index}>
             {productshow===menu.heading?
              <a href="#" className="menu-active">{menu.heading}</a>
              :<a href="#">{menu.heading}</a>
              }
              {menu &&
                menu.items.map((item, index) => (
                  <div
                    key={index}
                    className={
                      menu.items.length >= 3
                        ? `mega-menu mega-position-big`
                        : `mega-menu mega-position`
                    }
                    onMouseEnter={() => toggleDropdown(menu.heading, true)}
                    onMouseLeave={() => toggleDropdown("", false)}
                  >
                    <div
                      className="box"
                      style={{
                        width: `${
                          menu.items.length >= 4
                            ? 900
                            : menu.items.length === 3
                            ? 900
                            : menu.items.length === 2
                            ? 500
                            : 250
                        }px`,
                      }}
                    >
                      {menu &&
                        menu.items.map((item, index) => {
                          return (
                            <div className="mega-sub-box" key={index}>
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
                  </div>
                ))}
            </li>
          ))}
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
