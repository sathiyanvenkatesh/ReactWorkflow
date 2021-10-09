import React, { Component } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Footer />
      </div>
    );
  }
}
export default Layout;
