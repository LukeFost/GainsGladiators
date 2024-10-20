import { createLazyFileRoute } from '@tanstack/react-router'
import PredictionMarket from '@/PredictionMarket'
import { useEffect } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'

export const Route = createLazyFileRoute('/predictionMarket')({
    component: PredictionMarketRoute,
})

function PredictionMarketRoute() {
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()

    useEffect(() => {
        // Flow Test net chain ID (assuming it's 1001, please verify this)
        const flowTestnetChainId = 1001
        if (chain?.id !== flowTestnetChainId) {
            switchNetwork?.(flowTestnetChainId)
        }
    }, [chain, switchNetwork])

    return <PredictionMarket />
}
