import './App.css';
import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import axios from 'axios';

import Main from './views/main';

function App() {

  const loaded = true;
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    axios("https://api.hatchways.io/assessment/students")
      .then(res => setStudentData(res.data))
  }, [loaded])

  const addAverageToStudent = () => {
    let studentIdx = 0;
    let gradeIdx = 0;
    let sum = 0;
    while(studentIdx < studentData.students.length-1){
      if(gradeIdx >= 8){
        studentData.students[studentIdx].average = sum/8;
        studentIdx++;
        gradeIdx = 0;
        sum = 0;
      }
      sum += Number(studentData.students[studentIdx].grades[gradeIdx]);
      gradeIdx++;
    }
  }

  return (
    <div className="App">
      {studentData.students === undefined ? null : addAverageToStudent()}
      <Router>
        <Main path='/' studentData={studentData}/>
      </Router>
    </div>
  );
}

export default App;
