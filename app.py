from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import torch
import pickle
from vqa_model import VQAModel
import os

app = Flask(__name__)
CORS(app)

# Loading the fitted One Hot Encoders from the disk
with open('Saved_Models/answer_onehotencoder.pkl', 'rb') as f:
    ANSWER_ONEHOTENCODER = pickle.load(f)
with open('Saved_Models/answer_type_onehotencoder.pkl', 'rb') as f:
    ANSWER_TYPE_ONEHOTENCODER = pickle.load(f)

# Loading the model from the disk
DEVICE = torch.device("cpu")
MODEL_NAME = "ViT-L/14@336px"
NUM_CLASSES = 5410
MODEL_PATH = "Saved_Models/epoch_50.pth"
model = VQAModel(num_classes=NUM_CLASSES, device=DEVICE, hidden_size=512, model_name=MODEL_NAME).to(DEVICE)
model.load_model(MODEL_PATH)

UPLOAD_DIR = os.path.join(app.root_path, 'static/uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.route('/')
def index():
    return "Welcome to the VQA Webapp."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        question = request.form.get('question')
        if not question:
            return jsonify({'error': 'No question provided'}), 400

        image_path = os.path.join(UPLOAD_DIR, 'user_image.jpg')
        
        if 'image' in request.files:
            image = request.files['image']
            if not image.mimetype.startswith('image/'):
                return jsonify({'error': 'Invalid file type, please upload an image'}), 400
            image.save(image_path)
        else:
            return jsonify({'error': 'No image provided'}), 400

        predicted_answer, predicted_answer_type, answerability = model.test_model(image_path=image_path, question=question)
        answer = ANSWER_ONEHOTENCODER.inverse_transform(predicted_answer.cpu().detach().numpy())
        answer_type = ANSWER_TYPE_ONEHOTENCODER.inverse_transform(predicted_answer_type.cpu().detach().numpy())
        
        response = {
            'answer': answer[0][0],
            'answer_type': answer_type[0][0],
            'answerability': answerability.item()
        }
        return jsonify(response)
    
    except Exception as e:
        print(f"Error in /predict route: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
