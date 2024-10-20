import { createLazyFileRoute } from '@tanstack/react-router'
import BattleBots from '@/BattleBots'

export const Route = createLazyFileRoute('/battleBots')({
    component: BattleBotsRoute,
})

function BattleBotsRoute() {
    return <BattleBots />
}     