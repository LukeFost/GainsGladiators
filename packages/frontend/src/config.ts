import { http, createConfig } from 'wagmi'
import {sepolia, flowTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [sepolia, flowTestnet],
  transports: {
    [flowTestnet.id]: http(),
    [sepolia.id]: http(),
  },
})