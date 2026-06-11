import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Leaf className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-700">
                            Agriculture
                        </span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/crop-recommend">Crops</NavLink>
                            <NavLink to="/fertilizer-recommend">Fertilizer</NavLink>
                            <NavLink to="/chat">AI Assistant</NavLink>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                        <MobileNavLink to="/crop-recommend" onClick={() => setIsOpen(false)}>Crops</MobileNavLink>
                        <MobileNavLink to="/fertilizer-recommend" onClick={() => setIsOpen(false)}>Fertilizer</MobileNavLink>
                        <MobileNavLink to="/chat" onClick={() => setIsOpen(false)}>AI Assistant</MobileNavLink>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="text-gray-700 hover:text-primary hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="text-gray-700 hover:text-primary hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
    >
        {children}
    </Link>
);

export default Navbar;
