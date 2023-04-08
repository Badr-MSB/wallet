import React from 'react';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

import './App.css';

function App() {
  const chains = [arbitrum, mainnet, polygon, polygonMumbai]
  const projectId = '6d7dbea1a959b6186fc5585ff8b1c51b'

  const { provider } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    provider
  })
  const ethereumClient = new EthereumClient(wagmiClient, chains)
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Header />
        <Body/>
        <Footer />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
