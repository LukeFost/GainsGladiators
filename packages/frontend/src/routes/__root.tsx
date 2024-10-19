import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Navbar from '@/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4">
        <Outlet />
      </div>

      {/* Devtools */}
      <TanStackRouterDevtools />
    </>
  ),
})