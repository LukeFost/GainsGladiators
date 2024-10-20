import { createLazyFileRoute } from '@tanstack/react-router'
import PredictionMarket from '@/PredictionMarket'
import { useEffect } from 'react'
import { useWallets } from '@privy-io/react-auth'

export const Route = createLazyFileRoute('/predictionMarket')({
    component: PredictionMarketRoute,
})

function PredictionMarketRoute() {
    const { wallets } = useWallets()

    useEffect(() => {
        const switchToFlowTestnet = async () => {
            if (wallets.length > 0) {
                const wallet = wallets[0]
                // Flow Test net chain ID (assuming it's 1001, please verify this)
                const flowTestnetChainId = 1001
                if (wallet.chainId !== `eip155:${flowTestnetChainId}`) {
                    try {
                        await wallet.switchChain(flowTestnetChainId)
                    } catch (error) {
                        console.error('Failed to switch network:', error)
                    }
                }
            }
        }

        switchToFlowTestnet()
    }, [wallets])

    return <PredictionMarket />
}
