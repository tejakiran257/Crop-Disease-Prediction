import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold text-gray-800">Agriculture</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} AgriSmart AI. Empowering Farmers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
