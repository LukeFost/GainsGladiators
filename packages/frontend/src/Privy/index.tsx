"use client"

import { useState, useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function Component() {
  const { ready, authenticated, login, user } = usePrivy()
  const { wallets } = useWallets()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const targetChainId = 11155111 // Sepolia testnet

  useEffect(() => {
    if (ready && authenticated && wallets.length > 0) {
      checkAndSwitchNetwork()
    }
  }, [ready, authenticated, wallets])

  const checkAndSwitchNetwork = async () => {
    if (wallets.length === 0) return

    const wallet = wallets[0]
    const currentChainId = parseInt(wallet.chainId.split(':')[1])

    if (currentChainId !== targetChainId) {
      try {
        await wallet.switchChain(targetChainId)
      } catch (error) {
        setError("Failed to switch network. Please switch to Sepolia manually.")
      }
    }
  }

  const handleConnect = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (!authenticated) {
        await login()
      }
      await checkAndSwitchNetwork()
    } catch (error) {
      setError("An error occurred while connecting. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!ready) {
    return <Button disabled>Loading...</Button>
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleConnect} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {authenticated ? 'Switch Network' : 'Connect Wallet'}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {authenticated && user && (
        <Alert>
          <AlertTitle>Connected</AlertTitle>
          <AlertDescription>Welcome, {user.id}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}