from flask import Flask, request, jsonify
from flask_cors import CORS
from services.ml_service import predict_crop, predict_fertilizer, predict_disease
from services.nlp_service import process_query
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# ✅ Health Check Route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Smart Agriculture API is running"
    })

# ✅ Crop Prediction
@app.route('/api/predict/crop', methods=['POST'])
def crop_route():
    data = request.json
    try:
        result = predict_crop(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ✅ Fertilizer Prediction
@app.route('/api/predict/fertilizer', methods=['POST'])
def fertilizer_route():
    data = request.json
    try:
        result = predict_fertilizer(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ✅ Chat API
@app.route('/api/chat', methods=['POST'])
def chat_route():
    data = request.json
    user_query = data.get('query', '')
    try:
        response = process_query(user_query)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ✅ Disease Prediction (Image Upload)
@app.route('/api/predict/disease', methods=['POST'])
def disease_route():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    try:
        image_bytes = file.read()
        result = predict_disease(image_bytes)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)