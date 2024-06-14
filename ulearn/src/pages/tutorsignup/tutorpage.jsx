import React, { useState } from "react";
import Select from "react-select";
import './tutorpage.css';
import VerifyTutor from '../../components/tutorverification.jsx'
import pdfToText from "react-pdftotext";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let file = null;

function getFile(event) {
  file = event.target.files[0]
}
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

const options = [
  {value: 'CSCA08', label: 'CSCA08'}, 
  {value: 'CSCA48', label: 'CSCA48'}, 
  {value: 'CSCA67', label: 'CSCA67'}, 
  {value: 'MATA22', label: 'MATA22'}, 
  {value: 'MATA31', label: 'MATA31'}, 
  {value: 'MATA37', label: 'MATA37'}, 
];

function TutorPage(){
  const { isSignedIn, user } = useUser();
  

  const [rate, setRate] = useState('');
  const [description, setDescription] = useState('');

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let courses = selectedOptions.map(option => option.value)
    if (courses == [] || file == null || rate == null || description == null || user == null){
      toast.warn("Please fill out all details.")
      return
    }
    const email = String(user.primaryEmailAddress);
    const transcript = pdfToText(file).then(text => {return text}).catch(error => console.error("Failed to extract text from pdf"));
    const textoftranscript = await transcript;
    let pass = VerifyTutor(courses, textoftranscript);
    if (pass == 1){
      const dataToSend = {
        email: email,
        verifiedCourses: courses,
        rate: rate,
        description: description
     };
     console.log(dataToSend); //rate correctly stores rate, description correctly stores description
  
     axios.post(`http://localhost:3001/tutors`, dataToSend)
       .then(response => {
         console.log(response.data);
       })
       .catch(error => {
         console.error('Failed to send data:', error);
       });
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
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

