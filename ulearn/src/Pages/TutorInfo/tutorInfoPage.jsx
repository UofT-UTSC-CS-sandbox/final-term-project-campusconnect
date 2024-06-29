import React, { useState } from "react";
import Select from "react-select";
import './tutorInfoPage.css';
import VerifyTutor from './tutorVerification.jsx';
import pdfToText from "react-pdftotext";
import {ToastContainer, toast} from "react-toastify";
import { UserButton } from "@clerk/clerk-react";
import "react-toastify/dist/ReactToastify.css";
import vectImg from "../../assets/images/vectImg.png";
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

const tipCustomStyle = {
    control: (provided, state) => ({
        ...provided,
        border: '2px solid black',
        borderRadius: '40px',
        padding: '5px',
        margin: '15px 0px',
        width: '300px',
        height: '60px',
        boxShadow: state.isFocused ? '0 0 0 1px black' : null,
        '&:hover': {
            borderColor: 'black',
        },
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

}

function TutorPage(){
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
    if (isNaN(rate)){
      toast.error("Please enter a valid rate (numbers only)")
      pass = 0;
    }
    if (pass == 1){
      const dataToSend = {
        email: email,
        verifiedCourses: courses,
        rate: rate,
        description: description
     };
     console.log(dataToSend);
  
     axios.post(`http://localhost:3001/tutors`, dataToSend)
       .then(response => {
         console.log(response.data)
       })
       .catch(error => {
         console.error('Failed to send data:', error);
       });
       toast.success("Your account has been created!")
       window.location.href = "/homePage"
    }
    else{
      return
    }
  };

  return (
    <div className="tip-container">
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit} >
       <div className="tip-image-container">
         <img src={vectImg} alt="ULearn Logo"/>
       </div>
       <div className="tip-wrapper">
         <h2>Tutor Info</h2>
         <UserButton/>
         <Select required={true}
         placeholder="Please enter course "
           options={options}
           value={selectedOptions}
           onChange={handleChange}
           isMulti={true}
           styles={tipCustomStyle}
           />
    
      
      <textarea type="number" value={rate} placeholder="What is your hourly rate?" onChange={e => setRate(e.target.value)} required={true}/>
      <textarea value={description} placeholder="Add any additional information about yourself" onChange={e => setDescription(e.target.value)} required={true} />
      <h4>Upload your latest unofficial transcript:</h4>
      <input id='transcript' type="file" accept="application/pdf" onChange={getFile} required={true}/>
      <input type="submit" className="tip-submit-button" value="Submit"></input>

      </div>
     </form>
    </div>
  );


}

export default TutorPage;

