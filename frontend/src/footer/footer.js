import React from "react";
import { footer_data } from "../data/footer";
import './footer.css'
const Footer = () => {
  return (
    <div className="container footer">
    <div className="footer_row">
      {footer_data &&
        footer_data.map((item,index) => (
          <div className="col-lg-2 col-xs-2 footer_col" key={index} >
            <div className="footer_heading">
            <h2>{item.heading} </h2>
            <hr className="div_hr_line"></hr>
            </div>
              {item.items.map((list,key) => (
                <li className="footer_list" key={key}>{list}</li>
              ))}
          </div>
        ))}
        </div>
    </div>
  );
};
export default Footer;
