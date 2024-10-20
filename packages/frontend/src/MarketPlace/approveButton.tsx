import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from "@/components/ui/button"

// Replace with your actual token contract ABI and address
const tokenAbi = [{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const tokenAddress = '0x1234567890123456789012345678901234567890' // Replace with actual token address

export function ApproveButton({ spender, amount }: { spender: `0x${string}`, amount: number }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const { writeContract, data: hash } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      await writeContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: 'approve',
        args: [spender, parseEther(amount.toString())],
      })
    } catch (error) {
      console.error('Failed to approve:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleApprove} 
      disabled={isLoading || isConfirming}
    >
      {isLoading || isConfirming ? 'Approving...' : isConfirmed ? 'Approved' : 'Approve'}
    </Button>
  )
}
