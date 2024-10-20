import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Claim Reward</CardTitle>
        <CardDescription>Claim your winnings after the market is settled</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Click the button below to claim your reward if you've won.</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button onClick={claimReward} disabled={isPending || isConfirming}>
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Claim Reward'}
        </Button>
        {isConfirmed && <p className="mt-2 text-green-600">Reward claimed successfully!</p>}
        {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
      </CardFooter>
    </Card>
  )
}
