import React, { useState } from 'react';
import axios from 'axios';
import './VQAApp.css';

const VQAApp = () => {
    const [image, setImage] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('question', question);

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error fetching the answer:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpeak = () => {
        if (answer) {
            const speech = new SpeechSynthesisUtterance(answer);
            speech.lang = 'en-US'; // Set the language
            speech.pitch = 1; // Adjust pitch (1 is default)
            speech.rate = 1; // Adjust rate (1 is default)
            window.speechSynthesis.speak(speech);
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">VQA Webapp</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="form-label">Upload an Image:</label>
                        <input type="file" className="form-control" onChange={handleImageChange} required />
                    </div>
                    <div className="form-group mb-4">
                        <label className="form-label">Ask a Question:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={question}
                            onChange={handleQuestionChange}
                            placeholder="Enter your question here"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Loading...' : 'Get Answer'}
                    </button>
                </form>
                {answer && (
                    <div className="mt-4">
                        <h4 className="mb-3">Answer:</h4>
                        <div className="alert alert-info">{answer}</div>
                        <button className="btn btn-secondary mt-3" onClick={handleSpeak}>
                            🔊 Hear Answer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VQAApp;
