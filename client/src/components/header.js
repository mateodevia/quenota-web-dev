import React from "react";
import "../App.css";

class header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
    this.capturaLogin = this.capturaLogin.bind(this);
    this.capturaRegister = this.capturaRegister.bind(this);
  }
  capturaLogin(e) {
    e.preventDefault();
    let user = document.getElementsByName("user")[0].value;
    let pass = document.getElementsByName("pass")[0].value;

    //console.log(user, pass);
    /* //console.log("Loggin Exitoso")
        localStorage.setItem("loggeado",true)
        localStorage.setItem("user",user)
        //console.log(localStorage.getItem("loggeado"))
        */
    fetch(`https://quenota-web-dev.herokuapp.com:5000/students/${user}`)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if (data["password"] === pass) {
          //console.log("Loggin Exitoso");
          localStorage.setItem("loggeado", true);
          localStorage.setItem("email", user);
          //console.log(localStorage.getItem("loggeado"));
          this.refresh();
        }
      });
  }
  logout(e) {
    localStorage.clear();
    this.refresh();
  }
  refresh() {
    window.location.reload(true);
  }
  capturaRegister(e) {
    e.preventDefault();
    let user = document.getElementsByName("userRegister")[0].value;
    let name = document.getElementsByName("nameRegister")[0].value;
    let pass = document.getElementsByName("passRegister")[0].value;
    //console.log(user, name, pass);
    fetch(
      "https://quenota-web-dev.herokuapp.com:5000/students",
      {
        method: "POST",
        body: JSON.stringify({ mail: user, password: pass, name: name }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      this.refresh()
    );
  }
  render() {
    if (localStorage.getItem("loggeado") == null) {
      return (
        <div>
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
            role="navigation"
          >
            <div className="container">
              <a className="navbar-brand tittle" href="/">
                QUE NOTA!
              </a>
              <button
                className="navbar-toggler border-0"
                type="button"
                data-toggle="collapse"
                data-target="#exCollapsingNavbar"
              >
                &#9776;
              </button>
              <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                  <li className="dropdown order-1">
                    <button
                      type="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      className="btn btn-outline-light dropdown-toggle"
                    >
                      Registarse<span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right mt-6">
                      <li className="px-2 py-2">
                        <form className="modificado2">
                          <div className="form-group">
                            <label htmlFor="userInput" className="label-login">
                              Usuario
                            </label>
                            <input
                              id="userInput"
                              className="form-control form-control-sm input-login"
                              type="text"
                              required=""
                              name="userRegister"
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="passwordInput"
                              className="label-login"
                            >
                              Nombre
                            </label>
                            <input
                              id="nameInput"
                              className="form-control form-control-sm input-login"
                              type="text"
                              name="nameRegister"
                              required=""
                            />
                          </div>

                          <div className="form-group">
                            <label
                              htmlFor="passwordInput"
                              className="label-login"
                            >
                              Contraseña
                            </label>
                            <input
                              id="passwordInput"
                              className="form-control form-control-sm input-login"
                              type="password"
                              name="passRegister"
                              required=""
                            />
                          </div>

                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              onClick={this.capturaRegister}
                            >
                              Registrar
                            </button>
                          </div>
                        </form>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown order-1">
                    <button
                      type="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      className="btn btn-outline-light dropdown-toggle"
                    >
                      Ingresar <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right mt-6">
                      <li className="px-2 py-2">
                        <form className="modificado">
                          <div className="form-group">
                            <label htmlFor="userInput" className="label-login">
                              Usuario
                            </label>
                            <input
                              id="userInput"
                              className="form-control form-control-sm input-login"
                              type="text"
                              required=""
                              name="user"
                            />
                          </div>

                          <div className="form-group">
                            <label
                              htmlFor="passwordInput"
                              className="label-login"
                            >
                              Contraseña
                            </label>
                            <input
                              id="passwordInput"
                              className="form-control form-control-sm input-login"
                              type="password"
                              name="pass"
                              required=""
                            />
                          </div>

                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              href="/"
                              onClick={this.capturaLogin}
                            >
                              Entrar
                            </button>
                          </div>
                        </form>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
            role="navigation"
          >
            <div className="container">
              <a className="navbar-brand tittle" href="/">
                QUE NOTA!
              </a>
              <button
                className="navbar-toggler border-0"
                type="button"
                data-toggle="collapse"
                data-target="#exCollapsingNavbar"
              >
                &#9776;
              </button>
              <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                  <li className="dropdown order-1">
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        href="/"
                        onClick={this.logout}
                      >
                        Salir
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <br></br>
        </div>
      );
    }
  }
}
export default header;
