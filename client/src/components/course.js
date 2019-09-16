import React from "react";
import Grade from "../components/grade";
class Course extends React.Component {
  constructor(props) {
    super();

    let course = props.idCourse;
    console.log("const", course);
    this.state = {
      grades: [],
      course: course,
      globalCourses: [],
      approximation: "",
      gradeObjective: "",
      allCourses: []
    };
    this.addGrade = this.addGrade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.change = this.change.bind(this);

    this.asignarNotasCurso = this.asignarNotasCurso.bind(this);
    this.fetchGrades = this.fetchGrades.bind(this);
    this.fetchGlobalCourses = this.fetchGlobalCourses.bind(this);
    this.estadisticas = this.estadisticas.bind(this);
  }
  componentDidMount() {
    this.fetchGrades();
    this.fetchGlobalCourses();
  }
  asignarNotasCurso(data, pApproximation, pGrade, pNameCourse, pId) {
    this.setState({
      grades: data,
      approximation: pApproximation,
      gradeObjective: pGrade,
      nameCourse: pNameCourse,
      _id: pId
    });
  }
  estadisticas() {
    let notas = this.state.grades;
    let promedio = 0;
    let porcentajes = 0;
    notas.forEach(function(element) {
      porcentajes = porcentajes + parseInt(element["percentage"]);
      promedio =
        promedio +
        parseInt(element["percentage"]) * parseInt(element["currentGrade"]);
    });
    console.log(
      "Porcentajes: ",
      porcentajes,
      "Promedio",
      promedio / 100,
      "Maxima nota",
      (promedio + 5 * (100 - porcentajes)) / 100
    );
    var respuesta =
      "Porcentaje visto: " +
      porcentajes +
      "%\n" +
      "Promedio (definitiva): " +
      promedio / 100 +
      "\nMaxima nota posible: " +
      (promedio + 5 * (100 - porcentajes)) / 100;
    alert(respuesta);
  }
  fetchGrades() {
    let cursoElegido = this.state.course;
    let lista = [];
    let todosCursos = [];
    let email = localStorage.getItem("email");
    fetch(`http://localhost:5000/students/${email}`)
      .then(res => res.json())
      .then(data => {
        data = data["courses"];
        todosCursos = data;

        console.log("data-course", data);

        let approximation = "";
        let gradeObjective = "";
        let name = "";
        let _id = "";
        if (data != null) {
          data.forEach(function(element) {
            name = element["nameCourse"];
            approximation = element["approximation"];
            gradeObjective = element["gradeObjective"];
            console.log("nota-objetivo", gradeObjective);
            _id = element["_id"];

            if (name === cursoElegido) {
              lista = element["grades"];
              console.log("data-final", data);
            }
          });
          this.asignarNotasCurso(
            lista,
            approximation,
            gradeObjective,
            name,
            _id
          );
          this.setState({ allCourses: todosCursos });
        }
      });
  }

  fetchGlobalCourses() {
    let lista = [];
    fetch("http://localhost:5000/courses")
      .then(res => res.json())
      .then(data => {
        data.forEach(function(element) {
          let name = element["name"];
          lista.push(name);
        });
        this.setState({ globalCourses: lista });
      });
  }

  addGrade() {
    if (this.state._id) {
      let nombreCurso = this.state.course;
      let auxId = this.state._id;
      let nNota = this.state.nombreNota;
      let cActual = this.state.calificacionActual;
      let porcent = this.state.porcentaje;
      let lista = this.state.grades;
      let aux = this.state.allCourses;
      let j = 0;
      lista.forEach(function(element) {
        if (element._id === auxId) {
          let aux2 = {
            _id: auxId,
            nameGrade: nNota,
            currentGrade: cActual,
            percentage: porcent
          };
          element = aux2;
          lista[j] = element;
          console.log("cambiado", element);
          let i = 0;
          aux.forEach(function(element) {
            if (element["nameCourse"] === nombreCurso) {
              aux[i]["grades"] = lista;
            }
            i = i + 1;
          });
          j = j + 1;
        }

        fetch(
          `http://localhost:5000/students/${localStorage.getItem("email")}`,
          {
            method: "PATCH",
            body: JSON.stringify({ courses: aux }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        );
      });
      this.setState(
        {
          grades: lista,
          _id: "",
          nombreNota: "",
          calificacionActual: "",
          porcentaje: ""
        },
        () => {
          document.getElementById("nombreNota").value = this.state.nombreNota;
          document.getElementById(
            "calificacionActual"
          ).value = this.state.calificacionActual;
          document.getElementById("porcentaje").value = this.state.porcentaje;
        }
      );
    }

    //**Es una nota nueva */
    else {
      let arreglo = this.state.grades;
      let nNota = this.state.nombreNota;
      let cActual = this.state.calificacionActual;
      let porcent = this.state.porcentaje;
      let auxId = arreglo.length + 1;
      let aux = this.state.allCourses;
      let aux3 = this.state.nameCourseAux;
      let aux4 = this.state.course;

      document.getElementById("nombreNota").value = "";
      document.getElementById("calificacionActual").value = "";
      document.getElementById("porcentaje").value = "";
      arreglo.push({
        nameGrade: nNota,
        currentGrade: cActual,
        percentage: porcent,
        _id: auxId
      });
      this.setState(
        {
          grades: arreglo,
          nombreNota: "",
          calificacionActual: "",
          porcentaje: ""
        },
        () => {
          document.getElementById("nombreNota").value = this.state.nombreNota;
          document.getElementById(
            "calificacionActual"
          ).value = this.state.calificacionActual;
          document.getElementById("porcentaje").value = this.state.porcentaje;

          console.log(this.state.grades);
          let email = localStorage.getItem("email");
          let gradeObjective = this.state.gradeObjective;
          console.log("grade objetive", gradeObjective);
          if (this.state.course === "nuevo") {
            console.log("NUEVOOOOO");
            aux.push({
              nameCourse: aux3,
              grades: arreglo,
              gradeObjective: gradeObjective,
              approximation: "APO"
            });
            console.log(aux);
            fetch(`http://localhost:5000/students/${email}`, {
              method: "PATCH",
              body: JSON.stringify({ courses: aux }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            });
            this.setState({ course: aux3 });
          } else {
            aux.forEach(function(element) {
              if (element["nameCourse"] === aux4) {
                element["grades"] = arreglo;
                element["nameCourse"] = aux3;
              }
              fetch(`http://localhost:5000/students/${email}`, {
                method: "PATCH",
                body: JSON.stringify({ courses: aux }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
                .then(res => res.json())
                .then(data => {})
                .catch(err => console.error(err));
            });
          }
        }
      );
    }
  }

  editCourse(id) {
    console.log("EDITAR", id);
    let arreglo = this.state.grades;
    let vv = false;
    let aux;
    arreglo.forEach(function(element) {
      if (element._id === id) {
        console.log("encontrado", id);
        vv = true;
        aux = element;
      }
    });
    if (vv) {
      this.change(id, aux);
    }
  }
  change(id, pElement) {
    console.log("metodo change", id, pElement);
    let nNota = pElement.nameGrade;
    let cActual = pElement.currentGrade;
    let porcent = pElement.percentage;
    this.setState(
      {
        _id: id,
        nombreNota: nNota,
        calificacionActual: cActual,
        porcentaje: porcent
      },
      () => {
        document.getElementById("nombreNota").value = this.state.nombreNota;
        document.getElementById(
          "calificacionActual"
        ).value = this.state.calificacionActual;
        document.getElementById("porcentaje").value = this.state.porcentaje;
      }
    );
    console.log("Fin metodo change:", this.state);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(name, value);
  }
  render() {
    const { grades } = this.state;
    const { globalCourses } = this.state;
    const { course } = this.state;
    return (
      <div className="course" id="course">
        <br></br>
        <div className="fila_uno">
          <div className="col-md-5">
            <label htmlFor="inputState">
              <h3>Nombre del Curso</h3>
            </label>
            <select
              id="inputState"
              className="form-control option-name-course "
              name="nameCourseAux"
              onChange={this.handleChange}
            >
              <option value={course}></option>
              {globalCourses.map(course => (
                <option>{course}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary boton_agregar"
            onClick={this.addGrade}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.estadisticas}
          >
            Estadisticas
          </button>
        </div>
        <br></br>
        <div className="form-row">
          <div className="col-md-3 borde">
            <label htmlFor="objectiveGrade">
              <h3>Nota Objetivo</h3>
            </label>
            <input
              type="text"
              className="form-control input-course"
              value={this.state.gradeObjective}
              onChange={this.handleChange}
              name="gradeObjective"
            />
          </div>
          <label htmlFor="test1" className="checkbox special">
            <input
              type="checkbox"
              id="test1"
              name="aproximacion"
              value="1"
              onChange={this.handleChange}
            />
            <span>Aproximación</span>
          </label>
        </div>
        <div className="form-row">
          <div className="col-md-3 borde">
            <label htmlFor="nombreNota">
              <h3>Nombre Nota</h3>
            </label>
            <input
              type="text"
              className="form-control input-course"
              id="nombreNota"
              onChange={this.handleChange}
              name="nombreNota"
            />
          </div>
          <div className="col-md-3 borde">
            <label htmlFor="calificacionActual">
              <h3>Calificación Actual</h3>
            </label>
            <input
              className="form-control input-course"
              type="number"
              id="calificacionActual"
              onChange={this.handleChange}
              name="calificacionActual"
            />
          </div>
          <div className="col-md-3 borde">
            <label htmlFor="porcentaje">
              <h3>Porcentaje</h3>
            </label>
            <input
              className="form-control input-course"
              name="porcentaje"
              id="porcentaje"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          {grades.map(grade => (
            <div>
              {" "}
              <Grade
                id={grade._id}
                nameGrade={grade.nameGrade}
                currentGrade={grade.currentGrade}
                percentage={grade.percentage}
              ></Grade>{" "}
              <button
                onClick={() => this.editCourse(grade._id)}
                className="btn btn-primary"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Course;
