import random

# TODO: Load real models here
# import pickle
# model = pickle.load(open('model.pkl', 'rb'))

def predict_crop(data):
    """
    Predicts the best crop to grow.
    Expected data: {'N': int, 'P': int, 'K': int, 'temperature': float, 'humidity': float, 'ph': float, 'rainfall': float}
    """
    # Placeholder logic
    print(f"Predicting crop for: {data}")
    crops = ['Rice', 'Maize', 'Chickpea', 'Kidneybeans', 'Pigeonpeas', 'Mothbeans', 'Mungbean', 'Blackgram', 'Lentil', 'Pomegranate', 'Banana', 'Mango', 'Grapes', 'Watermelon', 'Muskmelon', 'Apple', 'Orange', 'Papaya', 'Coconut', 'Cotton', 'Jute', 'Coffee']
    
    # Simple heuristic for demo (replace with model.predict)
    if data.get('N', 0) > 100:
        return {"prediction": "Cotton", "confidence": "High (Heuristic)"}
    
    return {"prediction": random.choice(crops), "confidence": "Mock Data"}

def predict_fertilizer(data):
    """
    Predicts the suitable fertilizer.
    Expected data: {'Temperature': float, 'Humidity': float, 'Moisture': float, 'Soil Type': str, 'Crop Type': str, 'Nitrogen': int, 'Potassium': int, 'Phosphorous': int}
    """
    # Placeholder logic
    print(f"Predicting fertilizer for: {data}")
    fertilizers = ['Urea', 'DAP', '14-35-14', '28-28', '17-17-17', '20-20', '10-26-26']
    
    return {"recommendation": random.choice(fertilizers), "note": "Based on mock logic"}

import base64
import os
from openai import OpenAI

# Reuse the configuration (or re-init for simplicity)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def predict_disease(image_bytes):
    """
    Predicts disease from leaf image using OpenRouter Vision API.
    """
    try:
        # Encode image to base64
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": "You are an expert plant pathologist. Analyze the image provided. Identify the plant and any disease present. If healthy, say so. Provide a structured response: 1. Disease Name (or Healthy), 2. Confidence (Estimate), 3. Recommended Treatment/Action, 4. Recommended Fertilizer (Organic & Chemical). Keep it concise."
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "What is wrong with this plant?"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=300
        )
        
        content = response.choices[0].message.content
        return {"analysis": content}
        
    except Exception as e:
        print(f"Vision API Error: {e}")
        return {"error": "Could not analyze image", "details": str(e)}
