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
    console.log(text)
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