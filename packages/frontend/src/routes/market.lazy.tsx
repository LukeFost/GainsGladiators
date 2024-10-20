import MarketPlace from '@/MarketPlace';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'


export const Route = createLazyFileRoute('/market')({
  component: MarketRoute,
})

function MarketRoute() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    const storyProtocolChainId = 1513
    if (chain?.id !== storyProtocolChainId) {
      switchNetwork?.(storyProtocolChainId)
    }
  }, [chain, switchNetwork])

  return <MarketPlace />;
}
