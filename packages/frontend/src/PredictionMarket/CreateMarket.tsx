import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { parseEther } from 'viem'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { usePredictionStore } from '../stores/predictionStore'

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
    }
  }

  return { placeBet, isPending, isConfirming, isConfirmed, error }
}

export function PlaceBet() {
  const [amount, setAmount] = useState('')
  const [betOnA, setBetOnA] = useState(true)
  const { placeBet, isPending, isConfirming, isConfirmed, error } = usePlaceBet()
  const updateTotalBets = usePredictionStore(state => state.updateTotalBets)

  const handlePlaceBet = async () => {
    await placeBet(amount, betOnA)
    if (isConfirmed) {
      updateTotalBets(betOnA, parseFloat(amount))
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Place Bet</CardTitle>
        <CardDescription>Bet on your preferred AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amount">Bet Amount</Label>
            <Input id="amount" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Choose AI</Label>
            <div>
              <Button onClick={() => setBetOnA(true)} variant={betOnA ? "default" : "outline"}>AI A</Button>
              <Button onClick={() => setBetOnA(false)} variant={!betOnA ? "default" : "outline"}>AI B</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button onClick={handlePlaceBet} disabled={isPending || isConfirming}>
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Place Bet'}
        </Button>
        {isConfirmed && <p className="mt-2 text-green-600">Bet placed successfully!</p>}
        {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
      </CardFooter>
    </Card>
  )
}
