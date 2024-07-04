import React, { useState } from "react";
import Select from "react-select";
import './tutorInfoPage.css';
import VerifyTutor from './tutorVerification.jsx';
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

const tipCustomStyles = {
  control: (provided, state) => ({
      ...provided,
      border: '2px solid black',
      borderRadius: '20px',
      padding: '1px',
      margin: '20px 0px',
      boxShadow: state.isFocused ? '0 0 0 1px black' : null,
      '&:hover': {
          borderColor: 'black',
      },
      minHeight: '50px', // Set the minimum height of the control
      height: 'auto',
      maxHeight: 'auto',
      width: 'auto',     // Allows the width to be dynamic
      minWidth: '400px', // Minimum width of the control
      maxWidth: 'auto',
     
  }),
  menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
  }),
  option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgb(22, 86, 166)' : 'white',
      '&:hover': {
          backgroundColor: 'rgb(22, 86, 166)',
      },
  }),
};

function TutorPage() {
  const { user } = useUser();
  const [rate, setRate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let courses = selectedOptions.map(option => option.value)
    const email = String(user.primaryEmailAddress);
    let transcript = pdfToText(file).then(text => {return text}).catch(error => console.error("Failed to extract text from pdf"));
    let textoftranscript = await transcript;
    let pass = VerifyTutor(courses, textoftranscript);
    let finishedSignUp = false;
    if (isNaN(rate)){
      toast.error("Please enter a valid rate (numbers only)")
      pass = 0;
    }
    if (pass == 1){
      const dataToSend = {
        email: email,
        verifiedCourses: courses,
        rate: rate,
        description: description,
     };
     axios.post(`http://localhost:3001/tutors`, dataToSend)
       .catch(error => {
         console.error('Failed to send data:', error);
       });
       toast.success("Your account has been created!")
       finishedSignUp = true;
       axios.post(`http://localhost:3001/updatePersonalInfo`, {email, finishedSignUp})
       window.location.href = "/homePage"
    }
    else{
      return
    }
  };

  return (
    <div className="tip-body">
    <div className="tip-background-overlay"></div>
    <h2 className="tip-title">Tutor Info</h2>
    <div className="tip-wrapper">
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit} >
         <Select required={true}
          placeholder="Please select courses"
           options={options}
           value={selectedOptions}
           onChange={handleChange}
           isMulti={true}
           styles={tipCustomStyles}
           />
    
      
      <textarea type="number" value={rate} placeholder="What is your hourly rate?" className="tip-input" onChange={e => setRate(e.target.value)} required={true}/>
      <textarea value={description} placeholder="Add any additional information about yourself" className="tip-input" onChange={e => setDescription(e.target.value)} required={true} />
      <h4 className="tip-upload-transcript-text">Upload your latest unofficial transcript:</h4>
      <input id='transcript' type="file" accept="application/pdf" className="tip-upload-transcript-button" onChange={getFile} required={true}/>
      <input type="submit" className="tip-submit-button" value="Submit"></input>
     </form>
    </div>
    </div>
  );


}

export default TutorPage;

