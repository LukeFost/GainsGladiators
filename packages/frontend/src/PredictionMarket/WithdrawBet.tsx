import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { Button } from "@/components/ui/button"
import { usePredictionStore } from '../stores/predictionStore'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [showAnimation, setShowAnimation] = useState(false)
  const { withdrawBet, isPending, isConfirming, isConfirmed, error } = useWithdrawBet()
  const updateTotalBets = usePredictionStore(state => state.updateTotalBets)

  useEffect(() => {
    if (isPending || isConfirming) {
      setShowAnimation(true)
    } else {
      const timer = setTimeout(() => {
        setShowAnimation(false)
      }, 2000) // Adjust this value to match the duration of your GIF
      return () => clearTimeout(timer)
    }
  }, [isPending, isConfirming])

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
      <Button onClick={handleWithdrawBet} disabled={isPending || isConfirming} className="w-full">
        {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Withdraw Bet'}
      </Button>
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center mt-4"
          >
            <img src="/Thumbdownnormal.gif" alt="Withdraw Animation" className="w-64 h-64" />
          </motion.div>
        )}
      </AnimatePresence>
      {isConfirmed && <p className="mt-2 text-green-600">Bet withdrawn successfully!</p>}
      {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
    </div>
  )
}
