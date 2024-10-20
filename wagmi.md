

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Read from Contract
The useReadContract Hook allows you to read data on a smart contract, from a view or pure (read-only) function. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

The component below shows how to retrieve the token balance of an address from the Wagmi Example contract


read-contract.tsx
tsx
import { useReadContract } from 'wagmi'

function ReadContract() {
  const { data: balance } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  return (
    <div>Balance: {balance?.toString()}</div>
  )
}
Loading & Error States
The useReadContract Hook also returns loading & error states, which can be used to display a loading indicator while the data is being fetched, or an error message if contract execution reverts.


read-contract.tsx
tsx
import { type BaseError, useReadContract } from 'wagmi'

function ReadContract() {
  const { 
    data: balance,
    error,
    isPending
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  if (isPending) return <div>Loading...</div>

  if (error)
    return (
      <div>
        Error: {(error as BaseError).shortMessage || error.message}
      </div>
    )

  return (
    <div>Balance: {balance?.toString()}</div>
  )
}
Calling Multiple Functions
We can use the useReadContract Hook multiple times in a single component to call multiple functions on the same contract, but this ends up being hard to manage as the number of functions increases, especially when we also want to deal with loading & error states.

Luckily, to make this easier, we can use the useReadContracts Hook to call multiple functions in a single call.


read-contract.tsx
tsx
import { type BaseError, useReadContracts } from 'wagmi'

function ReadContract() {
  const { 
    data,
    error,
    isPending
  } = useReadContracts({ 
    contracts: [{ 
      ...wagmiContractConfig,
      functionName: 'balanceOf',
      args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    }, { 
      ...wagmiContractConfig, 
      functionName: 'ownerOf', 
      args: [69n], 
    }, { 
      ...wagmiContractConfig, 
      functionName: 'totalSupply', 
    }] 
  }) 
  const [balance, ownerOf, totalSupply] = data || [] 

  if (isPending) return <div>Loading...</div>

  if (error)
    return (
      <div>
        Error: {(error as BaseError).shortMessage || error.message}
      </div>
    ) 

  return (
    <>
      <div>Balance: {balance?.toString()}</div>
      <div>Owner of Token 69: {ownerOf?.toString()}</div> 
      <div>Total Supply: {totalSupply?.toString()}</div> 
    </>
  )
}
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
Send Transaction
Next page
Write to Contract
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

useWriteContract
Action for executing a write function on a contract.

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

Import
ts
import { useWriteContract } from 'wagmi'
Usage

index.tsx

abi.ts

config.ts
tsx
import { useWriteContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const { writeContract } = useWriteContract()

  return (
    <button 
      onClick={() => 
        writeContract({ 
          abi,
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          functionName: 'transferFrom',
          args: [
            '0xd2135CfB216b74109775236E36d4b433F1DF507B',
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            123n,
          ],
       })
      }
    >
      Transfer
    </button>
  )
}
Parameters
ts
import { type UseWriteContractParameters } from 'wagmi'
config
Config | undefined

Config to use instead of retrieving from the from nearest WagmiProvider.


index.tsx

config.ts
tsx
import { useWriteContract } from 'wagmi'
import { config } from './config'

function App() {
  const result = useWriteContract({
    config,
  })
}

mutation
TanStack Query parameters. See the TanStack Query mutation docs for more info.

Wagmi does not support passing all TanStack Query parameters

TanStack Query parameters, like mutationFn and mutationKey, are used internally to make Wagmi work and you cannot override them. Check out the source to see what parameters are not supported. All parameters listed below are supported.

gcTime
number | Infinity | undefined

The time in milliseconds that unused/inactive cache data remains in memory. When a mutation's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different cache times are specified, the longest one will be used.
If set to Infinity, will disable garbage collection
meta
Record<string, unknown> | undefined

If set, stores additional information on the mutation cache entry that can be used as needed. It will be accessible wherever writeContract is available (e.g. onError, onSuccess functions).

networkMode
'online' | 'always' | 'offlineFirst' | undefined

defaults to 'online'
see Network Mode for more information.
onError
((error: WriteContractErrorType, variables: WriteContractVariables, context?: context | undefined) => Promise<unknown> | unknown) | undefined

This function will fire if the mutation encounters an error and will be passed the error.

onMutate
((variables: WriteContractVariables) => Promise<context | void> | context | void) | undefined

This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
Useful to perform optimistic updates to a resource in hopes that the mutation succeeds
The value returned from this function will be passed to both the onError and onSettled functions in the event of a mutation failure and can be useful for rolling back optimistic updates.
onSuccess
((data: WriteContractReturnType, variables: WriteContractVariables, context?: context | undefined) => Promise<unknown> | unknown) | undefined

This function will fire when the mutation is successful and will be passed the mutation's result.

onSettled
((data: WriteContractReturnType, error: WriteContractErrorType, variables: WriteContractVariables, context?: context | undefined) => Promise<unknown> | unknown) | undefined

This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error

queryClient
QueryClient

Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

retry
boolean | number | ((failureCount: number, error: WriteContractErrorType) => boolean) | undefined

Defaults to 0.
If false, failed mutations will not retry.
If true, failed mutations will retry infinitely.
If set to an number, e.g. 3, failed mutations will retry until the failed mutations count meets that number.
retryDelay
number | ((retryAttempt: number, error: WriteContractErrorType) => number) | undefined

This function receives a retryAttempt integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
A function like attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000) applies exponential backoff.
A function like attempt => attempt * 1000 applies linear backoff.
Return Type
ts
import { type UseWriteContractReturnType } from 'wagmi'
The return type's data property is inferrable via the combination of abi, functionName, and args. Check out the TypeScript docs for more info.


TanStack Query mutation docs

writeContract
(variables: WriteContractVariables, { onSuccess, onSettled, onError }) => void

The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options.

variables
WriteContractVariables

The variables object to pass to the writeContract action.

onSuccess
(data: WriteContractReturnType, variables: WriteContractVariables, context: TContext) => void

This function will fire when the mutation is successful and will be passed the mutation's result.

onError
(error: WriteContractErrorType, variables: WriteContractVariables, context: TContext | undefined) => void

This function will fire if the mutation encounters an error and will be passed the error.

onSettled
(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteContractVariables, context: TContext | undefined) => void

This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
If you make multiple requests, onSuccess will fire only after the latest call you've made.
writeContractAsync
(variables: WriteContractVariables, { onSuccess, onSettled, onError }) => Promise<WriteContractReturnType>

Similar to writeContract but returns a promise which can be awaited.

data
WriteContractReturnType | undefined

writeContract return type
Defaults to undefined
The last successfully resolved data for the mutation.
error
WriteContractErrorType | null

The error object for the mutation, if an error was encountered.

failureCount
number

The failure count for the mutation.
Incremented every time the mutation fails.
Reset to 0 when the mutation succeeds.
failureReason
WriteContractErrorType | null

The failure reason for the mutation retry.
Reset to null when the mutation succeeds.
isError / isIdle / isPending / isSuccess
boolean

Boolean variables derived from status.

isPaused
boolean

will be true if the mutation has been paused.
see Network Mode for more information.
reset
() => void

A function to clean the mutation internal state (e.g. it resets the mutation to its initial state).

status
'idle' | 'pending' | 'error' | 'success'

'idle' initial status prior to the mutation function executing.
'pending' if the mutation is currently executing.
'error' if the last mutation attempt resulted in an error.
'success' if the last mutation attempt was successful.
submittedAt
number

The timestamp for when the mutation was submitted.
Defaults to 0.
variables
WriteContractVariables | undefined

The variables object passed to writeContract.
Defaults to undefined.
Type Inference
With abi setup correctly, TypeScript will infer the correct types for functionName, args, and the value. See the Wagmi TypeScript docs for more information.

TanStack Query
ts
import {
  type WriteContractData,
  type WriteContractVariables,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  writeContractMutationOptions,
} from 'wagmi/query'
Action
writeContract
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
useWatchPendingTransactions
Next page
Actions
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Guides
Viem

Framework Adapters

Error Handling

Ethers.js Adapters

Chain Properties

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createConnector

createStorage

Chains

Connectors
Transports
Actions
call

connect

deployContract

disconnect

estimateFeesPerGas

estimateGas

estimateMaxPriorityFeePerGas

getAccount

getBalance

getBlock

getBlockNumber

getBlockTransactionCount

getBytecode

getChainId

getChains

getClient

getConnections

getConnectorClient

getConnectors

getEnsAddress

getEnsAvatar

getEnsName

getEnsResolver

getEnsText

getFeeHistory

getGasPrice

getProof

getPublicClient

getStorageAt

getToken

getTransaction

getTransactionConfirmations

getTransactionCount

getTransactionReceipt

getWalletClient

multicall

prepareTransactionRequest

reconnect

readContract

readContracts

sendTransaction

signMessage

signTypedData

simulateContract

switchAccount

switchChain

verifyMessage

verifyTypedData

waitForTransactionReceipt

watchAccount

watchAsset

watchBlocks

watchBlockNumber

watchChainId

watchClient

watchConnections

watchConnectors

watchContractEvent

watchPendingTransactions

watchPublicClient

writeContract

Miscellaneous
Errors

Utilities
Experimental
getCallsStatus

getCapabilities

sendCalls

showCallsStatus

writeContracts

writeContract
Action for executing a write function on a contract.

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

Import
ts
import { writeContract } from '@wagmi/core'
Usage

index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
Pairing with simulateContract

Pairing simulateContract with writeContract allows you to validate if the transaction will succeed ahead of time. If the simulate succeeds, writeContract can execute the transaction.


index.ts

abi.ts

config.ts
ts
import { simulateContract, writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const { request } = await simulateContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
const hash = await writeContract(config, request)
Parameters
ts
import { type WriteContractParameters } from '@wagmi/core'
abi
Abi

The contract's ABI. Check out the TypeScript docs for how to set up ABIs for maximum type inference and safety.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi, 
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
accessList
AccessList | undefined

The access list.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  accessList: [{ 
    address: '0x1', 
    storageKeys: ['0x1'], 
  }], 
})
account
Address | Account | undefined

Account to use when signing data. Throws if account is not found on connector.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
})
address
Address

The contract's address.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
})
args
readonly unknown[] | undefined

Arguments to pass when calling the contract.
Inferred from abi and functionName.

index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [ 
    '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 
    123n, 
  ] 
})
chainId
config['chains'][number]['id'] | undefined

Chain ID to validate against before sending transaction.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { mainnet } from 'wagmi/chains'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  chainId: mainnet.id, 
})
connector
Connector | undefined

Connector to sign data with.


index.ts

abi.ts

config.ts
ts
import { getAccount, writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const { connector } = getAccount(config)
const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  connector, 
})
dataSuffix
`0x${string}` | undefined

Data to append to the end of the calldata. Useful for adding a "domain" tag.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  dataSuffix: '0xdeadbeef', 
})
functionName
string

Function to call on the contract.
Inferred from abi.

index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'approve', 
  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 123n]
})
gas
bigint | undefined

Gas provided for transaction execution.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  gas: parseGwei('20'), 
})
gasPrice
bigint | undefined

The price in wei to pay per gas. Only applies to Legacy Transactions.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  gasPrice: parseGwei('20'), 
})
maxFeePerGas
bigint | undefined

Total fee per gas in wei, inclusive of maxPriorityFeePerGas. Only applies to EIP-1559 Transactions.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  maxFeePerGas: parseGwei('20'), 
})
maxPriorityFeePerGas
bigint | undefined

Max priority fee per gas in wei. Only applies to EIP-1559 Transactions.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { parseGwei } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), 
})
nonce
number

Unique number identifying this transaction.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  nonce: 123, 
})
type
'legacy' | 'eip1559' | 'eip2930' | undefined

Optional transaction request type to narrow parameters.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  type: 'eip1559', 
})
value
bigint | undefined

Value in wei sent with this transaction.


index.ts

abi.ts

config.ts
ts
import { writeContract } from '@wagmi/core'
import { parseEther } from 'viem'
import { abi } from './abi'
import { config } from './config'

const result = await writeContract(config, {
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'transferFrom',
  args: [
    '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    123n,
  ],
  value: parseEther('0.01'), 
})
Return Type
ts
import { type WriteContractReturnType } from '@wagmi/core'
Hash

The transaction hash.

Type Inference
With abi setup correctly, TypeScript will infer the correct types for functionName, args, and value. See the Wagmi TypeScript docs for more information.

Error
ts
import { type WriteContractErrorType } from '@wagmi/core'
TanStack Query
ts
import {
  type WriteContractData,
  type WriteContractVariables,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  writeContractMutationOptions,
} from '@wagmi/core/query'
Viem
writeContract
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
watchPublicClient
Next page
Errors
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Getting Started
Overview
Wagmi is a React Hooks library for Ethereum. You can learn more about the rationale behind the project in the Why Wagmi section.

Automatic Installation
For new projects, it is recommended to set up your Wagmi app using the create-wagmi command line interface (CLI). This will create a new Wagmi project using TypeScript and install the required dependencies.


pnpm

npm

yarn

bun
bash
pnpm create wagmi
Once the command runs, you'll see some prompts to complete.


Project name: wagmi-project
Select a framework: React / Vanilla
...
After the prompts, create-wagmi will create a directory with your project name and install the required dependencies. Check out the README.md for further instructions (if required).

Manual Installation
To manually add Wagmi to your project, install the required packages.


pnpm

npm

yarn

bun
bash
pnpm add wagmi viem@2.x @tanstack/react-query
Viem is a TypeScript interface for Ethereum that performs blockchain operations.
TanStack Query is an async state manager that handles requests, caching, and more.
TypeScript is optional, but highly recommended. Learn more about TypeScript support.
Create Config
Create and export a new Wagmi config using createConfig.


config.ts
ts
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
In this example, Wagmi is configured to use the Mainnet and Sepolia chains, and injected connector. Check out the createConfig docs for more configuration options.

Wrap App in Context Provider
Wrap your app in the WagmiProvider React Context Provider and pass the config you created earlier to the value property.


app.tsx

config.ts
tsx
import { WagmiProvider } from 'wagmi'
import { config } from './config'

function App() {
  return (
    <WagmiProvider config={config}>
      {/** ... */}
    </WagmiProvider>
  )
}
Check out the WagmiProvider docs to learn more about React Context in Wagmi.

Setup TanStack Query
Inside the WagmiProvider, wrap your app in a TanStack Query React Context Provider, e.g. QueryClientProvider, and pass a new QueryClient instance to the client property.


app.tsx

config.ts
tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
Check out the TanStack Query docs to learn about the library, APIs, and more.

Use Wagmi
Now that everything is set up, every component inside the Wagmi and TanStack Query Providers can use Wagmi React Hooks.


profile.tsx

app.tsx

config.ts
tsx
import { useAccount, useEnsName } from 'wagmi'

export function Profile() {
  const { address } = useAccount()
  const { data, error, status } = useEnsName({ address })
  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return <div>ENS name: {data}</div>
}
Next Steps
For more information on what to do next, check out the following topics.

TypeScript Learn how to get the most out of Wagmi's type-safety and inference for an enlightened developer experience.
Connect Wallet Learn how to enable wallets to connect to and disconnect from your apps and display information about connected accounts.
React Hooks Browse the collection of React Hooks and learn how to use them.
Viem Learn about Viem and how it works with Wagmi.
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
Installation
Next page
TypeScript
Skip to main content

Docs Logo
On this page
Next.js
AppKit has support for Wagmi and Ethers v6 on Ethereum and @solana/web3.js on Solana. Choose one of these Ethereum Libraries or 'Solana' to get started.

Note
These steps are specific to Next.js app router. For other React frameworks read the React documentation.

Installation
Wagmi
Ethers
Ethers v5
Solana
npm
Yarn
Bun
pnpm
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query

Cloud Configuration
Create a new project on Reown Cloud at https://cloud.reown.com and obtain a new project ID.

Don't have a project ID?
Head over to Reown Cloud and create a new project now!

Get started
cloud illustration
Implementation
Wagmi
Ethers
Ethers v5
Solana
For a quick integration, you can use the createAppKit function with a unified configuration. This automatically applies the predefined configurations for different adapters like Wagmi, Ethers, or Solana, so you no longer need to manually configure each one individually. Simply pass the common parameters such as projectId, chains, metadata, etc., and the function will handle the adapter-specific configurations under the hood.

This includes WalletConnect, Coinbase and Injected connectors, and the Blockchain API as a transport

Wagmi config
Create a new file for your Wagmi configuration, since we are going to be calling this function on the client and the server it cannot live inside a file with the 'use client' directive.

For this example we will create a file called config/index.tsx outside our app directory and set up the following configuration

import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig

info
Using cookies is completely optional and by default Wagmi will use localStorage instead if the storage param is not defined.
The ssr flag will delay the hydration of the Wagmi's store to avoid hydration mismatch errors.

Context Provider
Let's create now a context provider that will wrap our application and initialized AppKit (createAppKit needs to be called inside a Next Client Component file).

In this example we will create a file called context/index.tsx outside our app directory and set up the following configuration

'use client'

import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react' 
import { mainnet, arbitrum, avalanche, base, optimism, polygon } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: "appkit-example-scroll",
  description: "AppKit Example - Scroll",
  url: "https://scrollapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"]
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, avalanche, base, optimism, polygon],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider


Layout
Next, in our app/layout.tsx file, we will import our ContextProvider component and call the Wagmi's function cookieToInitialState.

The initialState returned by cookieToInitialState, contains the optimistic values that will populate the Wagmi's store both on the server and client.

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers"; // added
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}

Trigger the modal
Wagmi
Ethers
Ethers v5
Solana
To open AppKit you can use our web component or build your own button with AppKit hooks. In this example we are going to use the <w3m-button> component.

Web components are global html elements that don't require importing.

export default function ConnectButton() {
  return <w3m-button />
}

Learn more about the AppKit web components here

Smart Contract Interaction
Wagmi
Ethers
Solana
Wagmi hooks can help us interact with wallets and smart contracts:

import { useReadContract } from 'wagmi'
import { USDTAbi } from '../abi/USDTAbi'

const USDTAddress = '0x...'

function App() {
  const result = useReadContract({
    abi: USDTAbi,
    address: USDTAddress,
    functionName: 'totalSupply'
  })
}

Read more about Wagmi hooks for smart contract interaction here.

Extra configuration
Next.js relies on SSR. This means some specific steps are required to make Web3Modal work properly.

Add the following code in the next.config.js file
// Path: next.config.js
const nextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}
Hooks
Hooks are functions that will help you control the modal, subscribe to wallet events and interact with them and smart contracts.

useAppKit
Control the modal with the useAppKit hook

Wagmi
Ethers
Ethers v5
Solana
import { useAppKit } from '@reown/appkit/react'

export default function Component() {
  const { open, close } = useAppKit()

  open()

  //...
}

You can also select the modal's view when calling the open function

open({ view: 'Account' })

List of views you can select

Variable	Description
Connect	Principal view of the modal - default view when disconnected
Account	User profile - default view when connected
AllWallets	Shows the list of all available wallets
Networks	List of available networks - you can select and target a specific network before connecting
WhatIsANetwork	"What is a network" onboarding view
WhatIsAWallet	"What is a wallet" onboarding view
OnRampProviders	"On-Ramp main view
Swap	"Swap main view
useDisconnect
const { disconnect } = useDisconnect()

disconnect()

useWalletInfo
Metadata information from the connected wallet

import { useWalletInfo } from '@reown/appkit/react'


export default Component(){
  const { walletInfo } = useWalletInfo()

  console.log(walletInfo.name, walletInfo.icon)

  //...
}

Ethereum Library
Wagmi
Ethers
You can use Wagmi hooks to sign messages, interact with smart contracts, and much more.

useAccount
Hook for accessing account data and connection status.

import { useAccount } from 'wagmi'

function App() {
  const { address, isConnecting, isDisconnected } = useAccount()

  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>
  return <div>{address}</div>
}

useSignMessage
Hook for signing messages with connected account.

import { useSignMessage } from 'wagmi'

function App() {
  const { signMessage } = useSignMessage()

  return <button onClick={() => signMessage({ message: 'hello world' })}>Sign message</button>
}


Learn More
useAppKitState
Get the current value of the modal's state

Wagmi
Ethers
Ethers v5
Solana
import { useAppKitState } from '@reown/appkit/react'

const { open, selectedNetworkId } = useAppKitState()

The modal state consists of two reactive values:

State	Description	Type
open	Open state will be true when the modal is open and false when closed.
boolean
selectedNetworkId	The current chain id selected by the user
number
useAppKitTheme
import { useAppKitTheme } from '@reown/appkit/react'
const { themeMode, themeVariables, setThemeMode, setThemeVariables } = useAppKitTheme()

setThemeMode('dark')

setThemeVariables({
  '--w3m-color-mix': '#00BB7F',
  '--w3m-color-mix-strength': 40
})

Track modal events
import { useAppKitEvents } from '@reown/appkit/react'

const events = useAppKitEvents()

Edit this page
Last updated on Sep 21, 2024
Previous
Installation
Next
Options
Docs
AppKit
WalletKit
Community
GitHub Discussions
Discord
X
More
Blog
GitHub
Farcaster
Privacy
Consent Preferences


Docs Logo
On this page
Options
Options
The following options can be passed to the createAppKit function:

createAppKit({ adapters, projectId, networks, ...options })

defaultNetwork
You can set a desired network for the initial connection as default:

Wagmi
Ethers
Solana
import { mainnet } from '@reown/appkit/networks'

createAppKit({
  //...
  defaultNetwork: mainnet
})

featuredWalletIds
Select wallets that are going to be shown on the modal's main view. Default wallets are MetaMask and Trust Wallet. Array of wallet ids defined will be prioritized (order is respected). These wallets will also show up first in All Wallets view. You can find the wallets ids in WalletConnect Explorer

createAppKit({
  //...
  featuredWalletIds: [
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
  ]
})

allowUnsupportedChain
Allow users to switch to an unsupported chain.

createAppKit({
  //...
  allowUnsupportedChain: true
})

tokens
You can select tokens for AppKit to show the user's balance of. Each key represents the chain id of the token's blockchain.

createAppKit({
  //...
  tokens: {
    1: {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      image: 'token_image_url' //optional
    },
    137: {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      image: 'token_image_url' //optional
    }
  }
})

If you would like to remove default wallets completely, you can set the featuredWalletIds property to an empty array.

chainImages
Add or override the modal's network images.

createAppKit({
  // ...
  chainImages: {
    1: 'https://my.images.com/eth.png'
  }
})

connectorImages
Wagmi
Ethers
Solana
Set or override the images of any connector. The key of each property must match the id of the connector.

createAppKit({
  connectorImages: {
    coinbaseWallet: 'https://images.mydapp.com/coinbase.png',
    metaMask: 'https://images.mydapp.com/metamask.png'
  }
})

termsConditionsUrl
You can add an url for the terms and conditions link.

createAppKit({
  //...
  termsConditionsUrl: 'https://www.mytermsandconditions.com'
})

privacyPolicyUrl
You can add an url for the privacy policy link.

createAppKit({
  //...
  privacyPolicyUrl: 'https://www.myprivacypolicy.com'
})

features
This allows you to toggle (enable or disable) additional features provided by AppKit. Features such as analytics, email and social logins, On-ramp, swaps, etc., can be enabled using this parameter.

analytics
Enable analytics to get more insights on your users activity within your Reown Cloud's dashboard

createAppKit({
  //...
  features: {
    analytics: true,
  }
})

Learn More
swaps
Enable or disable the swap feature in your AppKit. Swaps feature is enabled by default.

createAppKit({
  //...
  features: {
    swaps: true,
  }
})

onramp
Enable or disable the onramp feature in your AppKit. Onramp feature is enabled by default.

createAppKit({
  //...
  features: {
    onramp: true,
  }
})

customWallets
Add custom wallets to the modal. CustomWallets is an array of objects, where each object contains specific information of a custom wallet.

createAppKit({
  //...
  customWallets: [
    {
      id: 'myCustomWallet',
      name: 'My Custom Wallet',
      homepage: 'www.mycustomwallet.com', // Optional
      image_url: 'my_custom_wallet_image', // Optional
      mobile_link: 'mobile_link', // Optional - Deeplink or universal
      desktop_link: 'desktop_link', // Optional - Deeplink
      webapp_link: 'webapp_link', // Optional
      app_store: 'app_store', // Optional
      play_store: 'play_store' // Optional
    }
  ]
})

AllWallets
caution
If the "All Wallets" button is removed on mobile, all the mobile wallets that were not added on the main view of the modal won't be able to connect to your website via WalletConnect protocol.

The allWallets parameter allows you to add or remove the "All Wallets" button on the modal.

Value	Description
SHOW	Shows the "All Wallets" button on AppKit.
HIDE	Removes the "All Wallets" button from AppKit.
ONLY_MOBILE	Shows the "All Wallets" button on AppKit only on mobile.
createAppKit({
  //...
  allWallets: 'ONLY_MOBILE'
})

includeWalletIds & excludeWalletIds
caution
Wallets that are either not included or excluded won't be able to connect to your website on mobile via WalletConnect protocol.

includeWalletIds
Override default recommended wallets that are fetched from WalletConnect explorer. Array of wallet ids defined will be shown (order is respected). Unlike featuredWalletIds, these wallets will be the only ones shown in All Wallets view and as recommended wallets. You can get these ids from the explorer link mentioned before by clicking on a copy icon of desired wallet card.

createAppKit({
  //...
  includeWalletIds: [
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
  ]
})

excludeWalletIds
Exclude wallets that are fetched from WalletConnect explorer. Array of wallet ids defined will be excluded. All other wallets will be shown in respective places. You can get these ids from the explorer link mentioned before by clicking on a copy icon of desired wallet card.

createAppKit({
  //...
  excludeWalletIds: [
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
  ]
})

Coinbase Smart Wallet
The Coinbase connector now includes a new flag to customize the Smart Wallet behavior.

Note
To enable the Coinbase Smart Wallet feature, ensure that AppKit is updated to version 4.2.3 or higher. Additionally, if you are using Wagmi, verify that it is on the latest version.

The preference (or coinbasePreference) flag accepts one of the following string values:

eoaOnly: Uses EOA Browser Extension or Mobile Coinbase Wallet.
smartWalletOnly: Displays Smart Wallet popup.
all (default): Supports both eoaOnly and smartWalletOnly based on context.
Wagmi
Ethers
AppKit can be configured in two different ways: Default or Custom

Select your preferred configuration mode below:

Default
Custom
createAppKit({
  //...
  enableCoinbase: true, // true by default
  coinbasePreference: 'smartWalletOnly'
})

Edit this page
Last updated on Sep 19, 2024
Previous
Hooks
Next
Components
Docs
AppKit
WalletKit
Community
GitHub Discussions
Discord
X
More
Blog
GitHub
Farcaster
Privacy
Consent Preferences


Docs Logo
On this page
Web Components
AppKit's web components are custom and reusable HTML tags. They will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

info
Web components are global html elements that don't require importing.

List of optional properties for AppKit web components
<w3m-button />
Variable	Description	Type
disabled	Enable or disable the button.
boolean
balance	Show or hide the user's balance.
'show' or 'hide'
size	Default size for the button.
'md' or 'sm'
label	The text shown in the button.
string
loadingLabel	The text shown in the button when the modal is open.
string
<w3m-account-button />
Variable	Description	Type
disabled	Enable or disable the button.
boolean
balance	Show or hide the user's balance.
'show' or 'hide'
<w3m-connect-button />
Variable	Description	Type
size	Default size for the button.
'md' or 'sm'
label	The text shown in the button.
string
loadingLabel	The text shown in the button when the modal is open.
string
<w3m-network-button />
Variable	Description	Type
disabled	Enable or disable the button.
boolean
Edit this page
Last updated on Sep 19, 2024
Previous
Options
Next
Custom connectors
Docs
AppKit
WalletKit
Community
GitHub Discussions
Discord
X
More
Blog
GitHub
Farcaster
Privacy
Consent Preferences


Docs Logo
Custom connectors
Add custom connectors for Ethers or Wagmi

Wagmi
Ethers
Solana
If you already have Wagmi integrated into your application or would like more control over Wagmi's configuration, you can integrate AppKit on top of it.

Adding custom connectors like WalletConnect and Coinbase is optional.

By default, EIP-6963 and WC connectors are provided out of the box.

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import { http, WagmiProvider, CreateConnectorFn } from 'wagmi'
import { sepolia } from '@reown/appkit/networks'
import { walletConnect, coinbaseWallet, injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

const metadata = {
  //...
}

// create the connectors (delete the ones you don't need)
const connectors: CreateConnectorFn[] = []
connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
connectors.push(injected({ shimDisconnect: true }))
connectors.push(
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0]
  })
)

export const networks = [sepolia]

export const wagmiAdapter = new WagmiAdapter({
  storage:
  transports: {
    [sepolia.id]: http()
  },
  connectors,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [sepolia]
})

export function ContextProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}


Edit this page
Last updated on Sep 19, 2024
Previous
Components
Next
One-Click Auth / SIWE
Docs
AppKit
WalletKit
Community
GitHub Discussions
Discord
X
More
Blog
GitHub
Farcaster
Privacy
Consent Preferences
Copyright © 2024 Reown, Inc.
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

TanStack Query
Wagmi Hooks are not only a wrapper around the core Wagmi Actions, but they also utilize TanStack Query to enable trivial and intuitive fetching, caching, synchronizing, and updating of asynchronous data in your React applications.

Without an asynchronous data fetching abstraction, you would need to handle all the negative side-effects that comes as a result, such as: representing finite states (loading, error, success), handling race conditions, caching against a deterministic identifier, etc.

Queries & Mutations
Wagmi Hooks represent either a Query or a Mutation.

Queries are used for fetching data (e.g. fetching a block number, reading from a contract, etc), and are typically invoked on mount by default. All queries are coupled to a unique Query Key, and can be used for further operations such as refetching, prefetching, or modifying the cached data.

Mutations are used for mutating data (e.g. connecting/disconnecting accounts, writing to a contract, switching chains, etc), and are typically invoked in response to a user interaction. Unlike Queries, they are not coupled with a query key.

Terms
Query: An asynchronous data fetching (e.g. read data) operation that is tied against a unique Query Key.
Mutation: An asynchronous mutating (e.g. create/update/delete data or side-effect) operation.
Query Key: A unique identifier that is used to deterministically identify a query. It is typically a tuple of the query name and the query arguments.
Stale Data: Data that is unused or inactive after a certain period of time.
Query Fetching: The process of invoking an async query function.
Query Refetching: The process of refetching rendered queries.
Query Invalidation: The process of marking query data as stale (e.g. inactive/unused), and refetching rendered queries.
Query Prefetching: The process of prefetching queries and seeding the cache.
Persistence via External Stores
By default, TanStack Query persists all query data in-memory. This means that if you refresh the page, all in-memory query data will be lost.

If you want to persist query data to an external storage, you can utilize TanStack Query's createSyncStoragePersister or createAsyncStoragePersister to plug external storage like localStorage, sessionStorage, IndexedDB or AsyncStorage (React Native).

Sync Storage
Below is an example of how to set up Wagmi + TanStack Query with sync external storage like localStorage or sessionStorage.

Install

pnpm

npm

yarn

bun
bash
pnpm i @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
Usage
tsx
// 1. Import modules.
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { WagmiProvider, deserialize, serialize } from 'wagmi'

// 2. Create a new Query Client with a default `gcTime`.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
})

// 3. Set up the persister.
const persister = createSyncStoragePersister({
  serialize,
  storage: window.localStorage,
  deserialize,
})

function App() {
  return (
    <WagmiProvider config={config}>
      {/* 4. Wrap app in PersistQueryClientProvider */}
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {/* ... */}
      </PersistQueryClientProvider>
    </WagmiProvider>
  )
}
Read more about Sync Storage Persistence.

Async Storage
Below is an example of how to set up Wagmi + TanStack Query with async external storage like IndexedDB or AsyncStorage.

Install

pnpm

npm

yarn

bun
bash
pnpm i @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
Usage
tsx
// 1. Import modules.
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { WagmiProvider, deserialize, serialize } from 'wagmi'

// 2. Create a new Query Client with a default `gcTime`.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
})

// 3. Set up the persister.
const persister = createAsyncStoragePersister({
  serialize,
  storage: AsyncStorage,
  deserialize,
})

function App() {
  return (
    <WagmiProvider config={config}>
      {/* 4. Wrap app in PersistQueryClientProvider */}
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {/* ... */}
      </PersistQueryClientProvider>
    </WagmiProvider>
  )
}
Read more about Async Storage Persistence.

Query Keys
Query Keys are typically used to perform advanced operations on the query such as: invalidation, refetching, prefetching, etc.

Wagmi exports Query Keys for every Hook, and they can be retrieved via the Hook (React) or via an Import (Vanilla JS).

Read more about Query Keys on the TanStack Query docs.

Hook (React)
Each Hook returns a queryKey value. You would use this approach when you want to utilize the query key in a React component as it handles reactivity for you, unlike the Import method below.

ts
import { useBlock } from 'wagmi'

function App() {
  const { queryKey } = useBlock()
}
Import (Vanilla JS)
Each Hook has a corresponding get<X>QueryOptions function that returns a query key. You would use this method when you want to utilize the query key outside of a React component in a Vanilla JS context, like in a utility function.

ts
import { getBlockQueryOptions } from 'wagmi/query'
import { config } from './config'

function perform() {
  const { queryKey } = getBlockQueryOptions(config, { 
    chainId: config.state.chainId
  })
}
WARNING

The caveat of this method is that it does not handle reactivity for you (e.g. active account/chain changes, argument changes, etc). You would need to handle this yourself by explicitly passing through the arguments to get<X>QueryOptions.

Invalidating Queries
Invalidating a query is the process of marking the query data as stale (e.g. inactive/unused), and refetching the queries that are already rendered.

Read more about Invalidating Queries on the TanStack Query docs.

Example: Watching a Users' Balance
You may want to "watch" a users' balance, and invalidate the balance after each incoming block. We can invoke invalidateQueries inside a useEffect with the block number as it's only dependency – this will refetch all rendered balance queries when the blockNumber changes.

tsx
import { useQueryClient } from '@tanstack/react-query' 
import { useEffect } from 'react' 
import { useBlockNumber, useBalance } from 'wagmi' 

function App() {
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance()
  
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey })
  }, [blockNumber])

  return <div>{balance}</div>
}
Example: After User Interaction
Maybe you want to invalidate a users' balance after some interaction. This would mark the balance as stale, and consequently refetch all rendered balance queries.

tsx
import { useBalance } from 'wagmi'

function App() {
  // 1. Extract `queryKey` from the useBalance Hook.
  const { queryKey } = useBalance()

  return (
    <button
      onClick={async () => {
        // 2. Invalidate the query when the user clicks "Invalidate".
        await queryClient.invalidateQueries({ queryKey })
      }}
    >
      Invalidate
    </button>
  )
}

function Example() {
  // 3. Other `useBalance` Hooks in your rendered React tree will be refetched!
  const { data: balance } = useBalance()

  return <div>{balance}</div>
}
Fetching Queries
Fetching a query is the process of invoking the query function to retrieve data. If the query exists and the data is not invalidated or older than a given staleTime, then the data from the cache will be returned. Otherwise, the query will fetch for the latest data.


example.tsx

app.tsx

config.ts
tsx
import { getBlockQueryOptions } from 'wagmi'
import { queryClient } from './app'
import { config } from './config'

export async function fetchBlockData() {
  return queryClient.fetchQuery(
    getBlockQueryOptions(config, {
      chainId: config.state.chainId,
    }
  ))
}
Retrieving & Updating Query Data
You can retrieve and update query data imperatively with getQueryData and setQueryData. This is useful for scenarios where you want to retrieve or update a query outside of a React component.

Note that these functions do not invalidate or refetch queries.


example.tsx

app.tsx

config.ts
tsx
import { getBlockQueryOptions } from 'wagmi'
import type { Block } from 'viem'
import { queryClient } from './app'
import { config } from './config'

export function getPendingBlockData() {
  return queryClient.getQueryData(
    getBlockQueryOptions(config, {
      chainId: config.state.chainId,
      tag: 'pending'
    }
  ))
}

export function setPendingBlockData(data: Block) {
  return queryClient.setQueryData(
    getBlockQueryOptions(config, {
      chainId: config.state.chainId,
      tag: 'pending'
    },
    data
  ))
}
Prefetching Queries
Prefetching a query is the process of fetching the data ahead of time and seeding the cache with the returned data. This is useful for scenarios where you want to fetch data before the user navigates to a page, or fetching data on the server to be reused on client hydration.

Read more about Prefetching Queries on the TanStack Query docs.

Example: Prefetching in Event Handler
tsx
import { Link } from 'next/link'
import { getBlockQueryOptions } from 'wagmi'

function App() {
  const config = useConfig()
  const chainId = useChainId()

  // 1. Set up a function to prefetch the block data.
  const prefetch = () =>
    queryClient.prefetchQuery(getBlockQueryOptions(config, { chainId }))
  

  return (
    <Link
      // 2. Add event handlers to prefetch the block data
      // when user hovers over or focuses on the button.
      onMouseEnter={prefetch}
      onFocus={prefetch}
      to="/block-details"
    >
      Block details
    </Link>
  )
}
SSR
It is possible to utilize TanStack Query's SSR strategies with Wagmi Hooks & Query Keys. Check out the Server Rendering & Hydration & Advanced Server Rendering guides.

Devtools
TanStack Query includes dedicated Devtools that assist in visualizing and debugging your queries, their cache states, and much more. You will have to pass a custom queryKeyFn to your QueryClient for Devtools to correctly serialize BigInt values for display. Alternatively, You can use the hashFn from @wagmi/core/query, which already handles this serialization.

Install

pnpm

npm

yarn

bun
bash
pnpm i @tanstack/react-query-devtools
Usage
tsx
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { hashFn } from "@wagmi/core/query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: hashFn,
    },
  },
});
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
Comparisons
Next page
Viem
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Viem
Viem is a low-level TypeScript Interface for Ethereum that enables developers to interact with the Ethereum blockchain, including: JSON-RPC API abstractions, Smart Contract interaction, wallet & signing implementations, coding/parsing utilities and more.

Wagmi Core is essentially a wrapper over Viem that provides multi-chain functionality via Wagmi Config and automatic account management via Connectors.

Leveraging Viem Actions
All of the core Wagmi Hooks are friendly wrappers around Viem Actions that inject a multi-chain and connector aware Wagmi Config.

There may be cases where you might want to dig deeper and utilize Viem Actions directly (maybe a Hook doesn't exist in Wagmi yet). In these cases, you can create your own custom Wagmi Hook by importing Viem Actions directly via viem/actions and plugging in a Viem Client returned by the useClient Hook.

The example below demonstrates two different ways to utilize Viem Actions:

Tree-shakable Actions (recommended): Uses useClient (for public actions) and useConnectorClient (for wallet actions).
Client Actions: Uses usePublicClient (for public actions) and useWalletClient (for wallet actions).
TIP

It is highly recommended to use the tree-shakable method to ensure that you are only pulling modules you use, and keep your bundle size low.


Tree-shakable Actions

Client Actions
tsx
// 1. Import modules. 
import { useMutation, useQuery } from '@tanstack/react-query'
import { http, createConfig, useClient, useConnectorClient } from 'wagmi' 
import { base, mainnet, optimism, zora } from 'wagmi/chains' 
import { getLogs, watchAsset } from 'viem/actions'

// 2. Set up a Wagmi Config 
export const config = createConfig({ 
  chains: [base, mainnet, optimism, zora], 
  transports: { 
    [base.id]: http(), 
    [mainnet.id]: http(), 
    [optimism.id]: http(), 
    [zora.id]: http(), 
  }, 
}) 

function Example() {
  // 3. Extract a Viem Client for the current active chain.
  const publicClient = useClient({ config })

  // 4. Create a "custom" Query Hook that utilizes the Client.
  const { data: logs } = useQuery({
    queryKey: ['logs', publicClient.uid],
    queryFn: () => getLogs(publicClient, /* ... */)
  })
  
  // 5. Extract a Viem Client for the current active chain & account.
  const { data: walletClient } = useConnectorClient({ config })

  // 6. Create a "custom" Mutation Hook that utilizes the Client.
  const { mutate } = useMutation({
    mutationFn: (asset) => watchAsset(walletClient, asset)
  })

  return (
    <div>
      {/* ... */}
    </div>
  )
}
Private Key & Mnemonic Accounts
It is possible to utilize Viem's Private Key & Mnemonic Accounts with Wagmi by explicitly passing through the account via the account argument on Wagmi Actions.

tsx
import { http, createConfig, useSendTransaction } from 'wagmi' 
import { base, mainnet, optimism, zora } from 'wagmi/chains' 
import { parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const config = createConfig({ 
  chains: [base, mainnet, optimism, zora], 
  transports: { 
    [base.id]: http(), 
    [mainnet.id]: http(), 
    [optimism.id]: http(), 
    [zora.id]: http(), 
  }, 
}) 

const account = privateKeyToAccount('0x...')

function Example() {
  const { data: hash } = useSendTransaction({
    account,
    to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    value: parseEther('0.001')
  })
}
INFO

Wagmi currently does not support hoisting Private Key & Mnemonic Accounts to the top-level Wagmi Config – meaning you have to explicitly pass through the account to every Action. If you feel like this is a feature that should be added, please open an discussion.

Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
TanStack Query
Next page
Error Handling
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

SSR
Wagmi uses client-only external stores (such as localStorage and mipd) to show the user the most relevant data as quickly as possible on first render.

However, the caveat of using these external client stores is that frameworks which incorporate SSR (such as Next.js) will throw hydration warnings on the client when it identifies mismatches between the server-rendered HTML and the client-rendered HTML.

To stop this from happening, you can toggle on the ssr property in the Wagmi Config.

tsx
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
Turning on the ssr property means that content from the external stores will be hydrated on the client after the initial mount.

Persistence using Cookies
As a result of turning on the ssr property, external persistent stores like localStorage will be hydrated on the client after the initial mount.

This means that you will still see a flash of "empty" data on the client (e.g. a "disconnected" account instead of a "reconnecting" account, or an empty address instead of the last connected address) until after the first mount, when the store hydrates.

In order to persist data between the server and the client, you can use cookies.

1. Set up cookie storage
First, we will set up cookie storage in the Wagmi Config.

tsx
import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage
} from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}
2. Hydrate the cookie
Next, we will need to add some mechanisms to hydrate the stored cookie in Wagmi.

Next.js App Directory
In our app/layout.tsx file (a Server Component), we will need to extract the cookie from the headers function and pass it to cookieToInitialState.

We will need to pass this result to the initialState property of the WagmiProvider. The WagmiProvider must be in a Client Component tagged with "use client" (see app/providers.tsx tab).


app/layout.tsx

app/providers.tsx

app/config.ts
tsx
import { type ReactNode } from 'react'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from './config'
import { Providers } from './providers'

export default function Layout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  )
  return (
    <html lang="en">
      <body>
        <Providers>
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
Next.js Pages Directory
Would you like to contribute this content? Feel free to open a Pull Request!

Vanilla SSR
Would you like to contribute this content? Feel free to open a Pull Request!

Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
Chain Properties
Next page
Connect Wallet
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Connect Wallet
The ability for a user to connect their wallet is a core function for any Dapp. It allows users to perform tasks such as: writing to contracts, signing messages, or sending transactions.

Wagmi contains everything you need to get started with building a Connect Wallet module. To get started, you can either use a third-party library or build your own.

Third-party Libraries
You can use a pre-built Connect Wallet module from a third-party library such as:

ConnectKit - Guide
AppKit - Guide
RainbowKit - Guide
Dynamic - Guide
Privy - Guide
The above libraries are all built on top of Wagmi, handle all the edge cases around wallet connection, and provide a seamless Connect Wallet UX that you can use in your Dapp.

Build Your Own
Wagmi provides you with the Hooks to get started building your own Connect Wallet module.

It takes less than five minutes to get up and running with Browser Wallets, WalletConnect, and Coinbase Wallet.

1. Configure Wagmi
Before we get started with building the functionality of the Connect Wallet module, we will need to set up the Wagmi configuration.

Let's create a config.ts file and export a config object.


config.ts
tsx
import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
In the above configuration, we want to set up connectors for Injected (browser), WalletConnect (browser + mobile), MetaMask, and Safe wallets. This configuration uses the Mainnet and Base chains, but you can use whatever you want.

WARNING

Make sure to replace the projectId with your own WalletConnect Project ID, if you wish to use WalletConnect!

Get your Project ID

2. Wrap App in Context Provider
Next, we will need to wrap our React App with Context so that our application is aware of Wagmi & React Query's reactive state and in-memory caching.


app.tsx

config.ts
tsx
 // 1. Import modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'

// 2. Set up a React Query client.
const queryClient = new QueryClient()

function App() {
  // 3. Wrap app with Wagmi and React Query context.
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        {/** ... */} 
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
3. Display Wallet Options
After that, we will create a WalletOptions component that will display our connectors. This will allow users to select a wallet and connect.

Below, we are rendering a list of connectors retrieved from useConnect. When the user clicks on a connector, the connect function will connect the users' wallet.


wallet-options.tsx

app.tsx

config.ts
tsx
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}
4. Display Connected Account
Lastly, if an account is connected, we want to show some basic information, like the connected address and ENS name and avatar.

Below, we are using hooks like useAccount, useEnsAvatar and useEnsName to extract this information.

We are also utilizing useDisconnect to show a "Disconnect" button so a user can disconnect their wallet.


account.tsx

wallet-options.tsx

app.tsx

config.ts
tsx
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
5. Wire it up!
Finally, we can wire up our Wallet Options and Account components to our application's entrypoint.


app.tsx

account.tsx

wallet-options.tsx


tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { Account } from './account'
import { WalletOptions } from './wallet-options'

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <ConnectWallet />
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
Playground
Want to see the above steps all wired up together in an end-to-end example? Check out the below StackBlitz playground.



Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
SSR
Next page
Send Transaction
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Send Transaction
The following guide teaches you how to send transactions in Wagmi. The example below builds on the Connect Wallet guide and uses the useSendTransaction & useWaitForTransaction hooks.

Example
Feel free to check out the example before moving on:


Steps
1. Connect Wallet
Follow the Connect Wallet guide guide to get this set up.

2. Create a new component
Create your SendTransaction component that will contain the send transaction logic.


send-transaction.tsx
tsx
import * as React from 'react'
 
export function SendTransaction() {
  return (
    <form>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
    </form>
  )
}
3. Add a form handler
Next, we will need to add a handler to the form that will send the transaction when the user hits "Send". This will be a basic handler in this step.


send-transaction.tsx
tsx
import * as React from 'react'
 
export function SendTransaction() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
  }

  return (
    <form>
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
    </form>
  )
}
4. Hook up the useSendTransaction Hook
Now that we have the form handler, we can hook up the useSendTransaction Hook to send the transaction.


send-transaction.tsx
tsx
import * as React from 'react'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
 
export function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction()

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) })
  } 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  )
}
5. Add loading state (optional)
We can optionally add a loading state to the "Send" button while we are waiting confirmation from the user's wallet.


send-transaction.tsx
tsx
import * as React from 'react'
import { useSendTransaction } from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash, 
    isPending,
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending}
        type="submit"
      >
        Send
        {isPending ? 'Confirming...' : 'Send'}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>} 
    </form>
  )
}
6. Wait for transaction receipt (optional)
We can also display the transaction confirmation status to the user by using the useWaitForTransactionReceipt Hook.


send-transaction.tsx
tsx
import * as React from 'react'
import { 
  useSendTransaction, 
  useWaitForTransactionReceipt
} from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash, 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>} 
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
    </form>
  )
}
7. Handle errors (optional)
If the user rejects the transaction, or the user does not have enough funds to cover the transaction, we can display an error message to the user.


send-transaction.tsx
tsx
import * as React from 'react'
import { 
  type BaseError,
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash,
    error,
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>} 
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  )
}
8. Wire it up!
Finally, we can wire up our Send Transaction component to our application's entrypoint.


app.tsx

send-transaction.tsx

config.ts
tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { SendTransaction } from './send-transaction'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <SendTransaction />
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
See the Example.

Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
Connect Wallet
Next page
Read from Contract
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

FAQ / Troubleshooting
Collection of frequently asked questions with ideas on how to troubleshoot and resolve them.

Type inference doesn't work
Check that you set up TypeScript correctly with "strict": true in your tsconfig.json (TypeScript docs)
Check that you const-asserted any ABIs or Typed Data you are using.
Restart your language server or IDE, and check for type errors in your code.
My wallet doesn't work
If you run into issues with a specific wallet, try another before opening up an issue. There are many different wallets and it's likely that the issue is with the wallet itself, not Wagmi. For example, if you are using Wallet X and sending a transaction doesn't work, try Wallet Y and see if it works.

BigInt Serialization
Using native BigInt with JSON.stringify will raise a TypeError as BigInt values are not serializable. There are two techniques to mitigate this:

Lossless serialization
Lossless serialization means that BigInt will be converted to a format that can be deserialized later (e.g. 69420n → "#bigint.69420"). The trade-off is that these values are not human-readable and are not intended to be displayed to the user.

Lossless serialization can be achieved with wagmi's serialize and deserialize utilities.

tsx
import { serialize, deserialize } from 'wagmi'

const serialized = serialize({ value: 69420n })
// '{"value":"#bigint.69420"}'

const deserialized = deserialize(serialized)
// { value: 69420n }
Lossy serialization
Lossy serialization means that the BigInt will be converted to a normal display string (e.g. 69420n → '69420'). The trade-off is that you will not be able to deserialize the BigInt with JSON.parse as it can not distinguish between a normal string and a BigInt.

This method can be achieved by modifying JSON.stringify to include a BigInt replacer:

tsx
const replacer = (key, value) =>
  typeof value === 'bigint' ? value.toString() : value

JSON.stringify({ value: 69420n }, replacer)
// '{"value":"69420"}'
How do I support the project?
Wagmi is an open source software project and free to use. If you enjoy using Wagmi or would like to support Wagmi development, you can:

Become a sponsor on GitHub
Send us crypto
Mainnet: 0x4557B18E779944BFE9d78A672452331C186a9f48
Multichain: 0xd2135CfB216b74109775236E36d4b433F1DF507B
Become a supporter on Drips
If you use Wagmi at work, consider asking your company to sponsor Wagmi. This may not be easy, but business sponsorships typically make a much larger impact on the sustainability of OSS projects than individual donations, so you will help us much more if you succeed.

Is Wagmi production ready?
Yes. Wagmi is very stable and is used in production by thousands of organizations, like Stripe, Shopify, Coinbase, Uniswap, ENS, Optimism.

Is Wagmi strict with semver?
Yes, Wagmi is very strict with semantic versioning and we will never introduce breaking changes to the runtime API in a minor version bump.

For exported types, we try our best to not introduce breaking changes in non-major versions, however, TypeScript doesn't follow semver and often introduces breaking changes in minor releases that can cause Wagmi type issues. See the TypeScript docs for more information.

How can I contribute to Wagmi?
The Wagmi team accepts all sorts of contributions. Check out the Contributing guide to get started. If you are interested in adding a new connector to Wagmi, check out the Creating Connectors guide.

Anything else you want to know?
Please create a new GitHub Discussion thread. You're also free to suggest changes to this or any other page on the site using the "Suggest changes to this page" button at the bottom of the page.

How does Wagmi work?
Until there's a more in-depth write-up about Wagmi internals, here is the gist:

Wagmi is essentially a wrapper around Viem and TanStack Query that adds connector and multichain support.
Connectors allow Wagmi and Ethereum accounts to communicate with each other.
The Wagmi Config manages connections established between Wagmi and Connectors, as well as some global state. Connections come with one or more addresses and a chain ID.
If there are connections, the Wagmi Config listens for connection changes and updates the chainId based on the "current" connection. (The Wagmi Config can have many connections established at once, but only one connection can be the "current" connection. Usually this is the connection from the last connector that is connected, but can changed based on event emitted from other connectors or through the useSwitchAccount hook and switchAccount action.)
If there are no connections, the Wagmi Config defaults the global state chainId to the first chain it was created with or last established connection.
The global chainId can be changed directly using the useSwitchChain hook and switchChain action. This works when there are no connections as well as for most connectors (not all connectors support chain switching).
Wagmi uses the global chainId (from the "current" connection or global state) to internally create Viem Client's, which are used by hooks and actions.
Hooks are constructed by TanStack Query options helpers, exported by the '@wagmi/core/query' entrypoint, and some additional code to wire up type parameters, hook into React Context, etc.
There are three types of hooks: query hooks, mutation hooks, and config hooks. Query hooks, like useCall, generally read blockchain state and mutation hooks, like useSendTransaction, usually change state through sending transactions via the "current" connection. Config hooks are for getting data from and managing the Wagmi Config instance, e.g. useChainId and useSwitchAccount. Query and mutation hooks usually have corresponding Viem actions.
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
Write to Contract
Next page
Migrate from v1 to v2

Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

createStorage
Creates new Storage object.

Import
ts
import { createStorage } from 'wagmi'
Usage
ts
import { createStorage } from 'wagmi'

const storage = createStorage({ storage: localStorage })
Parameters
ts
import { type CreateStorageParameters } from 'wagmi'
deserialize
(<T>(value: string) => T) | undefined

Function to deserialize data from storage.
Defaults to deserialize.
ts
import { createStorage, deserialize } from 'wagmi'

const storage = createStorage({
  deserialize, 
  storage: localStorage,
})
WARNING

If you use a custom deserialize function, make sure it can handle bigint and Map values.

key
string | undefined

Key prefix to use when persisting data.
Defaults to 'wagmi'.
ts
import { createStorage } from 'wagmi'

const storage = createStorage({
  key: 'my-app', 
  storage: localStorage,
})
serialize
(<T>(value: T) => string) | undefined

Function to serialize data for storage.
Defaults to serialize.
ts
import { createStorage, serialize } from 'wagmi'

const storage = createStorage({
  serialize, 
  storage: localStorage,
})
WARNING

If you use a custom serialize function, make sure it can handle bigint and Map values.

storage
{ getItem(key: string): string | null | undefined | Promise<string | null | undefined>; setItem(key: string, value: string): void | Promise<void>; removeItem(key: string): void | Promise<void>; }

Storage interface to use for persisting data.
Defaults to localStorage.
Supports synchronous and asynchronous storage methods.
ts
import { createStorage } from 'wagmi'
// Using IndexedDB via https://github.com/jakearchibald/idb-keyval
import { del, get, set } from 'idb-keyval'

const storage = createStorage({
  storage: { 
    async getItem(name) { 
      return get(name)
    }, 
    async setItem(name, value) { 
      await set(name, value) 
    }, 
    async removeItem(name) { 
      await del(name) 
    }, 
  }, 
})
Return Type
ts
import { type Storage } from 'wagmi'
Storage
Object responsible for persisting Wagmi State and other data.

ts
import { type Storage } from 'wagmi'
getItem
getItem(key: string, defaultValue?: value | null | undefined): value | null | Promise<value | null>

ts
import { createStorage } from 'wagmi'

const storage = createStorage({ storage: localStorage })
const recentConnectorId = storage.getItem('recentConnectorId')
setItem
setItem(key: string, value: any): void | Promise<void>

ts
import { createStorage } from 'wagmi'

const storage = createStorage({ storage: localStorage })
storage.setItem('recentConnectorId', 'foo')
removeItem
removeItem(key: string): void | Promise<void>

ts
import { createStorage } from 'wagmi'

const storage = createStorage({ storage: localStorage })
storage.removeItem('recentConnectorId')
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
createConfig
Next page
Chains
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
coinbaseWallet

injected

metaMask

mock

safe

walletConnect

Transports
custom (EIP-1193)

fallback

http

unstable_connector

webSocket

WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Transports
createConfig can be instantiated with a set of Transports for each chain. A Transport is the intermediary layer that is responsible for executing outgoing JSON-RPC requests to the RPC Provider (e.g. Alchemy, Infura, etc).

Import
ts
import { http } from 'wagmi'
Built-In Transports
Available via the 'wagmi' entrypoint.

custom (EIP-1193)
fallback
http
unstable_connector
webSocket
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
walletConnect
Next page
custom (EIP-1193)
Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
coinbaseWallet

injected

metaMask

mock

safe

walletConnect

Transports
custom (EIP-1193)

fallback

http

unstable_connector

webSocket

WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

useBlockNumber
Hook for fetching the number of the most recent block seen.

Import
ts
import { useBlockNumber } from 'wagmi'
Usage

index.tsx

config.ts
tsx
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber()
}
Parameters
ts
import { type UseBlockNumberParameters } from 'wagmi'
cacheTime
number | undefined

Time in milliseconds that cached block number will remain in memory.


index.tsx

config.ts
tsx
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber({
    cacheTime: 4_000,
  })
}
chainId
config['chains'][number]['id'] | undefined

ID of chain to use when fetching data.


index.tsx

config.ts
tsx
import { useBlockNumber } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useBlockNumber({
    chainId: mainnet.id,
  })
}
config
Config | undefined

Config to use instead of retrieving from the from nearest WagmiProvider.


index.tsx

config.ts
tsx
import { useBlockNumber } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBlockNumber({
    config,
  })
}
scopeKey
string | undefined

Scopes the cache to a given context. Hooks that have identical context will share the same cache.


index.tsx

config.ts
tsx
import { useBlockNumber } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBlockNumber({
    scopeKey: 'foo',
  })
}
watch
boolean | UseWatchBlockNumberParameters | undefined

Enables/disables listening for block number changes.
Can pass a subset of UseWatchBlockNumberParametersdirectly to useWatchBlockNumber.

index.tsx

index-2.tsx

config.ts
tsx
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber({
    watch: true,
  })
}

query
TanStack Query parameters. See the TanStack Query query docs for more info.

Wagmi does not support passing all TanStack Query parameters

TanStack Query parameters, like queryFn and queryKey, are used internally to make Wagmi work and you cannot override them. Check out the source to see what parameters are not supported. All parameters listed below are supported.

enabled
boolean | undefined

Set this to false to disable this query from automatically running.
Can be used for Dependent Queries.
gcTime
number | Infinity | undefined

Defaults to 5 * 60 * 1000 (5 minutes) or Infinity during SSR
The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different garbage collection times are specified, the longest one will be used.
If set to Infinity, will disable garbage collection
initialData
bigint | (() => bigint) | undefined

If set, this value will be used as the initial data for the query cache (as long as the query hasn't been created or cached yet)
If set to a function, the function will be called once during the shared/root query initialization, and be expected to synchronously return the initialData
Initial data is considered stale by default unless a staleTime has been set.
initialData is persisted to the cache
initialDataUpdatedAt
number | ((() => number | undefined)) | undefined

If set, this value will be used as the time (in milliseconds) of when the initialData itself was last updated.

meta
Record<string, unknown> | undefined

If set, stores additional information on the query cache entry that can be used as needed. It will be accessible wherever the query is available, and is also part of the QueryFunctionContext provided to the queryFn.

networkMode
online' | 'always' | 'offlineFirst' | undefined

Defaults to 'online'
see Network Mode for more information.
notifyOnChangeProps
string[] | 'all' | (() => string[] | 'all') | undefined

If set, the component will only re-render if any of the listed properties change.
If set to ['data', 'error'] for example, the component will only re-render when the data or error properties change.
If set to 'all', the component will opt-out of smart tracking and re-render whenever a query is updated.
If set to a function, the function will be executed to compute the list of properties.
By default, access to properties will be tracked, and the component will only re-render when one of the tracked properties change.
placeholderData
bigint | ((previousValue: bigint | undefined; previousQuery: Query | undefined) => bigint) | undefined

If set, this value will be used as the placeholder data for this particular query observer while the query is still in the pending state.
placeholderData is not persisted to the cache
If you provide a function for placeholderData, as a first argument you will receive previously watched query data if available, and the second argument will be the complete previousQuery instance.
queryClient
QueryClient | undefined

Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

refetchInterval
number | false | ((data: bigint | undefined, query: Query) => number | false | undefined) | undefined

If set to a number, all queries will continuously refetch at this frequency in milliseconds
If set to a function, the function will be executed with the latest data and query to compute a frequency
refetchIntervalInBackground
boolean | undefined

If set to true, queries that are set to continuously refetch with a refetchInterval will continue to refetch while their tab/window is in the background

refetchOnMount
boolean | 'always' | ((query: Query) => boolean | 'always') | undefined

Defaults to true
If set to true, the query will refetch on mount if the data is stale.
If set to false, the query will not refetch on mount.
If set to 'always', the query will always refetch on mount.
If set to a function, the function will be executed with the query to compute the value
refetchOnReconnect
boolean | 'always' | ((query: Query) => boolean | 'always') | undefined

Defaults to true
If set to true, the query will refetch on reconnect if the data is stale.
If set to false, the query will not refetch on reconnect.
If set to 'always', the query will always refetch on reconnect.
If set to a function, the function will be executed with the query to compute the value
refetchOnWindowFocus
boolean | 'always' | ((query: Query) => boolean | 'always') | undefined

Defaults to true
If set to true, the query will refetch on window focus if the data is stale.
If set to false, the query will not refetch on window focus.
If set to 'always', the query will always refetch on window focus.
If set to a function, the function will be executed with the query to compute the value
retry
boolean | number | ((failureCount: number, error: GetBlockNumberErrorType) => boolean) | undefined

If false, failed queries will not retry by default.
If true, failed queries will retry infinitely.
If set to a number, e.g. 3, failed queries will retry until the failed query count meets that number.
Defaults to 3 on the client and 0 on the server
retryDelay
number | ((retryAttempt: number, error: GetBlockNumberErrorType) => number) | undefined

This function receives a retryAttempt integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
A function like attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000) applies exponential backoff.
A function like attempt => attempt * 1000 applies linear backoff.
retryOnMount
boolean | undefined

If set to false, the query will not be retried on mount if it contains an error. Defaults to true.

select
((data: bigint) => unknown) | undefined

This option can be used to transform or select a part of the data returned by the query function. It affects the returned data value, but does not affect what gets stored in the query cache.

staleTime
number | Infinity | undefined

Defaults to 0
The time in milliseconds after data is considered stale. This value only applies to the hook it is defined on.
If set to Infinity, the data will never be considered stale
structuralSharing
boolean | (((oldData: bigint | undefined, newData: bigint) => bigint)) | undefined

Defaults to true
If set to false, structural sharing between query results will be disabled.
If set to a function, the old and new data values will be passed through this function, which should combine them into resolved data for the query. This way, you can retain references from the old data to improve performance even when that data contains non-serializable values.
Return Type
ts
import { type UseBlockNumberReturnType } from 'wagmi'

TanStack Query query docs

data
bigint

The last successfully resolved data for the query.
Defaults to undefined.
dataUpdatedAt
number

The timestamp for when the query most recently returned the status as 'success'.

error
null | GetBlockNumberErrorType

The error object for the query, if an error was thrown.
Defaults to null
errorUpdatedAt
number

The timestamp for when the query most recently returned the status as 'error'.

errorUpdateCount
number

The sum of all errors.

failureCount
number

The failure count for the query.
Incremented every time the query fails.
Reset to 0 when the query succeeds.
failureReason
null | GetBlockNumberErrorType

The failure reason for the query retry.
Reset to null when the query succeeds.
fetchStatus
'fetching' | 'idle' | 'paused'

fetching Is true whenever the queryFn is executing, which includes initial pending as well as background refetches.
paused The query wanted to fetch, but has been paused.
idle The query is not fetching.
See Network Mode for more information.
isError / isPending / isSuccess
boolean

Boolean variables derived from status.

isFetched
boolean

Will be true if the query has been fetched.

isFetchedAfterMount
boolean

Will be true if the query has been fetched after the component mounted.
This property can be used to not show any previously cached data.
isFetching / isPaused
boolean

Boolean variables derived from fetchStatus.

isLoading
boolean

Is true whenever the first fetch for a query is in-flight
Is the same as isFetching && isPending
isLoadingError
boolean

Will be true if the query failed while fetching for the first time.

isPlaceholderData
boolean

Will be true if the data shown is the placeholder data.

isRefetchError
boolean

Will be true if the query failed while refetching.

isRefetching
boolean

Is true whenever a background refetch is in-flight, which does not include initial 'pending'.
Is the same as isFetching && !isPending
isStale
boolean

Will be true if the data in the cache is invalidated or if the data is older than the given staleTime.

refetch
(options: { cancelRefetch?: boolean | undefined; throwOnError?: boolean | undefined }) => Promise<UseQueryResult<bigint, GetBlockNumberErrorType>>

A function to manually refetch the query.
throwOnError
When set to true, an error will be thrown if the query fails.
When set to false, an error will be logged if the query fails.
cancelRefetch
When set to true, a currently running request will be cancelled before a new request is made.
When set to false, no refetch will be made if there is already a request running.
Defaults to true
status
'error' | 'pending' | 'success'

pending if there's no cached data and no query attempt was finished yet.
error if the query attempt resulted in an error. The corresponding error property has the error received from the attempted fetch
success if the query has received a response with no errors and is ready to display its data. The corresponding data property on the query is the data received from the successful fetch or if the query's enabled property is set to false and has not been fetched yet data is the first initialData supplied to the query on initialization.
TanStack Query
ts
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from 'wagmi/query'
Action
getBlockNumber
watchBlockNumber
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM

Pager
Previous page
useBalance
Next page
useBlock
useBytecode
Hook for retrieving the bytecode at an address.

Import
ts
import { useBytecode } from 'wagmi'
Usage

index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
Parameters
ts
import { type UseBytecodeParameters } from 'wagmi'
address
Address | undefined

The contract address.


index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
blockNumber
bigint | undefined

The block number to check the bytecode at.


index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    blockNumber: 16280770n,
  })
}
blockTag
'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined

The block tag to check the bytecode at.


index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    blockTag: 'safe',
  })
}
chainId
config['chains'][number]['id'] | undefined

The chain ID to check the bytecode at.


index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useBytecode({
    chainId: mainnet.id,
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
config
Config | undefined

Config to use instead of retrieving from the from nearest WagmiProvider.


index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBytecode({
    config,
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
scopeKey
string | undefined

Scopes the cache to a given context. Hooks that have identical context will share the same cache.


index.tsx

config.ts
tsx
import { useBytecode } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBytecode({
    scopeKey: 'foo'
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}

query
TanStack Query parameters. See the TanStack Query query docs for more info.

Wagmi does not support passing all TanStack Query parameters

TanStack Query parameters, like queryFn and queryKey, are used internally to make Wagmi work and you cannot override them. Check out the source to see what parameters are not supported. All parameters listed below are supported.

enabled
boolean | undefined

Set this to false to disable this query from automatically running.
Can be used for Dependent Queries.
gcTime
number | Infinity | undefined

Defaults to 5 * 60 * 1000 (5 minutes) or Infinity during SSR
The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different garbage collection times are specified, the longest one will be used.
If set to Infinity, will disable garbage collection
initialData
GetBytecodeData | (() => GetBytecodeData) | undefined

If set, this value will be used as the initial data for the query cache (as long as the query hasn't been created or cached yet)
If set to a function, the function will be called once during the shared/root query initialization, and be expected to synchronously return the initialData
Initial data is considered stale by default unless a staleTime has been set.
initialData is persisted to the cache
initialDataUpdatedAt
number | ((() => number | undefined)) | undefined

If set, this value will be used as the time (in milliseconds) of when the initialData itself was last updated.

meta
Record<string, unknown> | undefined

If set, stores additional information on the query cache entry that can be used as needed. It will be accessible wherever the query is available, and is also part of the QueryFunctionContext provided to the queryFn.

networkMode
online' | 'always' | 'offlineFirst' | undefined

Defaults to 'online'
see Network Mode for more information.
notifyOnChangeProps
string[] | 'all' | (() => string[] | 'all') | undefined

If set, the component will only re-render if any of the listed properties change.
If set to ['data', 'error'] for example, the component will only re-render when the data or error properties change.
If set to 'all', the component will opt-out of smart tracking and re-render whenever a query is updated.
If set to a function, the function will be executed to compute the list of properties.
By default, access to properties will be tracked, and the component will only re-render when one of the tracked properties change.
placeholderData
GetBytecodeData | ((previousValue: GetBytecodeData | undefined; previousQuery: Query | undefined) => GetBytecodeData) | undefined

If set, this value will be used as the placeholder data for this particular query observer while the query is still in the pending state.
placeholderData is not persisted to the cache
If you provide a function for placeholderData, as a first argument you will receive previously watched query data if available, and the second argument will be the complete previousQuery instance.
queryClient
QueryClient | undefined

Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

refetchInterval
number | false | ((data: GetBytecodeData | undefined, query: Query) => number | false | undefined) | undefined

If set to a number, all queries will continuously refetch at this frequency in milliseconds
If set to a function, the function will be executed with the latest data and query to compute a frequency
refetchIntervalInBackground
boolean | undefined

If set to true, queries that are set to continuously refetch with a refetchInterval will continue to refetch while their tab/window is in the background

refetchOnMount
boolean | 'always' | ((query: Query) => boolean | 'always') | undefined

Defaults to true
If set to true, the query will refetch on mount if the data is stale.
If set to false, the query will not refetch on mount.
If set to 'always', the query will always refetch on mount.
If set to a function, the function will be executed with the query to compute the value
refetchOnReconnect
boolean | 'always' | ((query: Query) => boolean | 'always') | undefined

Defaults to true
If set to true, the query will refetch on reconnect if the data is stale.
If set to false, the query will not refetch on reconnect.
If set to 'always', the query will always refetch on reconnect.
If set to a function, the function will be executed with the query to compute the value
refetchOnWindowFocus
boolean | 'always' | ((query: Query) => boolean | 'always') | undefined

Defaults to true
If set to true, the query will refetch on window focus if the data is stale.
If set to false, the query will not refetch on window focus.
If set to 'always', the query will always refetch on window focus.
If set to a function, the function will be executed with the query to compute the value
retry
boolean | number | ((failureCount: number, error: GetBytecodeErrorType) => boolean) | undefined

If false, failed queries will not retry by default.
If true, failed queries will retry infinitely.
If set to a number, e.g. 3, failed queries will retry until the failed query count meets that number.
Defaults to 3 on the client and 0 on the server
retryDelay
number | ((retryAttempt: number, error: GetBytecodeErrorType) => number) | undefined

This function receives a retryAttempt integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
A function like attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000) applies exponential backoff.
A function like attempt => attempt * 1000 applies linear backoff.
retryOnMount
boolean | undefined

If set to false, the query will not be retried on mount if it contains an error. Defaults to true.

select
((data: GetBytecodeData) => unknown) | undefined

This option can be used to transform or select a part of the data returned by the query function. It affects the returned data value, but does not affect what gets stored in the query cache.

staleTime
number | Infinity | undefined

Defaults to 0
The time in milliseconds after data is considered stale. This value only applies to the hook it is defined on.
If set to Infinity, the data will never be considered stale
structuralSharing
boolean | (((oldData: GetBytecodeData | undefined, newData: GetBytecodeData) => GetBytecodeData)) | undefined

Defaults to true
If set to false, structural sharing between query results will be disabled.
If set to a function, the old and new data values will be passed through this function, which should combine them into resolved data for the query. This way, you can retain references from the old data to improve performance even when that data contains non-serializable values.
Return Type
ts
import { type UseBytecodeReturnType } from 'wagmi'

TanStack Query query docs

data
GetBytecodeData

The last successfully resolved data for the query.
Defaults to undefined.
dataUpdatedAt
number

The timestamp for when the query most recently returned the status as 'success'.

error
null | GetBytecodeErrorType

The error object for the query, if an error was thrown.
Defaults to null
errorUpdatedAt
number

The timestamp for when the query most recently returned the status as 'error'.

errorUpdateCount
number

The sum of all errors.

failureCount
number

The failure count for the query.
Incremented every time the query fails.
Reset to 0 when the query succeeds.
failureReason
null | GetBytecodeErrorType

The failure reason for the query retry.
Reset to null when the query succeeds.
fetchStatus
'fetching' | 'idle' | 'paused'

fetching Is true whenever the queryFn is executing, which includes initial pending as well as background refetches.
paused The query wanted to fetch, but has been paused.
idle The query is not fetching.
See Network Mode for more information.
isError / isPending / isSuccess
boolean

Boolean variables derived from status.

isFetched
boolean

Will be true if the query has been fetched.

isFetchedAfterMount
boolean

Will be true if the query has been fetched after the component mounted.
This property can be used to not show any previously cached data.
isFetching / isPaused
boolean

Boolean variables derived from fetchStatus.

isLoading
boolean

Is true whenever the first fetch for a query is in-flight
Is the same as isFetching && isPending
isLoadingError
boolean

Will be true if the query failed while fetching for the first time.

isPlaceholderData
boolean

Will be true if the data shown is the placeholder data.

isRefetchError
boolean

Will be true if the query failed while refetching.

isRefetching
boolean

Is true whenever a background refetch is in-flight, which does not include initial 'pending'.
Is the same as isFetching && !isPending
isStale
boolean

Will be true if the data in the cache is invalidated or if the data is older than the given staleTime.

refetch
(options: { cancelRefetch?: boolean | undefined; throwOnError?: boolean | undefined }) => Promise<UseQueryResult<GetBytecodeData, GetBytecodeErrorType>>

A function to manually refetch the query.
throwOnError
When set to true, an error will be thrown if the query fails.
When set to false, an error will be logged if the query fails.
cancelRefetch
When set to true, a currently running request will be cancelled before a new request is made.
When set to false, no refetch will be made if there is already a request running.
Defaults to true
status
'error' | 'pending' | 'success'

pending if there's no cached data and no query attempt was finished yet.
error if the query attempt resulted in an error. The corresponding error property has the error received from the attempted fetch
success if the query has received a response with no errors and is ready to display its data. The corresponding data property on the query is the data received from the successful fetch or if the query's enabled property is set to false and has not been fetched yet data is the first initialData supplied to the query on initialization.
TanStack Query
ts
import {
  type GetBytecodeData,
  type GetBytecodeOptions,
  type GetBytecodeQueryFnData,
  type GetBytecodeQueryKey,
  getBytecodeQueryKey,
  getBytecodeQueryOptions,
} from 'wagmi/query'
useDeployContract viem@>=2.8.18
Hook for deploying a contract to the network, given bytecode, and constructor arguments.

Import
ts
import { useDeployContract } from 'wagmi'
Usage

index.tsx

abi.ts

config.ts
tsx
import { useDeployContract } from 'wagmi'
import { parseEther } from 'viem'
import { wagmiAbi } from './abi'

function App() {
  const { deployContract } = useDeployContract()

  return (
    <button
      onClick={() =>
        deployContract({
          abi: wagmiAbi,
          bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
        })
      }
    >
      Deploy Contract
    </button>
  )
}
Deploying with Constructor Args

index.tsx

abi.ts

config.ts
tsx
import { useDeployContract } from 'wagmi'
import { parseEther } from 'viem'
import { wagmiAbi } from './abi'

function App() {
  const { deployContract } = useDeployContract()

  return (
    <button
      onClick={() =>
        deployContract({
          abi: wagmiAbi,
          args: [69420],
          bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
        })
      }
    >
      Deploy Contract
    </button>
  )
}
Parameters
ts
import { type useDeployContractParameters } from 'wagmi'
config
Config | undefined

Config to use instead of retrieving from the from nearest WagmiProvider.


index.tsx

config.ts
tsx
import { useDeployContract } from 'wagmi'
import { config } from './config'

function App() {
  const result = useDeployContract({
    config,
  })
}

mutation
TanStack Query parameters. See the TanStack Query mutation docs for more info.

Wagmi does not support passing all TanStack Query parameters

TanStack Query parameters, like mutationFn and mutationKey, are used internally to make Wagmi work and you cannot override them. Check out the source to see what parameters are not supported. All parameters listed below are supported.

gcTime
number | Infinity | undefined

The time in milliseconds that unused/inactive cache data remains in memory. When a mutation's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different cache times are specified, the longest one will be used.
If set to Infinity, will disable garbage collection
meta
Record<string, unknown> | undefined

If set, stores additional information on the mutation cache entry that can be used as needed. It will be accessible wherever deployContract is available (e.g. onError, onSuccess functions).

networkMode
'online' | 'always' | 'offlineFirst' | undefined

defaults to 'online'
see Network Mode for more information.
onError
((error: DeployContractErrorType, variables: DeployContractVariables, context?: context | undefined) => Promise<unknown> | unknown) | undefined

This function will fire if the mutation encounters an error and will be passed the error.

onMutate
((variables: DeployContractVariables) => Promise<context | void> | context | void) | undefined

This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
Useful to perform optimistic updates to a resource in hopes that the mutation succeeds
The value returned from this function will be passed to both the onError and onSettled functions in the event of a mutation failure and can be useful for rolling back optimistic updates.
onSuccess
((data: DeployContractData, variables: DeployContractVariables, context?: context | undefined) => Promise<unknown> | unknown) | undefined

This function will fire when the mutation is successful and will be passed the mutation's result.

onSettled
((data: DeployContractData, error: DeployContractErrorType, variables: DeployContractVariables, context?: context | undefined) => Promise<unknown> | unknown) | undefined

This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error

queryClient
QueryClient

Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

retry
boolean | number | ((failureCount: number, error: DeployContractErrorType) => boolean) | undefined

Defaults to 0.
If false, failed mutations will not retry.
If true, failed mutations will retry infinitely.
If set to an number, e.g. 3, failed mutations will retry until the failed mutations count meets that number.
retryDelay
number | ((retryAttempt: number, error: DeployContractErrorType) => number) | undefined

This function receives a retryAttempt integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
A function like attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000) applies exponential backoff.
A function like attempt => attempt * 1000 applies linear backoff.
Return Type
ts
import { type useDeployContractReturnType } from 'wagmi'

TanStack Query mutation docs

deployContract
(variables: DeployContractVariables, { onSuccess, onSettled, onError }) => void

The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options.

variables
DeployContractVariables

The variables object to pass to the deployContract action.

onSuccess
(data: DeployContractData, variables: DeployContractVariables, context: TContext) => void

This function will fire when the mutation is successful and will be passed the mutation's result.

onError
(error: DeployContractErrorType, variables: DeployContractVariables, context: TContext | undefined) => void

This function will fire if the mutation encounters an error and will be passed the error.

onSettled
(data: DeployContractData | undefined, error: DeployContractErrorType | null, variables: DeployContractVariables, context: TContext | undefined) => void

This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
If you make multiple requests, onSuccess will fire only after the latest call you've made.
deployContractAsync
(variables: DeployContractVariables, { onSuccess, onSettled, onError }) => Promise<DeployContractData>

Similar to deployContract but returns a promise which can be awaited.

data
DeployContractData | undefined

deployContract return type
Defaults to undefined
The last successfully resolved data for the mutation.
error
DeployContractErrorType | null

The error object for the mutation, if an error was encountered.

failureCount
number

The failure count for the mutation.
Incremented every time the mutation fails.
Reset to 0 when the mutation succeeds.
failureReason
DeployContractErrorType | null

The failure reason for the mutation retry.
Reset to null when the mutation succeeds.
isError / isIdle / isPending / isSuccess
boolean

Boolean variables derived from status.

isPaused
boolean

will be true if the mutation has been paused.
see Network Mode for more information.
reset
() => void

A function to clean the mutation internal state (e.g. it resets the mutation to its initial state).

status
'idle' | 'pending' | 'error' | 'success'

'idle' initial status prior to the mutation function executing.
'pending' if the mutation is currently executing.
'error' if the last mutation attempt resulted in an error.
'success' if the last mutation attempt was successful.
submittedAt
number

The timestamp for when the mutation was submitted.
Defaults to 0.
variables
DeployContractVariables | undefined

The variables object passed to deployContract.
Defaults to undefined.
TanStack Query
ts
import {
  type DeployContractData,
  type DeployContractVariables,
  type DeployContractMutate,
  type DeployContractMutateAsync,
  deployContractMutationOptions,
} from 'wagmi/query'
usePublicClient
Hook for getting Viem PublicClient instance.

Import
ts
import { usePublicClient } from 'wagmi'
Usage

index.tsx

config.ts
tsx
import { usePublicClient } from 'wagmi'

function App() {
  const client = usePublicClient()
}
WARNING

If you want to optimize bundle size, you should use useClient along with Viem's tree-shakable actions instead. Since Public Client has all public actions attached directly to it.

Parameters
ts
import { type UsePublicClientParameters } from 'wagmi'
chainId
config['chains'][number]['id'] | undefined

ID of chain to use when getting Viem Public Client.


index.ts

config.ts
ts
import { usePublicClient } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { config } from './config'

function App() {
  const client = usePublicClient({
    chainId: mainnet.id, 
  })
}
config
Config | undefined

Config to use instead of retrieving from the from nearest WagmiProvider.


index.tsx

config.ts
tsx
import { usePublicClient } from 'wagmi'
import { config } from './config'

function App() {
  const client = usePublicClient({
    config,
  })
}
Return Type
ts
import { type UsePublicClientReturnType } from 'wagmi'
PublicClient | undefined

Viem PublicClient instance.

Action
getPublicClient
watchPublicClient
Actions
Actions for accounts, wallets, contracts, transactions, signing, ENS, and more.

Import
ts
import { getAccount } from '@wagmi/core'
Available Actions
call
connect
deployContract
disconnect
estimateFeesPerGas
estimateGas
estimateMaxPriorityFeePerGas
getAccount
getBalance
getBlock
getBlockNumber
getBlockTransactionCount
getBytecode
getChainId
getChains
getClient
getConnections
getConnectorClient
getConnectors
getEnsAddress
getEnsAvatar
getEnsName
getEnsResolver
getEnsText
getFeeHistory
getGasPrice
getProof
getPublicClient
getStorageAt
getToken
getTransaction
getTransactionConfirmations
getTransactionCount
getTransactionReceipt
getWalletClient
multicall
prepareTransactionRequest
readContract
readContracts
reconnect
sendTransaction
signMessage
signTypedData
simulateContract
switchAccount
switchChain
verifyMessage
verifyTypedData
waitForTransactionReceipt
watchAccount
watchAsset
watchBlockNumber
watchBlocks
watchChainId
watchClient
watchConnections
watchConnectors
watchContractEvent
watchPendingTransactions
watchPublicClient
writeContract

Skip to content
wagmi logo
Main Navigation
React
Vue
Core
CLI

More



Menu
On this page
Sidebar Navigation
Introduction
Why Wagmi

Installation

Getting Started

TypeScript

Comparisons

Guides
TanStack Query

Viem

Error Handling

Ethers.js Adapters

Chain Properties

SSR

Connect Wallet

Send Transaction

Read from Contract

Write to Contract

FAQ / Troubleshooting

Migrate from v1 to v2

Configuration
createConfig

createStorage

Chains

Connectors
Transports
WagmiProvider

Hooks
useAccount

useAccountEffect

useBalance

useBlockNumber

useBlock

useBlockTransactionCount

useBytecode

useCall

useChainId

useChains

useClient

useConfig

useConnect

useConnections

useConnectorClient

useConnectors

useDeployContract

useDisconnect

useEnsAddress

useEnsAvatar

useEnsName

useEnsResolver

useEnsText

useFeeHistory

useProof

usePublicClient

useEstimateFeesPerGas

useEstimateGas

useEstimateMaxPriorityFeePerGas

useGasPrice

useInfiniteReadContracts

useReadContract

usePrepareTransactionRequest

useReadContracts

useReconnect

useSendTransaction

useSignMessage

useSignTypedData

useSimulateContract

useStorageAt

useSwitchAccount

useSwitchChain

useTransaction

useTransactionConfirmations

useTransactionCount

useTransactionReceipt

useToken

useWaitForTransactionReceipt

useVerifyMessage

useVerifyTypedData

useWalletClient

useWatchAsset

useWatchBlocks

useWatchBlockNumber

useWatchContractEvent

useWatchPendingTransactions

useWriteContract

Miscellaneous
Actions

Errors

Utilities
Experimental
useCallsStatus

useCapabilities

useSendCalls

useShowCallsStatus

useWriteContracts

Migrate from v1 to v2
Overview
Wagmi v2 redesigns the core APIs to mesh better with Viem and TanStack Query. This major version transforms Wagmi into a light wrapper around these libraries, sprinkling in multichain support and account management. As such, there are some breaking changes and deprecations to be aware of outlined in this guide.

To get started, install the latest version of Wagmi and it's required peer dependencies.


pnpm

npm

yarn

bun
bash
pnpm add wagmi viem@2.x @tanstack/react-query
Wagmi v2 should be the last major version that will have this many actionable breaking changes.

Moving forward after Wagmi v2, new functionality will be opt-in with old functionality being deprecated alongside the new features. This means upgrading to the latest major versions will not require immediate changes.

Not ready to migrate yet?

The Wagmi v1 docs are still available at 1.x.wagmi.sh/react.

Dependencies
Moved TanStack Query to peer dependencies
Wagmi uses TanStack Query to manage async state, handling requests, caching, and more. With Wagmi v1, TanStack Query was an internal implementation detail. With Wagmi v2, TanStack Query is a peer dependency. A lot of Wagmi users also use TanStack Query in their apps so making it a peer dependency gives them more control and removes some custom Wagmi code internally.

If you don't normally use TanStack Query, all you need to do is set it up and mostly forget about it (we'll provide guidance around version updates).


app.tsx

config.ts
tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
For more information on setting up TanStack Query for Wagmi, follow the Getting Started docs. If you want to set up persistence for your query cache (default behavior before Wagmi v2), check out the TanStack Query docs.

Dropped CommonJS support
Wagmi v2 no longer publishes a separate cjs tag since very few people use this tag and ESM is the future. See Sindre Sorhus' guide for more info about switching to ESM.

Hooks
Removed mutation setup arguments
Mutation hooks are hooks that change network or application state, sign data, or perform write operations through mutation functions. With Wagmi v1, you could pass arguments directly to these hooks instead of using them with their mutation functions. For example:

ts
// Wagmi v1
const { signMessage } = useSignMessage({
  message: 'foo bar baz',
})
With Wagmi v2, you must pass arguments to the mutation function instead. This follows the same behavior as TanStack Query mutations and improves type-safety.

tsx
import { useSignMessage } from 'wagmi'

const { signMessage } = useSignMessage({ message: 'foo bar baz' })
const { signMessage } = useSignMessage()

<button
  onClick={() => signMessage()}
  onClick={() => signMessage({ message: 'foo bar baz' })}
>
  Sign message
</button>
Moved TanStack Query parameters to query property
Previously, you could pass TanStack Query parameters, like enabled and staleTime, directly to hooks. In Wagmi v2, TanStack Query parameters are now moved to the query property. This allows Wagmi to better support TanStack Query type inference, control for future breaking changes since TanStack Query is now a peer dependency, and expose Wagmi-related hook property at the top-level of editor features, like autocomplete.

tsx
useReadContract({
  enabled: false,
  staleTime: 1_000,
  query: {
    enabled: false,
    staleTime: 1_000,
  },
})
Removed watch property
The watch property was removed from all hooks besides useBlock and useBlockNumber. This property allowed hooks to internally listen for block changes and automatically refresh their data. In Wagmi v2, you can compose useBlock or useBlockNumber along with React.useEffect to achieve the same behavior. Two different approaches are outlined for useBalance below.


invalidateQueries

refetch
ts
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useBlockNumber, useBalance } from 'wagmi'

const queryClient = useQueryClient()
const { data: blockNumber } = useBlockNumber({ watch: true })
const { data: balance, queryKey } = useBalance({ 
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  watch: true, 
})

useEffect(() => {
  queryClient.invalidateQueries({ queryKey })
}, [blockNumber, queryClient])
This is a bit more code, but removes a lot of internal code from hooks that can slow down your app when not used and gives you more control. For example, you can easily refresh data every five blocks instead of every block.

ts
const { data: blockNumber } = useBlockNumber({ watch: true })
const { data: balance, queryKey } = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})

useEffect(() => {
  if (blockNumber % 5 === 0)
    queryClient.invalidateQueries({ queryKey })
}, [blockNumber, queryClient])
Removed suspense property
Wagmi used to support an experimental suspense property via TanStack Query. Since TanStack Query removed suspense from its useQuery hook, it is no longer supported by Wagmi Hooks.

Instead, you can use useSuspenseQuery along with TanStack Query-related exports from the 'wagmi/query' entrypoint.

ts
import { useSuspenseQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'
import { getBalanceQueryOptions } from 'wagmi/query'
import { useBalance } from 'wagmi'

const config = useConfig()
const options = getBalanceQueryOptions(config, { address: '0x…' })
const result = useSuspenseQuery(options)
const result = useBalance({ 
  address: '0x…', 
  suspense: true, 
})
Removed prepare hooks
usePrepareContractWrite and usePrepareSendTransaction were removed and replaced with idiomatic Viem alternatives. For usePrepareContractWrite, use useSimulateContract. Similar to usePrepareContractWrite, useSimulateContract composes well with useWriteContract

tsx
import { usePrepareContractWrite, useWriteContract } from 'wagmi'
import { useSimulateContract, useWriteContract } from 'wagmi'

const { config } = usePrepareContractWrite({
const { data } = useSimulateContract({
  address: '0x',
  abi: [{
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  }],
  functionName: 'transferFrom',
  args: ['0x', '0x', 123n],
})
const { write } = useWriteContract(config)
const { writeContract } = useWriteContract()

<button
  disabled={!Boolean(write)}
  onClick={() => write()}
  disabled={!Boolean(data?.request)}
  onClick={() => writeContract(data!.request)}
>
  Write contract
</button>
Instead of usePrepareSendTransaction, use useEstimateGas. You can pass useEstimateGas data to useSendTransaction to compose the two hooks.

tsx
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { useEstimateGas, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

const { config } = usePrepareSendTransaction({
const { data } = useEstimateGas({
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
const { sendTransaction } = useSendTransaction(config)
const { sendTransaction } = useSendTransaction()

<button
  disabled={!Boolean(sendTransaction)}
  onClick={() => sendTransaction()}
  disabled={!Boolean(data)}
  onClick={() => sendTransaction({
    gas: data,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })}
>
  Send transaction
</button>
This might seem like more work, but it gives you more control and is more accurate representation of what is happening under the hood.

Removed useNetwork hook
The useNetwork hook was removed since the connected chain is typically based on the connected account. Use useAccount to get the connected chain.

ts
import { useNetwork } from 'wagmi'
import { useAccount } from 'wagmi'

const { chain } = useNetwork()
const { chain } = useAccount()
Use useConfig for the list of chains set up with the Wagmi Config.

ts
import { useNetwork } from 'wagmi'
import { useConfig } from 'wagmi'

const { chains } = useNetwork()
const { chains } = useConfig()
Removed onConnect and onDisconnect callbacks from useAccount
The onConnect and onDisconnect callbacks were removed from the useAccount hook since it is frequently used without these callbacks so it made sense to extract these into a new API, useAccountEffect, rather than clutter the useAccount hook.

ts
import { useAccount } from 'wagmi'
import { useAccountEffect } from 'wagmi'

useAccount({ 
useAccountEffect({ 
  onConnect(data) {
    console.log('connected', data)
  },
  onDisconnect() {
    console.log('disconnected')
  },
})
Removed useWebSocketPublicClient
The Wagmi Config does not separate transport types anymore. Simply use Viem's webSocket transport instead when setting up your Wagmi Config. You can get Viem Client instance with this transport attached by using useClient or usePublicClient.

Removed useInfiniteReadContracts paginatedIndexesConfig
In the spirit of removing unnecessary abstractions, paginatedIndexesConfig was removed. Use useInfiniteReadContracts's initialPageParam and getNextPageParam parameters along with fetchNextPage/fetchPreviousPage from the result instead or copy paginatedIndexesConfig's implementation to your codebase.

See the TanStack Query docs for more information on infinite queries.

Updated useSendTransaction and useWriteContract return type
Updated useSendTransaction and useWriteContract return type from { hash: `0x${string}` } to `0x${string}`.

ts
const result = useSendTransaction()
result.data?.hash
result.data
Updated useConnect return type
Updated useConnect return type from { account: Address; chain: { id: number; unsupported?: boolean }; connector: Connector } to { accounts: readonly Address[]; chainId: number }. This better reflects the ability to have multiple accounts per connector.

Renamed parameters and return types
All hook parameters and return types follow the naming pattern of [PascalCaseHookName]Parameters and [PascalCaseHookName]ReturnType. For example, UseAccountParameters and UseAccountReturnType.

ts
import { UseAccountConfig, UseAccountResult } from 'wagmi'
import { UseAccountParameters, UseAccountReturnType } from 'wagmi'
Connectors
Updated connector API
In order to maximize type-safety and ease of creating connectors, the connector API changed. Follow the Creating Connectors guide for more info on creating new connectors and converting Wagmi v1 connectors.

Removed individual entrypoints
Previously, each connector had it's own entrypoint to optimize tree-shaking. Since all connectors now have package.json#sideEffects enabled, this is no longer necessary and the entrypoint is unified. Use the 'wagmi/connectors' entrypoint instead.

ts
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { coinbaseWallet, injected } from 'wagmi/connectors'
Removed MetaMaskConnector
The MetaMaskConnector was removed since it was nearly the same thing as the InjectedConnector. Use the injected connector instead, along with the target parameter set to 'metaMask', for the same behavior.

ts
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { injected } from 'wagmi/connectors'

const connector = new MetaMaskConnector()
const connector = injected({ target: 'metaMask' })
Renamed connectors
In Wagmi v1, connectors were classes you needed to instantiate. In Wagmi v2, connectors are functions. As a result, the API has changed. Connectors have the following new names:

CoinbaseWalletConnector is now coinbaseWallet.
InjectedConnector is now injected.
SafeConnector is now safe.
WalletConnectConnector is now walletConnect.
To create a connector, you now call the connector function with parameters.

ts
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { walletConnect } from 'wagmi/connectors'

const connector = new WalletConnectConnector({ 
const connector = walletConnect({ 
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
Removed WalletConnectLegacyConnector
WalletConnect v1 was sunset June 28, 2023. Use the walletConnect connector instead.

ts
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy'
import { walletConnect } from 'wagmi/connectors'

const connector = new WalletConnectLegacyConnector({ 
const connector = walletConnect({ 
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
Chains
Updated 'wagmi/chains' entrypoint
Chains now live in the Viem repository. As a result, the 'wagmi/chains' entrypoint now proxies all chains from 'viem/chains' directly.

Removed mainnet and sepolia from main entrypoint
Since the 'wagmi/chains' entrypoint now proxies 'viem/chains', mainnet and sepolia were removed from the main entrypoint. Use the 'wagmi/chains' entrypoint instead.

ts
import { mainnet, sepolia } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
Errors
A number of errors were renamed to better reflect their functionality or replaced by Viem errors.

Miscellaneous
Removed internal ENS name normalization
Before v2, Wagmi handled ENS name normalization internally for useEnsAddress, useEnsAvatar, and useEnsResolver, using Viem's normalize function. This added extra bundle size as full normalization is quite heavy. For v2, you must normalize ENS names yourself before passing them to these hooks. You can use Viem's normalize function or any other function that performs UTS-46 normalization.

ts
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

const result = useEnsAddress({
  name: 'wevm.eth', 
  name: normalize('wevm.eth'), 
})
By inverting control, Wagmi let's you choose how much normalization to do. For example, maybe your project only allows ENS names that are numeric so no normalization is not needed. Check out the ENS documentation for more information on normalizing names.

Removed configureChains
The Wagmi v2 Config now has native multichain support using the chains parameter so the configureChains function is no longer required.

ts
import { configureChains, createConfig } from 'wagmi'
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider(), publicProvider()],
)

export const config = createConfig({
  publicClient, 
  chains: [mainnet, sepolia], 
  transports: { 
    [mainnet.id]: http(), 
    [sepolia.id]: http(), 
  }, 
})
Removed ABI exports
Import from Viem instead.

ts
import { erc20ABI } from 'wagmi'
import { erc20Abi } from 'viem'
Removed 'wagmi/providers/* entrypoints
It never made sense that we would have provider URLs hardcoded in the Wagmi codebase. Use Viem transports along with RPC provider URLs instead.

ts
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { http } from 'viem'

const transport = http('https://mainnet.example.com')
Updated createConfig parameters
Removed autoConnect. The reconnecting behavior is now managed by React and not related to the Wagmi Config. Use WagmiProvider reconnectOnMount or useReconnect hook instead.
Removed publicClient and webSocketPublicClient. Use transports or client instead.
Removed logger. Wagmi no longer logs debug information to console.
Updated Config object
Removed config.connector. Use config.state.connections.get(config.state.current)?.connector instead.
Removed config.data. Use config.state.connections.get(config.state.current) instead.
Removed config.error. Was unused and not needed.
Removed config.lastUsedChainId. Use config.state.connections.get(config.state.current)?.chainId instead.
Removed config.publicClient. Use config.getClient() or getPublicClient instead.
Removed config.status. Use config.state.status instead.
Removed config.webSocketClient. Use config.getClient() or getPublicClient instead.
Removed config.clearState. Was unused and not needed.
Removed config.autoConnect(). Use reconnect action instead.
Renamed config.setConnectors. Use config._internal.setConnectors instead.
Removed config.setLastUsedConnector. Use config.storage?.setItem('recentConnectorId', connectorId) instead.
Removed getConfig. config should be passed explicitly to actions instead of using global config.
Deprecations
Renamed WagmiConfig
WagmiConfig was renamed to WagmiProvider to reduce confusion with the Wagmi Config type. React Context Providers usually follow the naming schema *Provider so this is a more idiomatic name. Now that Wagmi no longer uses Ethers.js (since Wagmi v1), the term "Provider" is less overloaded.


app.tsx

config.ts
tsx
import { WagmiConfig } from 'wagmi'
import { WagmiProvider } from 'wagmi'
import { config } from './config'

function App() {
  return (
    <WagmiConfig config={config}>
    <WagmiProvider config={config}>
      {/** ... */}
    </WagmiProvider>
    </WagmiConfig>
  )
}
Deprecated useBalance token parameter
Moving forward, useBalance will only work for native currencies, thus the token parameter is no longer supported. Use useReadContracts instead.

ts
import { useBalance } from 'wagmi'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'

const result = useBalance({ 
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48', 
  token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
})
const result = useReadContracts({ 
  allowFailure: false, 
  contracts: [ 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'balanceOf', 
      args: ['0x4557B18E779944BFE9d78A672452331C186a9f48'], 
    }, 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'decimals', 
    }, 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'symbol', 
    }, 
  ] 
})
Deprecated useBalance unit parameter and formatted return value
Moving forward, useBalance will not accept the unit parameter or return a formatted value. Instead you can call formatUnits from Viem directly or use another number formatting library, like dnum instead.

ts
import { formatUnits } from 'viem'
import { useBalance } from 'wagmi'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  unit: 'ether', 
})
result.data!.formatted
formatUnits(result.data!.value, result.data!.decimals)
Deprecated useToken
Moving forward, useToken is no longer supported. Use useReadContracts instead.

ts
import { useToken } from 'wagmi'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'

const result = useToken({ 
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
})
const result = useReadContracts({ 
  allowFailure: false, 
  contracts: [ 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'decimals', 
    }, 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'name', 
    }, 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'symbol', 
    }, 
    { 
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
      abi: erc20Abi, 
      functionName: 'totalSupply', 
    }, 
  ] 
})
Deprecated formatUnits parameters and return values
The formatUnits parameter and related return values (e.g. result.formatted) are deprecated for the following hooks:

useEstimateFeesPerGas
useToken
Instead you can call formatUnits from Viem directly or use another number formatting library, like dnum instead.

ts
import { formatUnits } from 'viem'

const result = useToken({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  formatUnits: 'ether',
})
result.data!.totalSupply.formatted
formatUnits(result.data!.totalSupply.value, 18)
This allows us to invert control to users so they can handle number formatting however they want, taking into account precision, localization, and more.

Renamed hooks
The following hooks were renamed to better reflect their functionality and underlying Viem actions:

useContractRead is now useReadContract
useContractReads is now useReadContracts
useContractWrite is now useWriteContract
useContractEvent is now useWatchContractEvent
useContractInfiniteReads is now useInfiniteReadContracts
useFeeData is now useEstimateFeesPerGas
useSwitchNetwork is now useSwitchChain
useWaitForTransaction is now useWaitForTransactionReceipt
Miscellaneous
WagmiConfigProps renamed to WagmiProviderProps.
Context renamed to WagmiContext.
Suggest changes to this page
Last updated: 9/11/24, 11:02 AM
