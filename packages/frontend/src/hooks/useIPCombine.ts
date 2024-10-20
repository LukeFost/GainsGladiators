import { useState, useCallback } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { ipcombineAddress, ipcombineABI } from '@/abi/ipcombineABI'
import { erc20Address, mockerc20ABI } from '@/abi/mockerc20ABI'

export function useIPCombine() {
  const [isApproved, setIsApproved] = useState(false)
  const { address } = useAccount()
  const { writeContract: writeIPCombine, data: ipHash } = useWriteContract()
  const { writeContract: writeERC20, data: erc20Hash } = useWriteContract()

  const { isLoading: isIPConfirming, isSuccess: isIPConfirmed } = useWaitForTransactionReceipt({ hash: ipHash })
  const { isLoading: isERC20Confirming, isSuccess: isERC20Confirmed } = useWaitForTransactionReceipt({ hash: erc20Hash })

  const approve = useCallback(async () => {
    try {
      await writeERC20({
        address: erc20Address,
        abi: mockerc20ABI,
        functionName: 'approve',
        args: [ipcombineAddress, parseEther('100')],
      })
      if (isERC20Confirmed) setIsApproved(true)
    } catch (err) {
      console.error('Failed to approve:', err)
    }
  }, [writeERC20, isERC20Confirmed])

  const mintIp = useCallback(async (prompt: string) => {
    try {
      const result = await writeIPCombine({
        address: ipcombineAddress,
        abi: ipcombineABI,
        functionName: 'mintIp',
        args: [prompt],
      })
      return result
    } catch (err) {
      console.error('Failed to mint IP:', err)
    }
  }, [writeIPCombine])

  const mintLicense = useCallback(async (ipId: string, tokenId: number, ltAmount: number) => {
    try {
      const result = await writeIPCombine({
        address: ipcombineAddress,
        abi: ipcombineABI,
        functionName: 'mintLicenseTokenMin',
        args: [ipId, tokenId, ltAmount, address],
      })
      return result
    } catch (err) {
      console.error('Failed to mint license:', err)
    }
  }, [writeIPCombine, address])

  const mintTokens = useCallback(async (amount: number) => {
    try {
      await writeERC20({
        address: erc20Address,
        abi: mockerc20ABI,
        functionName: 'mint',
        args: [address, parseEther(amount.toString())],
      })
    } catch (err) {
      console.error('Failed to mint tokens:', err)
    }
  }, [writeERC20, address])

  return {
    approve,
    mintIp,
    mintLicense,
    mintTokens,
    isApproved,
    isIPConfirming,
    isIPConfirmed,
    isERC20Confirming,
    isERC20Confirmed,
  }
}
