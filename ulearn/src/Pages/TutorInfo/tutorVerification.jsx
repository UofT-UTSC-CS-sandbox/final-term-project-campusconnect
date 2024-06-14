import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getCourseGrade(course, text){
    let courseindex = text.search(course)
    if (courseindex == -1){
        console.error("Could not find course in transcript")
        return -1;
    }
    let smalltext = text.substring(courseindex)
    let creditindex = smalltext.search("0.50")
    if (creditindex == -1){
        console.error("Could not find credit in transcript")
        return -1;
    }
    let smallertext = smalltext.substring(creditindex)
    let finalgrade = smallertext.slice(7,10);
    let grade = parseInt(finalgrade)
    return(
        grade
    )
}

function VerifyTutor(courses, text){
    let pass = 1;
    for (let i = 0; i < courses.length; i++){
        let grade = getCourseGrade(courses[i], text);
        if (grade < 80){
            pass = 0;
            toast.error("Invalid transcript or you are not elligible to teach " + courses[i] + ". Please remove course from selection.");
        }
    }
    return(
        pass
    )
}
export default VerifyTutor;