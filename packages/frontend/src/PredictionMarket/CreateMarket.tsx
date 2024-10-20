import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { predictABI, predictAddress } from '../abi/predictionABI'

function useCreateMarket() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const createMarket = async (betToken: string, feeRecipient: string) => {
    try {
      const result = await writeContract({
        address: predictAddress,
        abi: predictABI,
        functionName: 'createMarket',
        args: [betToken, feeRecipient],
      })
      console.log('Transaction submitted:', result)
    } catch (err) {
      console.error('Failed to create market:', err)
    }
  }

  return { createMarket, isPending, isConfirming, isConfirmed, error }
}

export function CreateMarket() {
  const { createMarket, isPending, isConfirming, isConfirmed, error } = useCreateMarket()

  const handleCreateMarket = async () => {
    const betToken = '0x...' // Address of the ERC20 token to be used for betting
    const feeRecipient = '0x...' // Address to receive the fees
    await createMarket(betToken, feeRecipient)
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleCreateMarket}
        disabled={isPending || isConfirming}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
      >
        Create Market
      </button>
      {isPending && <p className="mt-2 text-blue-600">Submitting transaction...</p>}
      {isConfirming && <p className="mt-2 text-yellow-600">Waiting for confirmation...</p>}
      {isConfirmed && <p className="mt-2 text-green-600">Market created successfully!</p>}
      {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}
    </div>
  )
}
