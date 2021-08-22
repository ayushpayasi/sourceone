import React,{useState,useEffect} from "react"
import axios from "axios"
import {Container,Row,Col} from "reactstrap"
import NavBar from "./components/navbar.component";

function App() {
  const [pdfData,setPdfData] = useState(null);
  
  const fetchBill = async()=>{
    const response = await axios.post("http://localhost:5000/api/bill/getBill",{userName:"ayush",password:"ayush123"})
    setPdfData(response.data.data)
  }

  useEffect(() => {
    fetchBill()
  }, [])

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();}


  return (
    <div className="App">
      <NavBar/>
      
      <Container>
        
      </Container>
      <button onClick={()=>downloadPDF(pdfData)}>download</button>
    </div>
  );
}

export default App;
