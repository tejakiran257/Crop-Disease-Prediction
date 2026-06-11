import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const checkHealth = async () => {
    try {
        const response = await axios.get(`${API_URL}/health`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const predictCrop = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/predict/crop`, data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const predictFertilizer = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/predict/fertilizer`, data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const chatWithAI = async (query) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, { query });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
