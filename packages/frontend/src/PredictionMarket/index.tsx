


// add a progress bar to the center with an input at the bottom and a button next to that
// expose the button function to a handleClick
// Add two pillar(/pillar.png) on either side and have them in the background going from the top to bottom max view height. 
// Add a modal component for when the button is clicked and the modal should have the background of scroll.gif and have that gif play once and stop at the end. 

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { ScrollModal } from "./ScrollModal";
import { AnimatedButton } from "./AnimatedButton";
import { PlaceBet } from "./CreateMarket";
import { ClaimReward } from "./ClaimReward";
import { WithdrawBet } from "./WithdrawBet";
import { usePredictionStore } from '../stores/predictionStore';

export default function PredictionMarket() {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getOdds } = usePredictionStore();

    const { oddsA } = getOdds();
    const progress = Math.round(oddsA * 100);

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleSign = useCallback(() => {
        console.log("I was signed")
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* Main Content */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
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
                    <p className="mt-2 text-center">AI A: {progress}% | AI B: {100 - progress}%</p>
                </div>
                <PlaceBet />
                <ClaimReward />
                <WithdrawBet />
            </div>

            {/* ScrollModal */}
            <ScrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p className="text-center">Your input: {inputValue}</p>
                <AnimatedButton 
                    onClick={handleSign}
                    className="mt-4 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Sign Here
                </AnimatedButton>
            </ScrollModal>
        </div>
    );
}
