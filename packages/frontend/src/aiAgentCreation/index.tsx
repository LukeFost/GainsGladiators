import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function AIAgentCreationWithAnimation() {
    const [name, setName] = useState('')
    const [prompt, setPrompt] = useState('')
    const [description, setDescription] = useState('')
    const [isDeploying, setIsDeploying] = useState(false)
    const [isDeployed, setIsDeployed] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsDeploying(true)
        // Simulate deployment process
        setTimeout(() => {
            setIsDeployed(true)
            setIsDeploying(false)
        }, 3000)
    }

    const BotSVG = () => (
        <svg
            className="w-32 h-32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="20" y="20" width="60" height="60" rx="10" className="fill-foreground" />
            <circle cx="35" cy="45" r="5" className="fill-background" />
            <circle cx="65" cy="45" r="5" className="fill-background" />
            <path d="M40 65 H60" stroke="hsl(var(--background))" strokeWidth="3" strokeLinecap="round" />
        </svg>
    )

    return (
        <Card className="w-full max-w-2xl mx-auto bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">AI Agent Creation</CardTitle>
            </CardHeader>
            <CardContent>
                <AnimatePresence mode="wait">
                    {!isDeploying && !isDeployed ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-card-foreground">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter AI agent name"
                                    required
                                    className="bg-background text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="prompt" className="text-card-foreground">Prompt</Label>
                                <Textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter AI agent prompt"
                                    required
                                    className="bg-background text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-card-foreground">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter AI agent description"
                                    required
                                    className="bg-background text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <Button
                                type="submit"
                                className={cn(
                                    "w-full bg-primary text-primary-foreground",
                                    "hover:bg-background hover:text-foreground",
                                    "border-2 border-border",
                                    "transition-colors duration-300"
                                )}
                            >
                                Deploy AI Agent
                            </Button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="animation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center space-y-6"
                        >
                            <div className="relative">
                                <BotSVG />
                                {isDeploying && (
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
                                disabled={isDeploying}
                                className="w-full bg-foreground text-background hover:bg-foreground/90"
                                onClick={() => {
                                    if (isDeployed) {
                                        setIsDeployed(false)
                                        setName('')
                                        setPrompt('')
                                        setDescription('')
                                    }
                                }}
                            >
                                {isDeploying ? 'Deploying...' : isDeployed ? 'Deployed!' : 'Deploy AI Agent'}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}