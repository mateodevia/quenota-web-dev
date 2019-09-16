import React from "react";
import "./App.css";
import Header from "./components/header";
import Principal from "./components/principal";

class App extends React.Component {
  render() {
    if (localStorage.getItem("loggeado") != null) {
      return (
        <div className="App">
          <Header log="true"></Header>
          <br></br>
          <Principal></Principal>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header></Header>
          <br></br>
          <br></br>
          <br></br>
          <div className="centrado">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/proyectodiana-b940e.appspot.com/o/a-.png?alt=media&token=0e907819-25db-490c-922e-76c410412be6"
              alt="aaa"
            ></img>
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>
          <br></br>
        </div>
      );
    }
  }
}

export default App;
