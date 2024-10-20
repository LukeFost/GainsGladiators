import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { parseEther } from 'viem'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

function useAddLiquidity() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const addLiquidity = async (key: any, amountEach: string) => {
    try {
      const result = await writeContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'customAddLiquidity',
        args: [key, parseEther(amountEach)],
      })
      console.log('Transaction submitted:', result)
    } catch (err) {
      console.error('Failed to add liquidity:', err)
    }
  }

  return { addLiquidity, isPending, isConfirming, isConfirmed, error }
}

export function CreateMarket() {
  const [key, setKey] = useState('')
  const [amountEach, setAmountEach] = useState('')
  const { addLiquidity, isPending, isConfirming, isConfirmed, error } = useAddLiquidity()

  const handleAddLiquidity = async () => {
    await addLiquidity(key, amountEach)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Liquidity</CardTitle>
        <CardDescription>Provide liquidity to the prediction market</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="key">Pool Key</Label>
            <Input id="key" placeholder="Enter pool key" value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amount">Amount Each</Label>
            <Input id="amount" placeholder="Enter amount" value={amountEach} onChange={(e) => setAmountEach(e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button onClick={handleAddLiquidity} disabled={isPending || isConfirming}>
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Add Liquidity'}
        </Button>
        {isConfirmed && <p className="mt-2 text-green-600">Liquidity added successfully!</p>}
        {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
      </CardFooter>
    </Card>
  )
}
