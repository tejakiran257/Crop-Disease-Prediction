import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CloudRain, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-gray-900"
                    >
                        Farmer's Dashboard
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-gray-600"
                    >
                        Access all your smart farming tools in one place.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <DashboardCard
                        to="/crop-recommend"
                        icon={<Sprout className="h-8 w-8 text-white" />}
                        title="Crop Recommendation"
                        description="Find the perfect crop for your soil and climate."
                        color="bg-emerald-500"
                    />
                    <DashboardCard
                        to="/fertilizer-recommend"
                        icon={<CloudRain className="h-8 w-8 text-white" />}
                        title="Fertilizer Advisor"
                        description="Optimize plant growth with the right nutrients."
                        color="bg-blue-500"
                    />
                    <DashboardCard
                        to="/chat"
                        icon={<Cpu className="h-8 w-8 text-white" />}
                        title="AI Assistant"
                        description="Get instant answers to your farming questions."
                        color="bg-purple-500"
                    />
                    <DashboardCard
                        to="/disease-detect"
                        icon={<ShieldCheck className="h-8 w-8 text-white" />}
                        title="Disease Detection"
                        description="Upload leaf images to identify diseases."
                        color="bg-red-500"
                    />
                </div>

                {/* Quick Stats or Weather Widget Placeholder */}
                <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Current Weather (Simulated)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <WeatherStat label="Temperature" value="28°C" />
                        <WeatherStat label="Humidity" value="65%" />
                        <WeatherStat label="Rainfall" value="12mm" />
                        <WeatherStat label="Wind" value="15 km/h" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ to, icon, title, description, color }) => (
    <Link to={to} className="block group">
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full transition-shadow hover:shadow-2xl"
        >
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center text-primary font-semibold group-hover:text-emerald-700">
                Access Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.div>
    </Link>
);

const WeatherStat = ({ label, value }) => (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
);

export default Dashboard;
