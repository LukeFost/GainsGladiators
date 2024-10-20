import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useBalance, useAccount, useReadContract } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { parseEther, formatEther } from 'viem'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { usePredictionStore } from '../stores/predictionStore'
import { erc20Address, mockerc20ABI } from '../abi/mockerc20ABI'

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
  const [tokenApproval, setTokenApproval] = useState('0')
  const { placeBet, isPending, isConfirming, isConfirmed, error } = usePlaceBet()
  const updateTotalBets = usePredictionStore(state => state.updateTotalBets)
  const { writeContract } = useWriteContract()
  const { address: userAddress } = useAccount()

  const { data: balance } = useBalance({
    address: userAddress,
    token: erc20Address,
  })

  // Read current token approval
  const { data: currentApproval } = useReadContract({
    address: erc20Address,
    abi: mockerc20ABI,
    functionName: 'allowance',
    args: [userAddress, predictAddress],
  })

  useEffect(() => {
    if (currentApproval) {
      setTokenApproval(formatEther(currentApproval))
    }
  }, [currentApproval])

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
      // Approve the contract to spend tokens if needed
      if (parseEther(amount) > currentApproval) {
        await writeContract({
          address: erc20Address,
          abi: mockerc20ABI,
          functionName: 'approve',
          args: [predictAddress, parseEther(amount)],
        })
      }

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

  const handleMintTokens = async () => {
    try {
      await writeContract({
        address: erc20Address,
        abi: mockerc20ABI,
        functionName: 'mint',
        args: [userAddress, parseEther('100')], // Minting 100 tokens
      })
      alert('100 tokens minted successfully!')
    } catch (err) {
      console.error('Error minting tokens:', err)
      alert('Failed to mint tokens. Please try again.')
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
                variant={betOnA ? "default" : "outline"}
              >
                AI Model A
              </Button>
              <Button 
                onClick={() => setBetOnA(false)} 
                variant={!betOnA ? "default" : "outline"}
              >
                AI Model B
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <p>Current Balance: {balance ? formatEther(balance.value) : '0'} tokens</p>
            <p>Current Approval: {tokenApproval} tokens</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button 
          onClick={handlePlaceBet} 
          disabled={isPending || isConfirming || !amount}
          className="w-full mb-2"
        >
          {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : `Place Bet on ${betOnA ? 'AI Model A' : 'AI Model B'}`}
        </Button>
        <Button 
          onClick={handleMintTokens} 
          className="w-full"
        >
          Mint 100 Tokens
        </Button>
        {isConfirmed && <p className="mt-2 text-green-600">Bet placed successfully!</p>}
        {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
      </CardFooter>
    </Card>
  )
}
