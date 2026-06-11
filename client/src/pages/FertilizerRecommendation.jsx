import React, { useState } from 'react';
import { predictFertilizer } from '../services/api';
import { CloudRain, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const FertilizerRecommendation = () => {
    const [formData, setFormData] = useState({
        Temperature: '', Humidity: '', Moisture: '', Soil_Type: '', Crop_Type: '', Nitrogen: '', Potassium: '', Phosphorous: ''
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
                Temperature: parseFloat(formData.Temperature),
                Humidity: parseFloat(formData.Humidity),
                Moisture: parseFloat(formData.Moisture),
                "Soil Type": formData.Soil_Type,
                "Crop Type": formData.Crop_Type,
                Nitrogen: parseFloat(formData.Nitrogen),
                Potassium: parseFloat(formData.Potassium),
                Phosphorous: parseFloat(formData.Phosphorous)
            };
            const response = await predictFertilizer(data);
            setResult(response.recommendation);
        } catch (err) {
            setError("Failed to get recommendation. Check inputs or server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <span className="text-blue-600">Fertilizer</span> Advisor
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Find the right fertilizer to boost your yield.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Temperature" name="Temperature" value={formData.Temperature} onChange={handleChange} />
                            <InputField label="Humidity" name="Humidity" value={formData.Humidity} onChange={handleChange} />
                            <InputField label="Moisture" name="Moisture" value={formData.Moisture} onChange={handleChange} />
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                                <select name="Soil_Type" value={formData.Soil_Type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" required>
                                    <option value="">Select Soil Type</option>
                                    <option value="Sandy">Sandy</option>
                                    <option value="Loamy">Loamy</option>
                                    <option value="Black">Black</option>
                                    <option value="Red">Red</option>
                                    <option value="Clayey">Clayey</option>
                                </select>
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                <select name="Crop_Type" value={formData.Crop_Type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" required>
                                    <option value="">Select Crop Type</option>
                                    <option value="Maize">Maize</option>
                                    <option value="Sugarcane">Sugarcane</option>
                                    <option value="Cotton">Cotton</option>
                                    <option value="Tobacco">Tobacco</option>
                                    <option value="Paddy">Paddy</option>
                                    <option value="Barley">Barley</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Millets">Millets</option>
                                    <option value="Oil seeds">Oil seeds</option>
                                    <option value="Pulses">Pulses</option>
                                    <option value="Ground Nuts">Ground Nuts</option>
                                </select>
                            </div>
                            <InputField label="Nitrogen" name="Nitrogen" value={formData.Nitrogen} onChange={handleChange} />
                            <InputField label="Potassium" name="Potassium" value={formData.Potassium} onChange={handleChange} />
                            <InputField label="Phosphorous" name="Phosphorous" value={formData.Phosphorous} onChange={handleChange} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <><Loader className="animate-spin h-5 w-5" /> Processing...</> : "Get Recommendation"}
                        </button>
                    </form>
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
                        className="mt-8 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white text-center shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold mb-2">Recommended Fertilizer</h3>
                        <div className="text-4xl font-extrabold flex justify-center items-center gap-3">
                            <CloudRain className="h-10 w-10" /> {result}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="number"
            name={name}
            required
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-gray-50 focus:bg-white"
        />
    </div>
);

export default FertilizerRecommendation;
