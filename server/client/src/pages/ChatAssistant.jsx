import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/api';
import { Send, Bot, User, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your AgriSmart Assistant. Ask me about crops, fertilizers, or diseases.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await chatWithAI(input);
            const botMessage = { role: 'bot', text: response.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to the server." }]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
                <div className="bg-primary p-4 text-white flex items-center gap-3 shadow-md z-10">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">AgriSmart AI</h2>
                        <p className="text-xs text-green-100">Always here to help</p>
                    </div>
                </div>

                <div className="flex-grow p-6 overflow-y-auto bg-gray-50 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                                        {msg.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                                        <span>{msg.role === 'user' ? 'You' : 'Assistant'}</span>
                                    </div>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-gray-500">
                                <Bot className="h-4 w-4" />
                                <span className="flex gap-1">
                                    <span className="animate-bounce">.</span>
                                    <span className="animate-bounce delay-100">.</span>
                                    <span className="animate-bounce delay-200">.</span>
                                </span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSend} className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about crops, fertilizers, or diseases..."
                            className="flex-grow px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="p-3 bg-primary text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center w-12"
                        >
                            {loading ? <Loader className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatAssistant;
