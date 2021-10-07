import React, { Component } from "react";
import Footer from "./Footer";
import Navebar from "./Navebar";

class Layout extends Component {
  render() {
    return (
      <div>
        <Navebar />
        <Footer />
      </div>
    );
  }
}
export default Layout;
