import { createLazyFileRoute } from '@tanstack/react-router'
import AIAgentCreationWithAnimation from '@/aiAgentCreation'

export const Route = createLazyFileRoute('/aiAgentCreation')({
    component: AIAgentCreationRoute,
})

function AIAgentCreationRoute() {
    return <AIAgentCreationWithAnimation />
}         