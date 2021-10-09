import React, { Component } from "react";

class Footer extends Component {
  render() {
    const footerdivStyle = {
      width: "100%",
      padding:"2px",
      backgroundColor: "#212529"
    };
    return (
      <div
        className="fixed-bottom d-flex flex-column flex-md-row justify-content-center align-items-center text-center"
        style={footerdivStyle}
      >
        <span className="text-light">
          Copyright @  . All rights reserverd.
        </span>
      </div>
    );
  }
}
export default Footer;
