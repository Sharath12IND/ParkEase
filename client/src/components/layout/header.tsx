import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
              <path d="M10 8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z"></path>
              <path d="M10 6a1 1 0 100 2 1 1 0 000-2z"></path>
            </svg>
            <span className="text-primary font-poppins font-bold text-2xl">ParkEase</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`${location === '/' ? 'text-primary' : 'text-neutral-600 hover:text-primary'} transition-all font-medium`}>Home</Link>
          <Link href="/search" className={`${location === '/search' ? 'text-primary' : 'text-neutral-600 hover:text-primary'} transition-all font-medium`}>Find Parking</Link>
          <Link href="/#how-it-works" className="text-neutral-600 hover:text-primary transition-all font-medium">How It Works</Link>
          <Link href="/#business" className="text-neutral-600 hover:text-primary transition-all font-medium">Business</Link>
          <Link href="#" className="text-neutral-600 hover:text-primary transition-all font-medium">Help</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.userType === "vendor" && (
                <Link href="/vendor/dashboard">
                  <Button variant="outline" size="sm">Vendor Dashboard</Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-2 text-sm font-medium">{user.fullName}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">My Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/auth" className="hidden sm:block text-neutral-600 hover:text-primary transition-all font-medium">
                Log In
              </Link>
              <Link href="/auth?tab=register" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium">
                Sign Up
              </Link>
            </>
          )}
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/search" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Find Parking
                </Link>
                <Link href="/#how-it-works" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  How It Works
                </Link>
                <Link href="/#business" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Business
                </Link>
                <Link href="#" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Help
                </Link>
                {!user ? (
                  <>
                    <Link href="/auth" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Log In
                    </Link>
                    <Link href="/auth?tab=register" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      My Dashboard
                    </Link>
                    {user.userType === "vendor" && (
                      <Link href="/vendor/dashboard" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Vendor Dashboard
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-lg font-medium text-left">
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
