import React from "react";
import CourseList from "../components/courseList";

class Principal extends React.Component {
  render() {
    return (
      <div className="principal">
        <CourseList></CourseList>
      </div>
    );
  }
}
export default Principal;
