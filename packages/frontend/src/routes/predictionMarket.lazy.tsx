import { createLazyFileRoute } from '@tanstack/react-router'
import PredictionMarket from '@/PredictionMarket'

export const Route = createLazyFileRoute('/predictionMarket')({
    component: PredictionMarketRoute,
})

function PredictionMarketRoute() {
    return <PredictionMarket />
}