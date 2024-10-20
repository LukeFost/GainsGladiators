import MarketPlace from '@/MarketPlace';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useWallets } from '@privy-io/react-auth'

export const Route = createLazyFileRoute('/market')({
  component: MarketRoute,
})

function MarketRoute() {
  const { wallets } = useWallets()

  useEffect(() => {
    const switchToStoryProtocol = async () => {
      if (wallets.length > 0) {
        const wallet = wallets[0]
        const storyProtocolChainId = 1513
        if (wallet.chainId !== `eip155:${storyProtocolChainId}`) {
          try {
            await wallet.switchChain(storyProtocolChainId)
          } catch (error) {
            console.error('Failed to switch network:', error)
          }
        }
      }
    }

    switchToStoryProtocol()
  }, [wallets])

  return <MarketPlace />;
}
