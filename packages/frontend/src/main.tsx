import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import 'dotenv/config'


// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { PrivyProvider } from '@privy-io/react-auth';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

require('dotenv').config()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
    appId='cm2gjukmo03rrj4agn32bcvik'
    config={{
      // Display email and wallet as login methods
      loginMethods: ['email', 'wallet'],
      // Customize Privy's appearance in your app
      appearance: {
        theme: 'dark',
        accentColor: '#676FFF',
      },
      // Create embedded wallets for users who don't have a wallet
      embeddedWallets: {
        createOnLogin: 'users-without-wallets',
      },
    }}>
      <RouterProvider router={router} />
    </PrivyProvider>
  </StrictMode>
);
