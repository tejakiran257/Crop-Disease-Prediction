import React, { useState } from 'react';
import { predictCrop } from '../services/api';
import { Sprout, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = {
                N: parseFloat(formData.N),
                P: parseFloat(formData.P),
                K: parseFloat(formData.K),
                temperature: parseFloat(formData.temperature),
                humidity: parseFloat(formData.humidity),
                ph: parseFloat(formData.ph),
                rainfall: parseFloat(formData.rainfall)
            };
            const response = await predictCrop(data);
            setResult(response.prediction);
        } catch (err) {
            setError("Failed to get prediction. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <span className="text-primary">Crop</span> Recommendation
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Enter your soil and climate details to find the most suitable crop.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Nitrogen (N)" name="N" value={formData.N} onChange={handleChange} />
                                <InputField label="Phosphorus (P)" name="P" value={formData.P} onChange={handleChange} />
                                <InputField label="Potassium (K)" name="K" value={formData.K} onChange={handleChange} />
                                <InputField label="Temperature (°C)" name="temperature" value={formData.temperature} onChange={handleChange} />
                                <InputField label="Humidity (%)" name="humidity" value={formData.humidity} onChange={handleChange} />
                                <InputField label="pH Level" name="ph" value={formData.ph} onChange={handleChange} />
                                <InputField label="Rainfall (mm)" name="rainfall" value={formData.rainfall} onChange={handleChange} className="md:col-span-2" />
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg font-bold text-lg hover:bg-emerald-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <><Loader className="animate-spin h-5 w-5" /> Analyzing...</> : "Recommend Crop"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2 rounded-r"
                    >
                        <AlertCircle className="h-5 w-5" /> {error}
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-8 p-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white text-center shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold mb-2">Recommended Crop</h3>
                        <div className="text-5xl font-extrabold flex justify-center items-center gap-3">
                            <Sprout className="h-12 w-12" /> {result}
                        </div>
                        <p className="mt-4 text-emerald-100">Based on your provided conditions.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, className = "" }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="number"
            name={name}
            step="0.01"
            required
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none bg-gray-50 focus:bg-white"
            placeholder={`Enter ${label}`}
        />
    </div>
);

export default CropRecommendation;
