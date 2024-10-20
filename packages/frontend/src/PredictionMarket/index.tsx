


// add a progress bar to the center with an input at the bottom and a button next to that
// expose the button function to a handleClick
// Add two pillar(/pillar.png) on either side and have them in the background going from the top to bottom max view height. 
// Add a modal component for when the button is clicked and the modal should have the background of scroll.gif and have that gif play once and stop at the end. 

import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollModal } from "./ScrollModal";
import { PlaceBet } from "./CreateMarket";
import { ClaimReward } from "./ClaimReward";
import { WithdrawBet } from "./WithdrawBet";
import { usePredictionStore } from '../stores/predictionStore';

export default function PredictionMarket() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getOdds } = usePredictionStore();

    const { oddsA } = getOdds();
    const progress = Math.round(oddsA * 100);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* Main Content */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">AI Prediction Market</h1>
                <p className="mb-4 text-center text-black">Bet on which AI model will perform better!</p>
                
                {/* Odds Display */}
                <div className="mb-6">
                    <div className="h-8 w-full flex rounded-full overflow-hidden">
                        <motion.div
                            className="h-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                                boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.5)'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="h-full"
                            style={{
                                width: `${100 - progress}%`,
                                background: 'linear-gradient(90deg, #8B0000, #B22222)',
                                boxShadow: '0 0 10px 2px rgba(139, 0, 0, 0.5)'
                            }}
                            initial={{ width: `${100 - progress}%` }}
                            animate={{ width: `${100 - progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <p className="mt-2 text-center text-black">Current Odds - AI A: {progress}% | AI B: {100 - progress}%</p>
                </div>

                {/* Betting Components */}
                <PlaceBet />
                <ClaimReward />
                <WithdrawBet />
            </div>

            {/* ScrollModal - Kept for future use */}
            <ScrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p className="text-center">Modal content goes here</p>
            </ScrollModal>
        </div>
    );
}
