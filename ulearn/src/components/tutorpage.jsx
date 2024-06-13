import React, { useState } from "react";
import Select from "react-select";
import './tutorpage.css';
import VerifyTutor from './tutorverification'
import pdfToText from "react-pdftotext";

let file;

function getFile(event) {
  file = event.target.files[0]
}

const options = [
  {value: 'CSCA08', label: 'CSCA08'}, 
  {value: 'CSCA48', label: 'CSCA48'}, 
  {value: 'CSCA67', label: 'CSCA67'}, 
  {value: 'MATA22', label: 'MATA22'}, 
  {value: 'MATA31', label: 'MATA31'}, 
  {value: 'MATA37', label: 'MATA37'}, 
];

function TutorPage(){
  
  const [rate, setRate] = useState('');
  const [description, setDescription] = useState('');

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello")
    let courses = ["CSCA08"]
    pdfToText(file).then(text => VerifyTutor(courses, text)).catch(error => console.error("Failed to extract text from pdf"))
    //things that need to happen: 
    //1. verify selected courses with uploaded transcript
    //2. check if all required fields are filled, if not, raise error
    //3. if all fields are filled, send data to database (verified courses, rate, additional info)
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', height: '100vh' }}>
       <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-tutor-isolated-cartoon-vector-illustrations-picture-image_8710246.png" alt="ULearn Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
       </div>
       <div style={{ borderLeft: '2px solid black', height: '100vh' }}></div>
       <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', flexDirection: 'column' }}>
         {/* above is the style for image on left side and textboxes on the right with line down middle*/}

         <h3>Which courses would you like to teach?</h3>
         <Select
           options={options}
           value={selectedOptions}
           onChange={handleChange}
           isMulti={true}/>
    
      <h3>What is your hourly rate?</h3>
      <textarea type="number" value={rate} onChange={e => setRate(e.target.value)} />
      <h3>Add any additional information about yourself:</h3>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <br />
      <h3>Upload your latest unofficial transcript:</h3>
      <input id='transcript' type="file" accept="application/pdf" onChange={getFile}/>
      </div>
      <input type="submit" className="submit-button" value="Submit"></input>
     </form>
    </div>
  );


}

export default TutorPage;

