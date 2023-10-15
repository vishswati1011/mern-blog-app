import React from "react";
import './popup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const MyModal = () => {
  return (
    <div class="dropdown help_popup">
      <p
        class="dropdown-toggle"
        // type="button"
        data-toggle="dropdown"
      >
        Help
        {/* <span class="caret"></span> */}
      </p>
      <ul class="dropdown-menu popup-size">
        <div className="wrapper-box">
          <div className="wrapper_1">
            <p>Contact Us</p>
            <li> <FontAwesomeIcon icon="fa-ragular fa-comments" />&nbsp;&nbsp;&nbsp;Chat with us</li>
            <li> <FontAwesomeIcon icon="fa-ragular fa-envelope" />&nbsp;&nbsp;&nbsp;Email</li>
            <li> <FontAwesomeIcon icon="fa-ragular fa-comment-dots"/>&nbsp;&nbsp;&nbsp;Ask Our Expert</li> 
          </div>
          {/* <div className="vertical_line"></div> */}
          <div className="wrapper_2">
          <p>Helpful Links</p>
            <li>Track your order</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
          </div>          
        </div>
        <div className="help_bottom_div">
          <div className="inside_help_bottom_div">
        <li>For Support & Order Enquiries</li>
        <li className="contact_details">Call us at: +91 9655928004</li>
        <li className="contact_details">Mon to Sat - 10:00 AM to 6:00 PM</li>
        </div>
        </div>
      </ul>
    </div>
  );
};

export default MyModal;
