import React, { useState } from 'react';

import StudentCards from '../components/studentCard';

export default (props) => {

  const [nameSearch, setNameSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const studentData = props.studentData;



  const nameFilter = (data) => {
    if(nameSearch.length > 0){
      let name = data.firstName.toLowerCase() + ' ' + data.lastName.toLowerCase();
      let search = nameSearch.toLowerCase();
      let nameIdx = 0;
      let searchIdx = 0;
      let match = 0;
      while(nameIdx < name.length+1){
        if(match === search.length){
          return true;
        }
        // Checks for matching strings
        if(search[searchIdx] === name[nameIdx]){
          match++;
          searchIdx++;
          nameIdx++;
          continue;
        }
        nameIdx++;
        match = 0;
        searchIdx = 0;
      }
      return false;
    } else {
      return true;
    }
  }




  const tagFilter = (data) => {
    if(tagSearch.length > 0){
      if(data.tags === undefined){
        return false;
      } else {
        let search = tagSearch.toLowerCase();
        let tagNameIdx = 0;
        let searchIdx = 0;
        let tagIdx = 0;
        let match = 0;
        while(tagIdx < data.tags.length){
          if(match === search.length){
            return true;
          }
          // Moves to next tag when the tag name has been searched
          if(tagNameIdx >= data.tags[tagIdx].length){
            tagIdx++;
            tagNameIdx = 0;
            searchIdx = 0;
            match = 0;
            continue;
          }
          // Checks for matching strings
          if(data.tags[tagIdx][tagNameIdx] === search[searchIdx]){
            match++;
            tagNameIdx++;
            searchIdx++;
            continue;
          }
          tagNameIdx++;
          match = 0;
          searchIdx = 0;
        }
        return false;
      }
    } else {
      return true;
    }
  }



  const updateTags = (tag, id) => {
    if(studentData.students[id].tags === undefined){
      studentData.students[id].tags = [tag];
    } else {
      // Checks if the tag being entered already is already in the value array
      for(let i = 0; i < (studentData.students[id].tags).length; i++){
        if(studentData.students[id].tags[i] === tag){
          return;
        }
      }
      studentData.students[id].tags.push(tag);
    }
  }



  return(
    <div>
      {studentData.students === undefined ?
      
      <h1>loading...</h1>

      :

      <div className="container-fluid d-flex align-items-center jutify-content-center mainBackground">
        <div className="row overflow-auto form-control mx-auto displayBackground">
          <div>
            {/* search bar by name. Highlight on select was disabled in index.html */}
            <input className="form-control inputStyle" type="text" placeholder="Search by name" onChange={ (e) => { setNameSearch(e.target.value) } } />
          </div>
          <div>
            {/* search bar by tag. Highlight on select was disabled in index.html */}
            <input className="form-control inputStyle" type="text" placeholder="Search by tag" onChange={ (e) => { setTagSearch(e.target.value) } } />
          </div>
          {/* displays students */}
          <div>
          {(studentData.students).map((studentInfo, idx) => 
            <div className="row fluid" key={idx}>
              <StudentCards studentInfo={studentInfo} updateTags={updateTags} nameSearchResults={nameFilter(studentInfo)} tagSearchResults={tagFilter(studentInfo)} />
            </div>
          )}
          </div>
        </div>
      </div>
      }
    </div>
  )
}