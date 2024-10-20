import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

function LogoutButton() {
  const { ready, authenticated, logout } = usePrivy();

  if (!ready || !authenticated) {
    return null; // Don't render anything if not ready or not authenticated
  }

  return (
    <button 
      onClick={logout} 
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Log out
    </button>
  );
}

export default LogoutButton;
