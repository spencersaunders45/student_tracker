import React, { useState } from 'react';
import plusSign from '../plus_sign.png'
import minusSign from '../minus_sign.png';

import Tags from './tags.jsx';

export default (props) => {

  const studentInfo = props.studentInfo;
  const [showGrades, setShowGrades] = useState(false);
  const [tag, setTag] = useState('');
  const updateTags = props.updateTags;
  const nameSearchResults = props.nameSearchResults;
  const tagSearchResults = props.tagSearchResults;




  const toggleDisplayGrades = () => {
    setShowGrades(!showGrades);
  }



  const addTag = (e) => {
    e.preventDefault();
    setTag(''); // Clears the text in the input
    updateTags(tag, studentInfo.id-1);
  }



  return(

    <div>
      {nameSearchResults === false || tagSearchResults === false ? 
      
      null

      :

      <div className="container border-bottom">
        <div className="row">
          <div className="col mt-4">
            {/* displays the students photo */}
            <div>
              <img className="text-center studentPicture" src={studentInfo.pic} alt="student"/>
            </div>
          </div>
          <div className="col-8">
            <div className="row text-start fw-bold">
              {/* displays students name */}
              <div className="col">
                <p className="studentName" >{studentInfo.firstName} {studentInfo.lastName}</p>
              </div>
            </div>
            <div className="row text-start ms-3">
              {/* displays other student info */}
              <div className="col">
                <p className="mb-2 studentInfo">Email: {studentInfo.email}</p>
                <p className="mb-2 studentInfo">Company: {studentInfo.company}</p>
                <p className="mb-2 studentInfo">Skill: {studentInfo.skill}</p>
                {studentInfo.average === undefined ? <p>loading...</p> : <p style={{margin: '0px', padding: '0px'}} className="mb-2">Average: {studentInfo.average}%</p>}
                {/* Displays the grade detials */}
                {showGrades === true ?
                
                <div className="mb-3">
                  {(studentInfo.grades).map((grade, idx) =>
                    <p className="studentInfo">Test {idx+1}: {grade}%</p>
                  )}
                </div>

                :

                null
                }
                {/* Displays the tags applied to the student */}
                <Tags tags={studentInfo.tags} />
                {/* Displays the "Add a tag" text input */}
                <form onSubmit={ addTag } >
                  <input className='mb-4 tagInput' type="text" placeholder="Add a tag" onChange={ (e) => {setTag(e.target.value)} } value={tag} />
                </form>
              </div>
            </div>
          </div>
          {/* Toggles and displays the plus and minus signs the the top right corner */}
          {showGrades === true ?
            
          <div className="col d-flex justify-content-end">
            <img className="btn mt-2 minusSign" onClick={toggleDisplayGrades} src={minusSign} alt="Minus Sign" />
          </div>

          :

          <div className="col d-flex justify-content-end">
            <img className="btn plusSign" onClick={toggleDisplayGrades} src={plusSign} alt="" />
          </div>
          }
        </div>
      </div>
      }
    </div>
  )
}