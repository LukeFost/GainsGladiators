import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from "@/components/ui/button"
import { mockerc20ABI } from '@/abi/mockerc20ABI'

// Replace with your actual NFT contract ABI and address
const nftAddress = '0x0987654321098765432109876543210987654321' // Replace with actual NFT contract address

export function MintButton({ tokenId }: { tokenId: number }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const { writeContract, data: hash } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleMint = async () => {
    setIsLoading(true)
    try {
      await writeContract({
        address: nftAddress,
        abi: mockerc20ABI,
        functionName: 'mint',
        args: [await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => accounts[0]), BigInt(tokenId)],
      })
    } catch (error) {
      console.error('Failed to mint:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleMint} 
      disabled={isLoading || isConfirming}
    >
      {isLoading || isConfirming ? 'Minting...' : isConfirmed ? 'Minted' : 'Mint'}
    </Button>
  )
}
