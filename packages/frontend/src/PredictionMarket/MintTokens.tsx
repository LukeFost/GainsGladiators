import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from "@/components/ui/button"
import { erc20Address, mockerc20ABI } from '../abi/mockerc20ABI'

export function MintTokens() {
  const [isMinting, setIsMinting] = useState(false)
  const { writeContract } = useWriteContract()
  const { address: userAddress } = useAccount()

  const handleMintTokens = async () => {
    if (!userAddress) {
      alert('Please connect your wallet first.')
      return
    }

    setIsMinting(true)
    try {
      await writeContract({
        address: erc20Address,
        abi: mockerc20ABI,
        functionName: 'transfer',
        args: [userAddress, parseEther('100')], // Minting 100 tokens
      })
      alert('100 tokens minted successfully!')
    } catch (err) {
      console.error('Error minting tokens:', err)
      alert('Failed to mint tokens. Please try again.')
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <Button 
      onClick={handleMintTokens} 
      disabled={isMinting}
      className="w-full mb-4"
    >
      {isMinting ? 'Minting...' : 'Mint 100 Tokens'}
    </Button>
  )
}
