import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIPCombine } from '@/hooks/useIPCombine'

export function CreateIPModal({ isOpen, onClose }) {
  const [prompt, setPrompt] = useState('')
  const [ltAmount, setLtAmount] = useState(1)
  const { 
    approve, 
    mintIp, 
    mintLicense, 
    isApproved, 
    isIPConfirming, 
    isERC20Confirming 
  } = useIPCombine()

  const handleCreateIP = async () => {
    if (!prompt) return
    const result = await mintIp(prompt)
    if (result) {
      await mintLicense(result, 0, ltAmount)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <Card className="bg-transparent">
            <h2 className="text-lg font-semibold mb-4">Create IP Asset</h2>
            {!isApproved ? (
              <Button 
                onClick={approve} 
                disabled={isERC20Confirming}
              >
                {isERC20Confirming ? "Approving..." : "Approve Token"}
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
                  disabled={isIPConfirming}
                >
                  {isIPConfirming ? "Creating..." : "Create IP and License"}
                </Button>
              </div>
            )}
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
