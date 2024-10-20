import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ScrollModal } from "./ScrollModal";
import { PlaceBet } from "./CreateMarket";
import { ClaimReward } from "./ClaimReward";
import { WithdrawBet } from "./WithdrawBet";
import { usePredictionStore } from '../stores/predictionStore';
import { useReadContract } from 'wagmi';
import { predictABI, predictAddress } from '../abi/predictionABI';

export default function PredictionMarket() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getOdds, setOdds } = usePredictionStore();

    const { data: contractOdds, isError, isLoading } = useReadContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'getOdds',
    });

    useEffect(() => {
        if (contractOdds) {
            const [oddsA, oddsB] = contractOdds;
            setOdds(Number(oddsA), Number(oddsB));
        }
    }, [contractOdds, setOdds]);

    const { oddsA, oddsB } = getOdds();
    const progress = oddsA ? Math.round((oddsA / (oddsA + oddsB)) * 100) : 50;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
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
                    <p className="mt-2 text-center text-black">
                        {isLoading ? "Loading odds..." : 
                         isError ? "Error fetching odds" : 
                         `Current Odds - AI A: ${progress}% | AI B: ${100 - progress}%`}
                    </p>
                    <p className="mt-2 text-center text-black">
                        {isLoading ? "" : 
                         isError ? "" : 
                         `Raw Odds - AI A: ${oddsA} | AI B: ${oddsB}`}
                    </p>
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
