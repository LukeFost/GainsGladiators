import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useBalance, useAccount, useReadContract } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'
import { parseEther, formatEther } from 'viem'
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

function useApproveTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const approveTokens = async (amount: string) => {
    try {
      const result = await writeContract({
        address: erc20Address,
        abi: mockerc20ABI,
        functionName: 'approve',
        args: [predictAddress, parseEther(amount)],
      })
      console.log('Approval transaction submitted:', result)
    } catch (err) {
      console.error('Failed to approve tokens:', err)
      alert('Failed to approve tokens. Please try again.')
    }
  }

  return { approveTokens, isPending, isConfirming, isConfirmed, error }
}

export function PlaceBet() {
  const [amount, setAmount] = useState('')
  const [betOnA, setBetOnA] = useState(true)
  const [tokenApproval, setTokenApproval] = useState('0')
  const { placeBet, isPending: isBetPending, isConfirming: isBetConfirming, isConfirmed: isBetConfirmed, error: betError } = usePlaceBet()
  const { approveTokens, isPending: isApprovePending, isConfirming: isApproveConfirming, isConfirmed: isApproveConfirmed, error: approveError } = useApproveTokens()
  const updateTotalBets = usePredictionStore(state => state.updateTotalBets)
  const { address: userAddress } = useAccount()

  const { data: balance } = useBalance({
    address: userAddress,
    token: erc20Address,
  })

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

  const handleApproveTokens = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    await approveTokens(amount)
  }

  const handlePlaceBet = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid bet amount")
      return
    }

    if (balance && parseEther(amount) > balance.value) {
      alert("Insufficient balance to place this bet")
      return
    }

    if (parseEther(amount) > currentApproval) {
      alert("Please approve tokens before placing the bet")
      return
    }

    try {
      await placeBet(amount, betOnA)
      if (isBetConfirmed) {
        updateTotalBets(betOnA, parseFloat(amount))
      }
    } catch (err) {
      console.error('Error in handlePlaceBet:', err)
      alert('Failed to place bet. Please try again.')
    }
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Place Your Bet</h2>
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
      <Button 
        onClick={handleApproveTokens} 
        disabled={isApprovePending || isApproveConfirming || !amount}
        className="w-full mb-2"
      >
        {isApprovePending ? 'Approving...' : isApproveConfirming ? 'Confirming...' : 'Approve Tokens'}
      </Button>
      <Button 
        onClick={handlePlaceBet} 
        disabled={isBetPending || isBetConfirming || !amount || parseEther(amount) > currentApproval}
        className="w-full"
      >
        {isBetPending ? 'Submitting...' : isBetConfirming ? 'Confirming...' : `Place Bet on ${betOnA ? 'AI Model A' : 'AI Model B'}`}
      </Button>
      {isApproveConfirmed && <p className="mt-2 text-green-600">Tokens approved successfully!</p>}
      {isBetConfirmed && <p className="mt-2 text-green-600">Bet placed successfully!</p>}
      {approveError && <p className="mt-2 text-red-600">Approval Error: {approveError.message}</p>}
      {betError && <p className="mt-2 text-red-600">Bet Error: {betError.message}</p>}
    </div>
  )
}
