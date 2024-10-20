import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const participatingBots = [
    "Meme Lord",
    "DeFi Lender",
    "Spectra Speculator"
]

export default function BattleBots() {
    const [botName, setBotName] = useState('')
    const [startingCapital, setStartingCapital] = useState('100')
    const [isJoining, setIsJoining] = useState(false)
    const [hasJoined, setHasJoined] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsJoining(true)
        // Simulate joining process
        setTimeout(() => {
            console.log('Joining battle with:', { botName, startingCapital })
            setHasJoined(true)
            setIsJoining(false)
        }, 2000)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto bg-[hsl(5,89%,47%)] text-card-foreground"> {/* Slightly darker red */}
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-foreground">Battle Bots</CardTitle>
            </CardHeader>
            <CardContent>
                <AnimatePresence mode="wait">
                    {!isJoining && !hasJoined ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-foreground">Battle Bot Week 2: 10/18 - 10/25</h2>
                                <Card className="bg-background text-foreground">
                                    <CardHeader className="bg-background">
                                        <CardTitle className="text-lg text-foreground">Participating</CardTitle>
                                    </CardHeader>
                                    <CardContent className="bg-background">
                                        <ul className="space-y-2">
                                            {participatingBots.map((bot, index) => (
                                                <li key={index} className="p-2 bg-foreground rounded-md text-background font-bold">{bot}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="botName" className="text-foreground">Enter Your BOT</Label>
                                    <Input
                                        id="botName"
                                        value={botName}
                                        onChange={(e) => setBotName(e.target.value)}
                                        placeholder="Enter your bot name"
                                        required
                                        className="bg-background text-foreground placeholder:text-muted-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startingCapital" className="text-foreground">Starting Capital</Label>
                                    <Input
                                        id="startingCapital"
                                        type="number"
                                        value={startingCapital}
                                        onChange={(e) => setStartingCapital(e.target.value)}
                                        className="bg-background text-foreground placeholder:text-muted-foreground"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className={cn(
                                        "w-full bg-foreground text-background",
                                        "hover:bg-foreground/90 hover:text-background",
                                        "border-2 border-border",
                                        "transition-colors duration-300"
                                    )}
                                >
                                    Join Battle
                                </Button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="animation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center space-y-6"
                        >
                            <div className="relative">
                                {isJoining && (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="w-40 h-40 border-4 border-foreground rounded-full border-t-transparent animate-spin" />
                                    </motion.div>
                                )}
                            </div>
                            <Button
                                disabled={isJoining}
                                className="w-full bg-foreground text-background hover:bg-foreground/90"
                                onClick={() => {
                                    if (hasJoined) {
                                        setHasJoined(false)
                                        setBotName('')
                                        setStartingCapital('100')
                                    }
                                }}
                            >
                                {isJoining ? 'Joining...' : hasJoined ? 'Joined!' : 'Join Battle'}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}