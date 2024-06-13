import pdfToText from "react-pdftotext";

function getCourseGrade(course, text){
    let courseindex = text.search(course)
    if (courseindex == -1){
        console.error("Could not find course in transcript")
    }
    let smalltext = text.substring(courseindex)
    let creditindex = smalltext.search("0.50")
    if (creditindex == -1){
        console.error("Could not find credit in transcript")
    }
    let smallertext = smalltext.substring(creditindex)
    let finalgrade = smallertext.slice(7,10);
    console.log(finalgrade)
    return(
        finalgrade
    )
}

function VerifyTutor(courses, text){
    for (let i = 0; i < courses.length; i++){
        let grade = getCourseGrade(courses[i], text);
        if (grade < 80){
        }
    }
}
export default VerifyTutor;