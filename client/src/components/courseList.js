import React from 'react'
import Course from './course';

class  CourseList extends React.Component {

  constructor(props){
    super(props)
    let email = localStorage.getItem("email")
    this.state ={
      courses:[],idCurrentCourse:'',email:email

    };

    this.fetchTasks = this.fetchTasks.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.enviarURL = this.enviarURL.bind(this);

  }
  componentDidMount() {
    this.fetchTasks();

  }
  actualizar(listaCursos){
    console.log("actualizar")
    this.setState({courses:listaCursos},()=>{
      console.log("ACTUALIZADO", this.state)
    })
  }
  enviarURL(id){

    if(this.state.idCurrentCourse)
    {
      this.setState({idCurrentCourse:''},()=>{
        this.setState({idCurrentCourse:id})
      })
    }
    else{
      this.setState({idCurrentCourse:id})
    }

  }
  fetchTasks() {
    let listaCursos =[]
    let email = this.state.email
    console.log(email)
    fetch(`https://quenota-web-dev.herokuapp.com/:5000/students/${email}`)
      .then(res => res.json())
      .then(data => {

        data=data['courses']
        if(data!=null)
        {
        data.forEach(function(element){
          console.log("ciclo", element)
          listaCursos.push(element['nameCourse'])
        })
        data= data[0]
        data=data['nameCourse']
        console.log("Nombre curso",listaCursos);
        this.actualizar(listaCursos)


      }});
    }


  render()
  {
    if(this.state.idCurrentCourse){
      let aux = this.state.idCurrentCourse

      return(
      <div className="principal">
      <div className="course-list">
      <br></br>
      <h1>Mis Cursos</h1>
      <ul>
      {this.state.courses.map(course => <h4 key={course} id={course} onClick={()=>this.enviarURL(course)}>{course}</h4 >)}
      </ul>
      <hr></hr>
      <button id="nuevo"className="btn btn-light nuevoCurso" onClick={()=>this.enviarURL("nuevo")}>Nuevo</button>

    </div>
    <Course idCourse={aux}></Course>

    </div>

      )


    }
    else{
    return (

    <div>
    <div className="course-list">
      <br></br>
      <h1>Mis Cursos</h1>
      <ul>
      {this.state.courses.map(course => <h4 key={course} id={course} onClick={()=>this.enviarURL(course)}>{course}</h4 >)}

      </ul>
      <hr></hr>
      <button className="btn btn-light nuevoCurso" onClick={()=>this.enviarURL("nuevo")}>Nuevo</button>

    </div>

    </div>

  );}}

}

export default CourseList;

