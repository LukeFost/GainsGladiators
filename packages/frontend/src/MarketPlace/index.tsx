import { useState, useCallback } from 'react'
import { useAccount, useContract, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { ipcombineAddress, ipcombineABI } from '@/abi/ipcombineABI'
import { erc20Address, mockerc20ABI } from '@/abi/mockerc20ABI'

function useCreateIp() {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isApproved, setIsApproved] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [isLicensing, setIsLicensing] = useState(false)
  const [isMintingTokens, setIsMintingTokens] = useState(false)

  const ipCombineContract = useContract({
    address: ipcombineAddress,
    abi: ipcombineABI,
    signerOrProvider: signer,
  })

  const tokenContract = useContract({
    address: erc20Address,
    abi: mockerc20ABI,
    signerOrProvider: signer,
  })

  const approve = useCallback(async () => {
    if (!signer || !tokenContract) return
    setIsApproving(true)
    try {
      const tx = await tokenContract.approve(ipcombineAddress, ethers.utils.parseEther('100'))
      await tx.wait()
      setIsApproved(true)
    } catch (error) {
      console.error('Error approving token:', error)
    }
    setIsApproving(false)
  }, [signer, tokenContract])

  const mintIp = useCallback(async (prompt: string) => {
    if (!ipCombineContract) return
    setIsMinting(true)
    try {
      const tx = await ipCombineContract.mintIp(prompt)
      const receipt = await tx.wait()
      const event = receipt.events.find((e: any) => e.event === 'IPMinted')
      const ipId = event.args.ipId
      return ipId
    } catch (error) {
      console.error('Error minting IP asset:', error)
    } finally {
      setIsMinting(false)
    }
  }, [ipCombineContract])

  const mintLicense = useCallback(async (ipId: string, tokenId: number, ltAmount: number) => {
    if (!ipCombineContract || !address) return
    setIsLicensing(true)
    try {
      const tx = await ipCombineContract.mintLicenseTokenMin(ipId, tokenId, ltAmount, address)
      const receipt = await tx.wait()
      const event = receipt.events.find((e: any) => e.event === 'LicenseMinted')
      const startLicenseTokenId = event.args.startLicenseTokenId
      return startLicenseTokenId
    } catch (error) {
      console.error('Error minting license:', error)
    } finally {
      setIsLicensing(false)
    }
  }, [ipCombineContract, address])

  const mintTokens = useCallback(async (amount: number) => {
    if (!tokenContract || !address) return
    setIsMintingTokens(true)
    try {
      const tx = await tokenContract.mint(address, ethers.utils.parseEther(amount.toString()))
      await tx.wait()
    } catch (error) {
      console.error('Error minting tokens:', error)
    } finally {
      setIsMintingTokens(false)
    }
  }, [tokenContract, address])

  return { 
    approve, 
    mintIp, 
    mintLicense, 
    mintTokens, 
    isApproved, 
    isApproving, 
    isMinting, 
    isLicensing, 
    isMintingTokens 
  }
}

interface MarketplaceItem {
  title: string
  description: string
  price: number
  type: "Agent" | "Data" | "Actions"
  bulletPoints: string[]
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [ltAmount, setLtAmount] = useState(1)
  const { 
    approve, 
    mintIp, 
    mintLicense, 
    mintTokens, 
    isApproved, 
    isApproving, 
    isMinting, 
    isLicensing, 
    isMintingTokens 
  } = useCreateIp()

  const handleCreateIP = async () => {
    if (!prompt) return
    const ipId = await mintIp(prompt)
    if (ipId) {
      await mintLicense(ipId, 0, ltAmount)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
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
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 space-x-2">
        <Button onClick={() => setIsCreateModalOpen(true)}>Create</Button>
        <Button onClick={() => mintTokens(100)} disabled={isMintingTokens}>
          {isMintingTokens ? 'Minting...' : 'Mint 100 Tokens'}
        </Button>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <Card className="bg-transparent">
              <h2 className="text-lg font-semibold mb-4">Create IP Asset</h2>
              {!isApproved ? (
                <Button 
                  onClick={approve} 
                  disabled={isApproving}
                >
                  {isApproving ? "Approving..." : "Approve Token"}
                </Button>
              ) : (
                <div>
                  <Input 
                    type="text" 
                    placeholder="Enter LLM prompt" 
                    className="mb-4"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Input 
                    type="number" 
                    placeholder="License Token Amount" 
                    className="mb-4"
                    value={ltAmount}
                    onChange={(e) => setLtAmount(Number(e.target.value))}
                  />
                  <Button 
                    onClick={handleCreateIP} 
                    disabled={isMinting || isLicensing}
                  >
                    {isMinting ? "Minting IP..." : isLicensing ? "Minting License..." : "Create IP and License"}
                  </Button>
                </div>
              )}
            </Card>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
