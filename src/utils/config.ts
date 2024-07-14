import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, Chain } from 'wagmi/chains'
import { injected } from "wagmi/connectors"


export const coreDaoTestnet = {
    id: 1115,
    name: 'coreDaoTestnet',
    rpcUrls:{
        default: {
            http: ['https://rpc.test.btcs.network']
        }
    },
    blockExplorers:{
        default:{
            name:"Core Dao Test Explorer",
            url:"https://scan.test.btcs.network"
        }
    },
    nativeCurrency:{
        name:"CORE",
        symbol:"CORE",
        decimals:18
    }
} as const satisfies Chain;
export const config = createConfig({
  chains: [coreDaoTestnet],
  transports: {
    [1115]: http('https://rpc.test.btcs.network'),
  },
})
