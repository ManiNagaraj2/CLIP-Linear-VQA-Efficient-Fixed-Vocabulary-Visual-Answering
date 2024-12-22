import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerType, setAnswerType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setAnswer('');
    setAnswerType('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('question', question);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setAnswer(response.data.answer);
      setAnswerType(response.data.answer_type);
    } catch (err) {
      setError('Error fetching answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">VQA Webapp</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="imageUpload">Upload an Image:</label>
          <input type="file" className="form-control" id="imageUpload" onChange={handleImageChange} required />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="question">Ask a Question:</label>
          <input
            type="text"
            className="form-control"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Type your question here"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      {answer && (
        <div className="mt-4">
          <h3>Answer: {answer}</h3>
          <h5>Answer Type: {answerType}</h5>
        </div>
      )}
    </div>
  );
}

export default App;
