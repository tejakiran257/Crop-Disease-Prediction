import React, { useState } from 'react';
import { Upload, X, Scan, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const DiseaseDetection = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const clearImage = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    const analyzeImage = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/api/predict/disease', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze image');
            }

            setResult(data.analysis);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Plant Disease Detection</h2>
                    <p className="mt-2 text-gray-600">Upload a photo of your plant leaf to identify diseases and get treatment advice.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors h-80 ${preview ? 'border-primary bg-green-50' : 'border-gray-300 hover:border-primary'}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <AnimatePresence mode="wait">
                                {preview ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="relative w-full h-full flex items-center justify-center"
                                    >
                                        <img src={preview} alt="Plant Preview" className="max-h-full max-w-full rounded-lg object-contain" />
                                        <button
                                            onClick={clearImage}
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 text-red-500"
                                        >
                                            <X size={20} />
                                        </button>

                                        {loading && (
                                            <div className="absolute inset-0 bg-black/40 rounded-lg flex flex-col items-center justify-center text-white backdrop-blur-sm">
                                                <Scan className="animate-pulse w-12 h-12 mb-2" />
                                                <span className="font-semibold">Analyzing...</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                            <Upload size={32} />
                                        </div>
                                        <p className="text-lg font-medium text-gray-700">Drag & drop your image here</p>
                                        <p className="text-sm text-gray-500 mt-2 mb-4">or</p>
                                        <label className="cursor-pointer bg-primary hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                                            Browse Files
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!loading && preview && !result && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={analyzeImage}
                                className="w-full mt-4 bg-primary hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Identify Disease
                            </motion.button>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[300px] flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <CheckCircle className="mr-2 text-primary" size={24} />
                            Analysis Report
                        </h3>

                        <div className="flex-grow bg-gray-50 rounded-xl p-4 overflow-y-auto">
                            {loading ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-32 bg-gray-200 rounded w-full mt-4"></div>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-full text-red-500">
                                    <AlertCircle size={48} className="mb-4" />
                                    <p className="text-center font-semibold">{error}</p>
                                    <p className="text-sm text-center mt-2 text-gray-500">Please try again with a clearer image.</p>
                                </div>
                            ) : result ? (
                                <div className="prose prose-emerald max-w-none">
                                    <ReactMarkdown>{result}</ReactMarkdown>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Scan size={48} className="mb-4 opacity-50" />
                                    <p>Upload an image to see the diagnostic report here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;
