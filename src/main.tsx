import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  RainbowKitProvider,
  // darkTheme,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { arbitrumSepolia, arbitrum } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@rainbow-me/rainbowkit/styles.css'
// import { ContractProvider } from './ContractContext';
import { BrowserRouter } from "react-router-dom";
import { ContractProvider } from './ContractContext';

const queryClient = new QueryClient()

export const config = getDefaultConfig({
  appName: 'Business Cards DAPP',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [arbitrumSepolia, arbitrum],
  // chains: [sepolia],
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider theme={darkTheme()}> */}
        <RainbowKitProvider theme={lightTheme()}>
          <BrowserRouter>
            <ContractProvider>
              <App />
              <ToastContainer />
            </ContractProvider>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
