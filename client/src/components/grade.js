import React from 'react'
const Grade = (props)=> {
  const {nameGrade,currentGrade,percentage} = props;
  return (
    <div>
      <br></br>
      <div className="form-row">
        <div class="col-md-3 borde">
          <input type="text" class="form-control input-course" id="nombreNota" name="nombreNota" value={nameGrade} readOnly/>
        </div>
        <div className="col-md-3 borde">
          <input type="text" class="form-control input-course" id="calificacionActual" name="calificacionActual" value={currentGrade} readOnly/>
        </div>
        <div className="col-md-3 borde">
          <input type="text" class="form-control input-course" id="porcentaje" name="porcentaje" value={percentage} readOnly/>
        </div>
        
      </div>

    </div>
  );
}

export default Grade;
