import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'

function useClaimReward() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const claimReward = async () => {
    try {
      const result = await writeContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'claimReward',
      })
      console.log('Transaction submitted:', result)
    } catch (err) {
      console.error('Failed to claim reward:', err)
    }
  }

  return { claimReward, isPending, isConfirming, isConfirmed, error }
}

export function ClaimReward() {
  const { claimReward, isPending, isConfirming, isConfirmed, error } = useClaimReward()
  const [showAnimation, setShowAnimation] = useState(false)

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

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Claim Reward</h2>
      <p className="text-black">Click the button below to claim your reward if you've won.</p>
      <Button onClick={claimReward} disabled={isPending || isConfirming} className="w-full">
        {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Claim Reward'}
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
            <img src="/Thumbupnormal.gif" alt="Claim Animation" className="w-32 h-32" />
          </motion.div>
        )}
      </AnimatePresence>
      {isConfirmed && <p className="mt-2 text-green-600">Reward claimed successfully!</p>}
      {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
    </div>
  )
}
