import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { Button } from "@/components/ui/button"
import { usePredictionStore } from '../stores/predictionStore'
import { AnimatedButton } from './AnimatedButton'

function useWithdrawBet() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const withdrawBet = async (betOnA: boolean) => {
    try {
      const result = await writeContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'withdrawBet',
        args: [betOnA],
      })
      console.log('Transaction submitted:', result)
    } catch (err) {
      console.error('Failed to withdraw bet:', err)
    }
  }

  return { withdrawBet, isPending, isConfirming, isConfirmed, error }
}

export function WithdrawBet() {
  const [betOnA, setBetOnA] = useState(true)
  const { withdrawBet, isPending, isConfirming, isConfirmed, error } = useWithdrawBet()
  const updateTotalBets = usePredictionStore(state => state.updateTotalBets)

  const handleWithdrawBet = async () => {
    await withdrawBet(betOnA)
    if (isConfirmed) {
      updateTotalBets(betOnA, -parseFloat("0")) // Replace "0" with the actual bet amount
    }
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Withdraw Bet</h2>
      <p className="text-black">Select which AI you bet on:</p>
      <div className="flex justify-between">
        <Button onClick={() => setBetOnA(true)} variant={betOnA ? "default" : "outline"}>AI A</Button>
        <Button onClick={() => setBetOnA(false)} variant={!betOnA ? "default" : "outline"}>AI B</Button>
      </div>
      {isConfirmed ? (
        <AnimatedButton onClick={() => {}} className="w-full">
          Bet Withdrawn Successfully!
        </AnimatedButton>
      ) : (
        <Button onClick={handleWithdrawBet} disabled={isPending || isConfirming} className="w-full">
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Withdraw Bet'}
        </Button>
      )}
      {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
    </div>
  )
}
