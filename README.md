Visual Question Answering (VQA) Web Application
Overview
This project is a Visual Question Answering (VQA) web application that takes an image and a textual question as input and returns an answer based on the visual and textual context. It is powered by a combination of PyTorch, CLIP (Contrastive Language-Image Pretraining), and a custom neural network.

The web application consists of:

Backend: Built with Flask, hosting the VQA model and handling predictions.
Frontend: Built with React, providing an intuitive user interface for uploading images, asking questions, and getting answers.
<!-- Add a link to the demo screenshot if available -->

Features
Advanced VQA Model: Combines CLIP embeddings with a custom neural network to generate accurate answers.
Multi-class Classification: Supports 5410 answer classes.
Answerability Scoring: Provides a confidence score indicating whether the question is answerable based on the input image.
Text-to-Speech (TTS): Listen to the answer with a single click.
Interactive UI: Simple and responsive user interface built with React.
Deployment-Ready: Backend and frontend are fully integrated and ready for deployment.
File Structure
Backend
app.py: Flask server handling routes and model inference.
vqa_model.py: Custom VQA model leveraging CLIP features.
Saved_Models/: Directory containing the trained model and encoders.
Frontend
VQAApp.js: React component implementing the main UI.
App.css & VQAApp.css: Custom styles for the UI.
Setup and Installation
Prerequisites
Python 3.12+
Node.js (for the React frontend)
PyTorch (with appropriate CUDA version if GPU is used)
Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/vqa-webapp.git
cd vqa-webapp/backend
Install Python dependencies:
bash
Copy code
pip install -r requirements.txt
Download the trained model and place it in the Saved_Models/ directory.
Run the Flask server:
bash
Copy code
python app.py
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install dependencies:
bash
Copy code
npm install
Start the React development server:
bash
Copy code
npm start
Usage
Launch the backend (http://127.0.0.1:5000) and the frontend (http://localhost:3000).
Upload an image and type a question in the web interface.
Click "Get Answer" to receive the response.
(Optional) Click the 🔊 button to hear the answer.
Model Details
The model architecture combines CLIP embeddings with a multi-layer neural network:

Input Features: CLIP visual and text embeddings.
Architecture:
Two linear layers with dropout and layer normalization.
Separate branches for answer type prediction, answer mask generation, and answerability scoring.
Output: Multi-class classification for answer prediction and answer type.
Example Workflow
Input:
Image: A photo of a cat sitting on a sofa.
Question: "What is the object on the sofa?"
Output:
Answer: "Cat"
Answer Type: "Object"
Answerability: 0.95 (High confidence)
Deployment
Using Docker
Build the Docker image:
bash
Copy code
docker build -t vqa-webapp .
Run the container:
bash
Copy code
docker run -p 5000:5000 vqa-webapp
On AWS EC2
Follow this guide to deploy the Flask app on an EC2 instance.

Future Enhancements
Model Improvements: Fine-tune on additional datasets for better accuracy.
Multi-Language Support: Extend to support questions in multiple languages.
Real-time Predictions: Implement streaming capabilities for video input.
Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Acknowledgments
OpenAI CLIP
PyTorch
Flask & React.js
