import React, { useState } from 'react';
import Select from 'react-select';
import { UserButton, useUser} from '@clerk/clerk-react';
import './PersonalInfoPage.css';
import vectImg from '../../assets/images/vectImg.png'
import { universities, years, languages } from './constants.jsx';
import axios from 'axios';


const pipCustomStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '2px solid black',
        borderRadius: '40px',
        padding: '5px',
        margin: '15px 0px',
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
};

const PersonalInfoPage = () => {
    const { user } = useUser();
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleUniChange = (selectedUniversity) => {
        setSelectedUniversity(selectedUniversity);
    };

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    const handleLanguageChange = (selectedLanguages) => {
        setSelectedLanguages(selectedLanguages);
    };

    const handleImageUplaod = (event) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const imageData = reader.result;
              user.setProfileImage({
                file: imageData
              })
                .then(() => {
                  console.log('Profile picture uploaded successfully');
                  if (user) {

                    const clerkId = user.id;
                    const email = String(user.primaryEmailAddress);
                    const name = user.fullName;
                    const image = user.imageUrl;
                    axios.post(`http://localhost:3001/login`, { email })
                      .then(response => {
                        if (response.data === "found") {
                          console.log(clerkId);
                          axios.post(`http://localhost:3001/update`, { clerkId, email, name, image })
                            .then(response => {
                              console.log(response.data);
                            });
                        }
                      });
                  }
                })
                .catch((error) => {
                  console.error('Failed to upload profile picture:', error);
                });
                
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
           
      };

    const handleNext = (event) => {
        event.preventDefault();
        console.log(user.hasImage);
        if (!user.hasImage) {
            alert("Please upload a profile picture");
            return
        }
        if (selectedLanguages && selectedUniversity && selectedYear && user.hasImage) {
            const clerkId = user.id;
            const email = String(user.primaryEmailAddress);
            const name = user.fullName;
            let languages = selectedLanguages.map(lang => lang.value)
            const university = selectedUniversity.value;
            const year = selectedYear.value;
            axios.post(`http://localhost:3001/login`, { email })
                      .then(response => {
                        if (response.data === "found") {
                          console.log(clerkId);
                          axios.post(`http://localhost:3001/updatePersonalInfo`, { clerkId, email, name, university, year, languages })
                            .then(response => {
                              window.location.href = "/whoAreYou"
                            });
                        }
                      });
        }
        else {
            return
        }
    }
    return (
        <div className='pip-container'>
            <div className='pip-image-container'>
                <img src={vectImg}></img>
            </div>
            <div className='pip-wrapper'>
                <form onSubmit={handleNext}>
                    <h2>Personal Info</h2>
                    <UserButton />
                    <input required={true} type='button' value='UploadPicture' onClick={handleImageUplaod}></input>   

                    <div>
                        <Select 
                            placeholder="Which University do you attend?"
                            required={true}
                            options={universities}
                            value={selectedUniversity}
                            onChange={handleUniChange}
                            styles={pipCustomStyles}
                        />                
                    </div>
                    <div>
                        <Select
                            placeholder="What is your year of study?"
                            required={true}
                            options={years}
                            value={selectedYear}
                            onChange={handleYearChange}
                            styles={pipCustomStyles}
                        />
                    </div>
                    <div>
                        <Select
                            placeholder="What languages do you speak?"
                            required={true}
                            options={languages}
                            value={selectedLanguages}
                            onChange={handleLanguageChange}
                            isMulti={true}
                            styles={pipCustomStyles}
                        />
                    </div>
                    <input className='pip-next-button' type='submit' value='Next'></input>                   
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoPage;
