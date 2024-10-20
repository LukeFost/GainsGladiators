import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePredictionStore } from '../stores/predictionStore'

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
      // Assuming the bet amount is stored somewhere and can be retrieved
      // You might need to adjust this part based on your actual implementation
      updateTotalBets(betOnA, -parseFloat("0")) // Replace "0" with the actual bet amount
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Withdraw Bet</CardTitle>
        <CardDescription>Withdraw your bet before the market is settled</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <p>Select which AI you bet on:</p>
          <div>
            <Button onClick={() => setBetOnA(true)} variant={betOnA ? "default" : "outline"}>AI A</Button>
            <Button onClick={() => setBetOnA(false)} variant={!betOnA ? "default" : "outline"}>AI B</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button onClick={handleWithdrawBet} disabled={isPending || isConfirming}>
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Withdraw Bet'}
        </Button>
        {isConfirmed && <p className="mt-2 text-green-600">Bet withdrawn successfully!</p>}
        {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
      </CardFooter>
    </Card>
  )
}
