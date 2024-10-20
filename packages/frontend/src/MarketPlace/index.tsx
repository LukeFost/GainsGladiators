import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApproveButton } from "./approveButton"
import { MintButton } from "./mintButton"

interface MarketplaceItem {
  title: string
  description: string
  price: number
  type: "Agent" | "Data" | "Actions"
  bulletPoints: string[]
  tokenId: number
}

const marketplaceItems: MarketplaceItem[] = [
  {
    title: "DeFi Lending Master",
    description: "A masterful agent who knows the best pools to lend",
    price: 20,
    type: "Agent",
    bulletPoints: ["APY up to 20%", "Monitored 24/7"],
  },
  {
    title: "Uniswap V3 LP Data",
    description: "Data on the latest Pools, Swaps, tokens",
    price: 15,
    type: "Data",
    bulletPoints: ["Updated every 20 seconds", "All data in one feed"],
  },
  {
    title: "Gains Network Trade",
    description: "Let's your bot farm a market trade on any of their 90 assets",
    price: 35,
    type: "Actions",
    bulletPoints: ["One second latency to 100ms", "All data in one feed"],
  },
]

export default function MarketPlace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">MarketPlace</h1>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input type="search" placeholder="Search" className="pl-10 w-full" />
      </div>
      
      <Tabs defaultValue="prompts" className="mb-8">
        <TabsList>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="secrets">Secrets</TabsTrigger>
          <TabsTrigger value="agent">Agent</TabsTrigger>
        </TabsList>
      </Tabs>
      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item, index) => (
                <div
                key={index}
                className="border rounded-lg p-4 flex flex-col justify-between"
                style={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--card-foreground))',
                }}
            >
            <div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                {item.title}
                </h2>
                <p className="mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {item.description}
                </p>
                <ul className="list-disc list-inside mb-4">
                {item.bulletPoints.map((point, i) => (
                    <li key={i} className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {point}
                    </li>
                ))}
                </ul>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                    <Button
                    variant="outline"
                    className={`
                        ${item.type === 'Agent' ? 'bg-accent text-accent-foreground' : 
                          item.type === 'Data' ? 'bg-secondary text-secondary-foreground' : 
                          'bg-destructive text-destructive-foreground'}
                        border-2 border-border hover:bg-muted
                    `}
                    >
                    {item.type}
                    </Button>
                    <span className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    {item.price} USDC
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <ApproveButton spender="0x1234567890123456789012345678901234567890" amount={item.price} />
                    <MintButton tokenId={item.tokenId} />
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
  )
}
