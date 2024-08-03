import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Select from "react-select";
import VerifyTutor from "../TutorInfo/tutorVerification.jsx";
import pdfToText from "react-pdftotext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { courses } from "../TutorInfo/constants.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import "./editTutorProfile.css";
import { useNavigate } from "react-router-dom";

let file = null;
function getFile(event) {
  file = event.target.files[0];
}
const etpCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid black",
    borderRadius: "20px",
    padding: "1px",
    boxShadow: state.isFocused ? "0 0 0 1px black" : null,
    "&:hover": {
      borderColor: "black",
    },
    width: "400px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "rgb(22, 86, 166)" : "white",
    "&:hover": {
      backgroundColor: "rgb(22, 86, 166)",
    },
  }),
};
const EditTutorProfile = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const [currentProfile, setCurrentProfile] = useState();
  const [updatedProfile, setUpdatedProfile] = useState({
    description: "",
    rate: 0,
    verifiedCourses: [],
  });
  const descriptionInputRef = useRef(null);
  const rateInputRef = useRef(null);
  const verifiedCoursesInputRef = useRef(null);
  // handles change for form input fields
  const handleChange = (selectedOptions, actionMeta) => {
    if (actionMeta?.name === "verifiedCourses") {
      setUpdatedProfile((prevState) => ({
        ...prevState,
        verifiedCourses: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
      }));
    }

    if (descriptionInputRef.current) {
      setUpdatedProfile((prevState) => ({
        ...prevState,
        description: descriptionInputRef.current.value,
      }));
    }
    if (rateInputRef.current) {
      setUpdatedProfile((prevState) => ({
        ...prevState,
        rate: rateInputRef.current.value,
      }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    let pass = 1;
    if (!isLoaded) {
      return;
    }
    if (!user) {
      console.log("User not found");
      return;
    }
    if (isNaN(updatedProfile.rate)) {
      toast.error("Please enter a valid rate (numbers only)");
      pass = 0;
    }
    console.log("new", updatedProfile.verifiedCourses);
    console.log("old", currentProfile.verifiedCourses);
    //if any new courses have been selected, transcript is required
    if (
      updatedProfile.verifiedCourses.length != 0 &&
      updatedProfile.verifiedCourses.some(
        (element) => !currentProfile.verifiedCourses.includes(element)
      )
    ) {
      if (file == null) {
        //transcript has not been uploaded
        toast.error("Please upload a valid transcript");
        pass = 0;
      } else {
        let transcript = pdfToText(file)
          .then((text) => {
            return text;
          })
          .catch((error) => console.error("Failed to extract text from pdf"));
        let textoftranscript = await transcript;
        pass = VerifyTutor(updatedProfile.verifiedCourses, textoftranscript);
      }
    }
    const email = String(user.primaryEmailAddress);
    if (pass == 1) {
      console.log(updatedProfile.verifiedCourses);
      let newCourses = [];
      // if no new courses are added, retain the previous courses
      // otherwise send the new courses to the database
      if (updatedProfile.verifiedCourses.length == 0) {
        newCourses = currentProfile.verifiedCourses;
      } else if (updatedProfile.verifiedCourses.length > 0) {
        newCourses = updatedProfile.verifiedCourses;
      }

      axios
        .post("http://localhost:3001/updateTutorInfo", {
          email: email,
          description: updatedProfile.description,
          rate: updatedProfile.rate,
          verifiedCourses: newCourses,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error updating tutor:", error);
        });
      toast.success("Your profile has been updated!");
      navigate(`/tutor/${user.fullName}`, { state: { email: email } });
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!user) {
      console.log("User not found");
      return;
    }
    const email = String(user.primaryEmailAddress);
    (async () => {
      try {
        await axios
          .get("http://localhost:3001/getTutorByEmail", {
            params: { email: email },
          })
          .then((response) => {
            const tutorData = response.data;
            setCurrentProfile(tutorData);
          });
        if (currentProfile) {
          console.log(currentProfile.verifiedCourses);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = currentProfile?.description || "";
    }
    if (rateInputRef.current) {
      rateInputRef.current.value = currentProfile?.rate || 0;
    }
  }, [currentProfile?.description, currentProfile?.rate]);

  if (!isLoaded) {
    return;
  }
  if (!user) {
    console.log("User not found");
    return;
  }
  const name = user.fullName;
  const image = user.imageUrl;
  let array = [];
  let i = 0;
  for (let j = 0; j < currentProfile?.verifiedCourses.length; j++) {
    array[j] = {
      label: currentProfile?.verifiedCourses[i],
      value: currentProfile?.verifiedCourses[i],
    };
    i++;
  }

  if (currentProfile) {
    return (
      <div>
        <div>
          <Nav />
        </div>
        <div>
          <ToastContainer></ToastContainer>
        </div>
        <div
          className=" flex flex-col items-center lg:flex-row"
          style={{ height: "calc(100vh - 58px)" }}
        >
          <div className="w-2/3 lg:w-1/3 flex flex-col items-center">
            <h1 className="text-4xl text-center lg:text-5xl">Edit Your Profile</h1>
            {/* print out name and image */}
            <h2 className="text-3xl mt-6">{name}</h2>
            <img
              src={image}
              width="184px"
              className="mt-3 lg:w-80"
            />
          </div>
          <div className="mt-10 lg:mt-0 w-2/3 flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="flex justify-between items-center">
                <h2 className="max-w-36">Courses:</h2>
                <Select
                  required={true}
                  defaultValue={array}
                  ref={verifiedCoursesInputRef}
                  options={courses}
                  onChange={handleChange}
                  isMulti={true}
                  name="verifiedCourses"
                  styles={etpCustomStyles}
                />
              </div>

              <div className="flex justify-between items-center">
                <h2 className="max-w-36">Hourly rate:</h2>
                <input
                  ref={rateInputRef}
                  name="rate"
                  required={true}
                  className="etp-input"
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <h2 className="max-w-36">Additional information:</h2>
                <input
                  ref={descriptionInputRef}
                  name="description"
                  className="etp-input"
                  required={true}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center">
                <h2 className="max-w-36">Upload your latest transcript:</h2>
                <input
                  id="transcript"
                  type="file"
                  accept="application/pdf"
                  className="etp-upload-transcript-button"
                  onChange={getFile}
                />
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="etp-submit-button">
                  Save Changes
                </button>
              </div>
            </form>
            <div className="etp-vertical-line"></div>
          </div>
        </div>
      </div>
    );
  }
};
export default EditTutorProfile;
