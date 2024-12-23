# Visual Question Answering (VQA) Web Application

## Overview

This project is a **Visual Question Answering (VQA)** web application that takes an image and a textual question as input and returns an answer based on the visual and textual context. It is powered by a combination of **PyTorch**, **CLIP (Contrastive Language-Image Pretraining)**, and a custom neural network.

The web application consists of:
- **Backend:** Built with Flask, hosting the VQA model and handling predictions.
- **Frontend:** Built with React, providing an intuitive user interface for uploading images, asking questions, and getting answers.

---

## Features

- **Advanced VQA Model:** Combines CLIP embeddings with a custom neural network to generate accurate answers.
- **Multi-class Classification:** Supports 5410 answer classes.
- **Answerability Scoring:** Provides a confidence score indicating whether the question is answerable based on the input image.
- **Text-to-Speech (TTS):** Listen to the answer with a single click.
- **Interactive UI:** Simple and responsive user interface built with React.
- **Deployment-Ready:** Backend and frontend are fully integrated and ready for deployment.

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
