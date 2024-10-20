import { http, createConfig } from 'wagmi'
import { flowTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [flowTestnet],
  transports: {
    [flowTestnet.id]: http(),
  },
})
