import pdfToText from "react-pdftotext";

/*function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => console.log(text))
        .catch(error => console.error("Failed to extract text from pdf"))
}*/

function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => 
            parsetext(text)
        )
        .catch(error => console.error("Failed to extract text from pdf"))
}

function parsetext(text){
    const course = "CSCA08"
    let i = text.search(course)
    console.log(text)
    if (i == -1){
        console.error("Could not find course in transcript")
    }
    console.log(i)
    console.log(text[i])
    let smalltext = text.substring(i)
    console.log(smalltext)
    let j = smalltext.search("0.50")
    if (j == -1){
        console.error("Could not find credit in transcript")
    }
    console.log(j)
    console.log(text[j])
    let smallertext = smalltext.substring(j)
    console.log(smallertext)
    let finalgrade = smallertext.slice(7,10);
    console.log(finalgrade)
   
}

function PDFExtract() {

    return (
        <div>
            <header className="App-header">
                <input type="file" accept="application/pdf" onChange={extractText}/>
            </header>
        </div>
    );
}
export default PDFExtract;