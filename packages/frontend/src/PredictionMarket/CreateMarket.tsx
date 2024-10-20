import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { parseEther } from 'viem'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { usePredictionStore } from '../stores/predictionStore'
import { erc20ABI } from 'wagmi'

// Assuming this is defined elsewhere in your project
import { betTokenAddress } from '../abi/predictionABI'

function usePlaceBet() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const placeBet = async (amount: string, betOnA: boolean) => {
    try {
      const result = await writeContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'placeBet',
        args: [parseEther(amount), betOnA],
      })
      console.log('Transaction submitted:', result)
    } catch (err) {
      console.error('Failed to place bet:', err)
      if (err instanceof Error) {
        if (err.message.includes('0xfb8f41b2')) {
          alert('Token transfer failed. Please ensure you have sufficient balance and have approved the contract to spend your tokens.')
        } else if (err.message.includes('Market already settled')) {
          alert('The market has already been settled.')
        } else if (err.message.includes('Amount must be greater than zero')) {
          alert('The bet amount must be greater than zero.')
        } else {
          alert('An error occurred while placing the bet. Please try again.')
        }
      }
    }
  }

  return { placeBet, isPending, isConfirming, isConfirmed, error }
}

export function PlaceBet() {
  const [amount, setAmount] = useState('')
  const [betOnA, setBetOnA] = useState(true)
  const { placeBet, isPending, isConfirming, isConfirmed, error } = usePlaceBet()
  const updateTotalBets = usePredictionStore(state => state.updateTotalBets)
  const { writeContract } = useWriteContract()

  // Assuming you have a way to get the user's address
  const userAddress = '0x...' // Replace with actual user address

  const { data: balance } = useBalance({
    address: userAddress,
    token: betTokenAddress,
  })

  const handlePlaceBet = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid bet amount")
      return
    }

    if (balance && parseEther(amount) > balance.value) {
      alert("Insufficient balance to place this bet")
      return
    }

    try {
      // Approve the contract to spend tokens
      await writeContract({
        address: betTokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [predictAddress, parseEther(amount)],
      })

      // Place the bet
      await placeBet(amount, betOnA)
      if (isConfirmed) {
        updateTotalBets(betOnA, parseFloat(amount))
      }
    } catch (err) {
      console.error('Error in handlePlaceBet:', err)
      alert('Failed to approve tokens or place bet. Please try again.')
    }
  }

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>Place Your Bet</CardTitle>
        <CardDescription>Choose an AI model and place your bet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amount">Bet Amount (in ETH)</Label>
            <Input 
              id="amount" 
              placeholder="Enter amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Choose AI Model</Label>
            <div className="flex justify-between">
              <Button 
                onClick={() => setBetOnA(true)} 
                variant="default"
                className={`w-[48%] ${betOnA ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg' : 'bg-gray-200 text-gray-700'}`}
              >
                AI Model A
              </Button>
              <Button 
                onClick={() => setBetOnA(false)} 
                variant="default"
                className={`w-[48%] ${!betOnA ? 'bg-gradient-to-r from-red-700 to-red-900 shadow-lg' : 'bg-gray-200 text-gray-700'}`}
              >
                AI Model B
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button 
          onClick={handlePlaceBet} 
          disabled={isPending || isConfirming || !amount}
          className="w-full"
        >
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : `Place Bet on ${betOnA ? 'AI Model A' : 'AI Model B'}`}
        </Button>
        {isConfirmed && <p className="mt-2 text-green-600">Bet placed successfully!</p>}
        {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
      </CardFooter>
    </Card>
  )
}
