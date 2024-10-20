import { useState } from 'react'
import { Menu, Home, ShoppingCart, Eye, User } from 'lucide-react'
import { Link } from '@tanstack/react-router' // Use TanStack's Link for routing compatibility

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import PrivyComponent from '@/Privy'
import LogoutButton from '@/components/LogoutButton'

const NavLinks = () => (
  <>
    <Link to="/" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
      <Home className="h-4 w-4" />
      <span>Home</span>
    </Link>
    <Link to="/market" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
      <ShoppingCart className="h-4 w-4" />
      <span>Market</span>
    </Link>
<<<<<<< HEAD
    <Link to="/aiAgentCreation" className="flex items-center space-x 
    text-sm font-medium transition-colors hover:text-primary">
      <Bot className="h-4 w-4" />
      <span>AI Agent</span>
    </Link>
    <Link to="/predictionMarket" className="flex items-center space-x-2     
 text-sm font-medium transition-colors hover:text-primary">
      <TrendingUp className="h-4 w-4" />
      <span>Prediction</span>
    </Link>
    <LogoutButton />
=======
    <Link to="/view" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
      <Eye className="h-4 w-4" />
      <span>View</span>
    </Link>
    <Link to="/profile" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
      <User className="h-4 w-4" />
      <span>Profile</span>
    </Link>
>>>>>>> parent of 640ed4a (Merge pull request #1 from LukeFost/frontend-v69)
  </>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          <NavLinks />
        </div>

        <div className="flex items-center space-x-4">
          <PrivyComponent />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}