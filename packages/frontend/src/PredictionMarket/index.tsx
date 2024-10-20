import { useState, useEffect } from 'react'
import { Search, TrendingUp } from "lucide-react"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const initialParticipants = [
    { name: 'MemeLord', percentage: 42 },
    { name: 'DeFi Lending Master', percentage: 35 },
    { name: 'Spectra Speculator', percentage: 13 },
    { name: 'MoonCycle Trader', percentage: 10 },
]

export default function PredictionMarket() {
    const [participants, setParticipants] = useState(initialParticipants)
    const [selectedParticipant, setSelectedParticipant] = useState(participants[0])
    const [outcome, setOutcome] = useState('')
    const [amount, setAmount] = useState('')
    const [shares, setShares] = useState('')
    const [chartData, setChartData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setIsLoading(true)
            setIsRefreshing(true)
            setError(null)

            // Simulating API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 1000))

            const marketData = [
                { day: 'Day 1', MemeLord: 30, DeFiLendingMaster: 20, SpectraSpeculator: 15, MoonCycleTrader: 10 },
                { day: 'Day 2', MemeLord: 45, DeFiLendingMaster: 35, SpectraSpeculator: 20, MoonCycleTrader: 15 },
                { day: 'Day 3', MemeLord: 35, DeFiLendingMaster: 40, SpectraSpeculator: 25, MoonCycleTrader: 10 },
                { day: 'Day 4', MemeLord: 50, DeFiLendingMaster: 30, SpectraSpeculator: 15, MoonCycleTrader: 20 },
                { day: 'Day 5', MemeLord: 40, DeFiLendingMaster: 45, SpectraSpeculator: 10, MoonCycleTrader: 15 },
                { day: 'Day 6', MemeLord: 60, DeFiLendingMaster: 35, SpectraSpeculator: 20, MoonCycleTrader: 10 },
                { day: 'Day 7', MemeLord: 42, DeFiLendingMaster: 35, SpectraSpeculator: 13, MoonCycleTrader: 10 },
            ]

            setChartData({
                labels: marketData.map(item => item.day),
                datasets: [
                    {
                        label: 'MemeLord',
                        data: marketData.map(item => item.MemeLord),
                        borderColor: 'hsl(var(--primary))',
                        backgroundColor: 'hsl(var(--primary) / 0.5)',
                    },
                    {
                        label: 'DeFi Lending Master',
                        data: marketData.map(item => item.DeFiLendingMaster),
                        borderColor: 'hsl(var(--secondary))',
                        backgroundColor: 'hsl(var(--secondary) / 0.5)',
                    },
                    {
                        label: 'Spectra Speculator',
                        data: marketData.map(item => item.SpectraSpeculator),
                        borderColor: 'hsl(var(--accent))',
                        backgroundColor: 'hsl(var(--accent) / 0.5)',
                    },
                    {
                        label: 'MoonCycle Trader',
                        data: marketData.map(item => item.MoonCycleTrader),
                        borderColor: 'hsl(var(--muted))',
                        backgroundColor: 'hsl(var(--muted) / 0.5)',
                    },
                ],
            })

            setIsLoading(false)
            setIsRefreshing(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setError('Failed to fetch market data. Please try again.')
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }

    const handleBuy = () => {
        console.log('Buy', { participant: selectedParticipant, outcome, amount, shares })
    }

    const handleSell = () => {
        console.log('Sell', { participant: selectedParticipant, outcome, amount, shares })
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        const filteredParticipants = initialParticipants.filter(participant =>
            participant.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setParticipants(filteredParticipants)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Prediction Market</h1>

            <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search participants"
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="flex justify-between mb-4">
                <Tabs defaultValue="all" className="mb-8">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Button
                    onClick={fetchData}
                    disabled={isLoading || isRefreshing}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    {isRefreshing ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground mr-2"></div>
                            Refreshing
                        </div>
                    ) : (
                        'Refresh Data'
                    )}
                </Button>
            </div>

            {error && (
                <div className="text-destructive mb-4">{error}</div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Market Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{selectedParticipant.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input placeholder="Outcome" value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                            <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Input placeholder="Shares" type="number" value={shares} onChange={(e) => setShares(e.target.value)} />
                            <div className="flex justify-between">
                                <Button onClick={handleBuy}>Buy</Button>
                                <Button onClick={handleSell} variant="outline">Sell</Button>
                            </div>
                            <div>Potential Return: {/* Calculate potential return */}</div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="mt-6 space-y-2">
                {participants.map((participant) => (
                    <div
                        key={participant.name}
                        className="flex items-center cursor-pointer hover:bg-accent p-2 rounded"
                        onClick={() => setSelectedParticipant(participant)}
                    >
                        <div className="w-1/3">{participant.name}</div>
                        <div className="w-1/6">{participant.percentage}%</div>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${participant.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}