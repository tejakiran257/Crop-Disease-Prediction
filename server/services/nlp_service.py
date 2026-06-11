import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


# Initialize the OpenAI client for OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def process_query(query):
    """
    Process the user query using OpenRouter (LLM), with a fallback to rules.
    """
    try:
        completion = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            extra_headers={
                "HTTP-Referer": "http://localhost:3000", # Optional, for OpenRouter rankings
                "X-Title": "Agriculture Assistant", # Optional
            },
            messages=[
                {"role": "system", "content": "You are a helpful and knowledgeable Agricultural Assistant. Your goal is to assist farmers and users with questions related to agriculture, crops, fertilizers, plant diseases, and farming best practices. Provide clear, concise, and practical advice. If you don't know the answer, politely say so."},
                {"role": "user", "content": query}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        # Fallback to rule-based logic if API fails (e.g., quota exceeded)
        return get_fallback_response(query)

def get_fallback_response(query):
    """
    Simple rule-based responses for when the brain is offline.
    """
    query = query.lower()
    
    if "fertilizer" in query:
        return "To recommend a fertilizer, I need soil details like Nitrogen, Phosphorus, and Potassium levels. (Offline Mode)"
    elif "crop" in query or "plant" in query:
        return "I can help you choose the best crop for your season. Please provide the soil and weather conditions. (Offline Mode)"
    elif "disease" in query or "sick" in query:
        return "If your plant looks sick, you can upload a photo of the leaf, and I will try to identify the disease. (Offline Mode)"
    elif "hello" in query or "hi" in query:
        return "Hello! I am your AI Agriculture Assistant. How can I help you today? (Offline Mode)"
    else:
        return "I'm having trouble connecting to my advanced brain (Quota Exceeded), but I'm here to help with basic queries! Try asking about crops or fertilizers."

