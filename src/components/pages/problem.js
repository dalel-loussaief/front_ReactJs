import React, { useState } from "react";

const About = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
   const [pdfUrl, setPdfUrl] = useState('');
 // const [pdfUrl, setPdfUrl] = useState(null);




  const addQuestion = () => {
    const question = { id: Date.now(), text: newQuestion };
    setQuestions([...questions, question]);
    setNewQuestion("");
  };

  const updateQuestion = (id, updatedQuestion) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, text: updatedQuestion };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
   
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };
 
  const handleFileChange = (event) => {
   
    const file = event.target.files[0];
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 350;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageUrl(dataUrl);
       

      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
   const pdfChange = (event) => {
    const file = event.target.files[0];
    setPdfUrl(URL.createObjectURL(file));
    
        setPdfUrl(URL.createObjectURL(file));
  } 
  const handleOpenPdf = () => {
    window.open(pdfUrl, '_blank');
  };
  // Envoie des données à un serveur
  /*fetch('/api/questions', {
    method: 'POST',
    body: data,
  }).then(response => {
    if (response.ok) {
      console.log('Question ajoutée avec succès !');
      onAddQuestion(question, imageUrl);
      setQuestion('');
      setSelectedFile(null);
      setImageUrl(null);
    } else {
      console.error('Une erreur est survenue lors de l\'ajout de la question : ', response.status);
    }
  });
}*/


       
  return (
    <div className="container">
      <div className="py-4">
        <h1 className="mb-3 text-center">Ask a question</h1>
        <div className="d-flex justify-content-center">
        <div className="App">
          <div className="box" >
    
            <input
              type="text"
              placeholder="Entrez votre question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              style={{ fontSize: "25px", "::placeholder": { fontSize: "20px" } }}
            />
            {<button  class="btn btn-outline-primary"onClick={addQuestion}>Ajouter</button>}
            {/* <form onSubmit={handleSubmit}> */}
          <div>
          { <label>
        Sélectionnez une photo :
        <input className="my-button-class" type="file" onChange={handleFileChange} /> 
        {imageUrl && <img src={imageUrl} alt="Image sélectionnée" />}
      </label> }
            
          </div>
            
      {/* <embed src="/nom_du_fichier.pdf" type="application/pdf" width="100%" height="600px" /> */}
      <div>
      <input type="file" accept=".pdf" onChange={pdfChange} />
      
      {/* {pdfUrl && (
        <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" /> */}
        {pdfUrl && (
          <button className="my-button-class" onClick={handleOpenPdf}>Ouvrir le PDF</button>
        )}
      
      
    </div>
   
          </div>
          
         
           {/*  <div>
            <h2>Liste des probleme en photo</h2>
          
                
                <button onClick={() => deleteQuestion()}>
                  Supprimer
                
                </button>





            </div> */}
         

          <div className="box">
    
            <h2>Liste des questions</h2>
            {questions.map((question) => (
              <div key={question.id}>
                <input 
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, e.target.value)}
                />
                
                <button onClick={() => deleteQuestion(question.id)}>
                  Supprimer
                
                </button>
              </div>
              
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
