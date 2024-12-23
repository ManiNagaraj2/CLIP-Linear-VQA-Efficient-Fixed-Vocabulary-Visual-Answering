# CLIP-Linear VQA: Efficient Fixed-Vocabulary Visual Answering


## Overview

This project is a **Visual Question Answering (VQA)** web application that takes an image and a textual question as input and returns an answer based on the visual and textual context. It is powered by a combination of **PyTorch**, **CLIP (Contrastive Language-Image Pretraining)**, and a custom neural network.

The web application consists of:
- **Backend:** Built with Flask, hosting the VQA model and handling predictions.
- **Frontend:** Built with React, providing an intuitive user interface for uploading images, asking questions, and getting answers.

<p align="center">
  <img src="Images/vizwiz_example.png" alt="VizWiz Example" width="500"/>
</p>
---

## Features

- **Advanced VQA Model:** Combines CLIP embeddings with a custom neural network to generate accurate answers.
- **Multi-class Classification:** Supports 5410 answer classes.
- **Answerability Scoring:** Provides a confidence score indicating whether the question is answerable based on the input image.
- **Text-to-Speech (TTS):** Listen to the answer with a single click.
- **Interactive UI:** Simple and responsive user interface built with React.
- **Deployment-Ready:** Backend and frontend are fully integrated and ready for deployment.

---

## Our Approach
Our Visual Question Answering (VQA) solution is implemented using a fixed vocabulary approach. This means that the model is not generative, but rather selects the answer from a pre-defined set of possible answers which is discussed in the [Less is More research](https://arxiv.org/abs/2206.05281). This approach is more suitable for our use case, as it allows us to control the vocabulary and ensure that the model only outputs answers that are relevant to the question. In addition to that, it requires a lot less computing power than any other solution. We use the [CLIP](https://openai.com/blog/clip/) model to extract features from the image and the question, and then feed them into a linear layer to predict the answer. We use the [VizWiz](https://vizwiz.org/tasks-and-datasets/vqa/) dataset for training and evaluation. We use the [PyTorch](https://pytorch.org/) library for building and training the model. We have also used [Flask](https://flask.palletsprojects.com/en/2.3.x/) to create a web application that allows you to interact with our model and see its capabilities in action.

---

## Dataset
For this project, we used the [VizWiz](https://vizwiz.org/tasks-and-datasets/vqa/) dataset. It is a large-scale visual question answering dataset that contains 
- 20,523 training image/question pairs
- 205,230 training answer/answer confidence pairs
- 4,319 validation image/question pairs
- 43,190 validation answer/answer confidence pairs
- 8,000 test image/question pairs

Dataset files are as follows:
- Images: training, validation, and test sets
- Annotations: Visual questions are split into three JSON files: train, validation, and test. Answers are publicly shared for the train and validation splits and hidden for the test split.

- The dataset is available on [Kaggle](https://www.kaggle.com/datasets/lhanhsin/vizwiz)

---

## File Structure

### Backend
- `app.py`: Flask server handling routes and model inference.
- `vqa_model.py`: Custom VQA model leveraging CLIP features.
- `Saved_Models/`: Directory containing the trained model and encoders.

### Frontend
- `VQAApp.js`: React component implementing the main UI.
- `App.css` & `VQAApp.css`: Custom styles for the UI.

---

## Setup and Installation

### Prerequisites
- Python 3.12+
- Node.js (for the React frontend)
- PyTorch (with appropriate CUDA version if GPU is used)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vqa-webapp.git
   cd vqa-webapp/backend

2. Install Python dependencies:   
    ```bash
    pip install -r requirements.txt

3. Download the trained model and place it in the `Saved_Models/` directory

4. Run the Flask server:
   ```bash
   python app.py

### Frontend Setup 
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the React development server:
   ```bash
   npm start

 ---  

## Usage
1. Launch the backend (http://127.0.0.1:5000) and the frontend (http://localhost:3000)
2. Upload an image and type a question in the web interface.
3. Click "Get Answer" to receive the response.
4. Optional) Click the 🔊 button to hear the answer.

---   

## Model Details
The model architecture combines CLIP embeddings with a multi-layer neural network:
 ### Input Features:
 - CLIP visual and text embeddings.
 ### Architecture:
 We will follow the architecture mentioned in [Less Is More](https://arxiv.org/abs/2206.05281) paper. The architecture goes as follows:

- Each Linear layer consist of Layer Norm followed by Drop out with probability of 0.5 followed by fully connected layer of size 512.
- We will have Cross Entropy Loss for answer and answer type
- We will use Binary Cross Entropy Loss for answerability

 ### Output:
 - Multi-class classification for answer prediction and answer type.

 <p align="center">
   <img src="Images/model_architecture.png" alt="Training Losses" width="500"/>
 </p>

 ---  

## Example Workflow
1. ### Input: 
- Image: A photo of a cat sitting on a sofa. 
- Question: "What is the object on the sofa?"

2. ### Output:
- Answer: "Cat"
- Answer Type: "Object"
- Answerability: 0.95 (High confidence)

---

## User Interface 
<p align="center">
  <img src="Result/userinterface.jpg" alt="Web Application" width="500"/>
</p>

---

## Results

<table align="center">
    <tr>
        <th>Metrics</th>
        <th>Training</th>
        <th>Validation</th>
    </tr>
  <tr>
    <td>Accuracy</td>
    <td>76.4%</td>
    <td>48.0%</td>
  </tr>
  <tr>
    <td>Answerability</td>
    <td>80.2%</td>
    <td>79.8%</td>
  </tr>
</table>

---

## References

- [Less Is More: Linear Layers on CLIP Features as Powerful VizWiz Model](https://arxiv.org/abs/2206.05281)

- [CLIP: Connecting text and images](https://openai.com/research/clip)

- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)

---

## Contributors

- [Mani Nagaraj](https://github.com/ManiNagaraj2)

- [Bhanu Sri Harsha](https://github.com/NoobPeen)

- [Sam Tikikas](https://github.com/SamTikikas)

- [Aditya Singireddy](https://github.com/Atrix05)

---


