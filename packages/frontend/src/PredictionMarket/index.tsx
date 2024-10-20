import { useState } from "react";
import { ScrollModal } from "./ScrollModal";
import { PlaceBet } from "./CreateMarket";
import { ClaimReward } from "./ClaimReward";
import { WithdrawBet } from "./WithdrawBet";
import { usePredictionStore } from '../stores/predictionStore';
import { useReadContract } from 'wagmi';
import { predictABI, predictAddress } from '../abi/predictionABI';
import { Button } from "@/components/ui/button";
import { MintTokens } from "./MintTokens";
import { SwordsAnimation } from "./SwordsAnimation";

export default function PredictionMarket() {
    const [isPlaceBetModalOpen, setIsPlaceBetModalOpen] = useState(false);
    const [isClaimRewardModalOpen, setIsClaimRewardModalOpen] = useState(false);
    const [isWithdrawBetModalOpen, setIsWithdrawBetModalOpen] = useState(false);
    const { getOdds } = usePredictionStore();

    const { data: contractOdds, isError, isLoading } = useReadContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'getOdds',
    });

    const { oddsA, oddsB } = getOdds();
    
    const totalOdds = contractOdds ? Number(contractOdds[0]) + Number(contractOdds[1]) : 0;
    const progress = totalOdds > 0 ? Math.round((Number(contractOdds[0]) / totalOdds) * 100) : 50;

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-24">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl relative overflow-visible">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <SwordsAnimation />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center text-black mt-16">AI Prediction Market</h1>
                <p className="mb-4 text-center text-black">Bet on which AI model will perform better!</p>
                
                <div className="mb-6">
                    <div className="h-8 w-full flex rounded-full overflow-hidden">
                        <div
                            className="h-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                                boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.5)'
                            }}
                        />
                        <div
                            className="h-full"
                            style={{
                                width: `${100 - progress}%`,
                                background: 'linear-gradient(90deg, #8B0000, #B22222)',
                                boxShadow: '0 0 10px 2px rgba(139, 0, 0, 0.5)'
                            }}
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
                         `Raw Odds - AI A: ${contractOdds ? contractOdds[0] : 'N/A'} | AI B: ${contractOdds ? contractOdds[1] : 'N/A'}`}
                    </p>
                </div>

                <MintTokens />

                <div className="space-y-4">
                    <Button onClick={() => setIsPlaceBetModalOpen(true)} className="w-full">
                        Place Your Bet
                    </Button>
                    <Button onClick={() => setIsClaimRewardModalOpen(true)} className="w-full">
                        Claim Reward
                    </Button>
                    <Button onClick={() => setIsWithdrawBetModalOpen(true)} className="w-full">
                        Withdraw Bet
                    </Button>
                </div>
            </div>

            <ScrollModal isOpen={isPlaceBetModalOpen} onClose={() => setIsPlaceBetModalOpen(false)}>
                <PlaceBet />
            </ScrollModal>

            <ScrollModal isOpen={isClaimRewardModalOpen} onClose={() => setIsClaimRewardModalOpen(false)}>
                <ClaimReward />
            </ScrollModal>

            <ScrollModal isOpen={isWithdrawBetModalOpen} onClose={() => setIsWithdrawBetModalOpen(false)}>
                <WithdrawBet />
            </ScrollModal>
        </div>
    );
}
