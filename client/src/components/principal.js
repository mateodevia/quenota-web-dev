import React from 'react';
import CourseList from '../components/courseList';
import Course from '../components/course';
import { BrowserRouter as Router,Route} from 'react-router-dom';
class Principal extends React.Component{

constructor(props){
    super(props)
}

render(){
    return(

        <div className="principal">
        <CourseList></CourseList>
        </div>
   )
}
}
export default Principal