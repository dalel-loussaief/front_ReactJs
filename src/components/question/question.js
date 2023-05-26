
const addQuestion = (question) => {
    setQuestions([...questions, question]);
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
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    // Vous pouvez maintenant envoyer la photo via une requête HTTP ici
    console.log(formData.get('photo'));
  };
  
  