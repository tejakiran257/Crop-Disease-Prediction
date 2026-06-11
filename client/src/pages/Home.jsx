import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, CloudRain, ShieldCheck, Cpu } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
                        >
                            Smart Farming with <span className="text-primary">AI</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
                        >
                            Get real-time crop recommendations, fertilizer advice, and disease detection powered by advanced Machine Learning.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-10 flex justify-center gap-4"
                        >
                            <Link to="/dashboard" className="px-8 py-3 rounded-full bg-primary text-white font-bold text-lg hover:bg-emerald-600 transition-shadow shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Get Started
                            </Link>
                            <Link to="/chat" className="px-8 py-3 rounded-full bg-white text-primary border border-primary font-bold text-lg hover:bg-green-50 transition-shadow shadow-sm hover:shadow-md">
                                Ask AI Assistant
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-3xl" />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<Sprout className="h-8 w-8 text-primary" />}
                            title="Crop Recommendation"
                            description="Analyze soil and weather data to choose the most profitable crop."
                        />
                        <FeatureCard
                            icon={<CloudRain className="h-8 w-8 text-blue-500" />}
                            title="Fertilizer Guide"
                            description="Get precise fertilizer amounts for optimal growth and cost saving."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="h-8 w-8 text-red-500" />}
                            title="Disease Detection"
                            description="Upload leaf photos to instantly identify diseases and treatments."
                        />
                        <FeatureCard
                            icon={<Cpu className="h-8 w-8 text-purple-500" />}
                            title="AI Assistant"
                            description="Chat with our intelligent agent for any farming queries."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-all"
    >
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export default Home;
