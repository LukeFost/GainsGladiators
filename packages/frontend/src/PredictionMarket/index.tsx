


// add a progress bar to the center with an input at the bottom and a button next to that
// expose the button function to a handleClick
// Add two pillar(/pillar.png) on either side and have them in the background going from the top to bottom max view height. 
// Add a modal component for when the button is clicked and the modal should have the background of scroll.gif and have that gif play once and stop at the end. 

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { toast } from 'react-toastify';
import { ScrollModal } from "./ScrollModal";

export default function PredictionMarket() {
    const [progress, setProgress] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSign = useCallback(() => {
        toast.success("Signed successfully!");
        setIsModalOpen(false);
    }, []);

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
        // Simulate progress increase
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Background Pillars */}
            <div className="absolute inset-y-0 left-0 w-24 h-screen">
                <img src="/pillar.png" alt="Left Pillar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-y-0 right-0 w-24 h-screen">
                <img src="/pillar.png" alt="Right Pillar" className="w-full h-full object-cover" />
            </div>

            {/* Main Content */}
            <div className="z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="mb-6">
                    <div className="h-4 w-full bg-gray-200 rounded-full">
                        <motion.div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${progress}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <p className="mt-2 text-center">{progress}%</p>
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter text..."
                    />
                    <button
                        onClick={handleClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* ScrollModal */}
            <ScrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p className="text-center">Your input: {inputValue}</p>
                <button 
                    onClick={handleSign}
                    className="mt-4 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Sign Here
                </button>
            </ScrollModal>
        </div>
    );
}
