import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Zap, LogOut, User as UserIcon, Settings, MapPin, HelpCircle, Building } from "lucide-react";
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
    <header className="backdrop-blur-md bg-background/30 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center neon-border">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="neon-text font-bold text-xl tracking-tight">PARK<span className="accent-text">EASE</span></span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`${location === '/' ? 'neon-text' : 'text-gray-300 hover:text-white'} transition-all font-medium flex items-center gap-1.5`}>
            <span>Home</span>
          </Link>
          <Link href="/search" className={`${location === '/search' ? 'neon-text' : 'text-gray-300 hover:text-white'} transition-all font-medium flex items-center gap-1.5`}>
            <MapPin className="w-4 h-4" />
            <span>Find Parking</span>
          </Link>
          <Link href="/#how-it-works" className="text-gray-300 hover:text-white transition-all font-medium flex items-center gap-1.5">
            <span>How It Works</span>
          </Link>
          <Link href="/business" className={`${location === '/business' ? 'neon-text' : 'text-gray-300 hover:text-white'} transition-all font-medium flex items-center gap-1.5`}>
            <Building className="w-4 h-4" />
            <span>For Business</span>
          </Link>
          <Link href="/help" className={`${location === '/help' ? 'neon-text' : 'text-gray-300 hover:text-white'} transition-all font-medium flex items-center gap-1.5`}>
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.userType === "vendor" && (
                <Link href="/vendor/dashboard">
                  <Button variant="outline" className="border-primary text-primary hover:text-primary-foreground">
                    Vendor Dashboard
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-10 w-10 p-0 neon-border">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-primary">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glassmorphism border-gray-700">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium text-white">{user.fullName}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="focus:bg-secondary">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      <span>My Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-secondary">
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleLogout} className="focus:bg-secondary text-red-400 focus:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost" className="hidden sm:flex text-gray-300 hover:text-white hover:bg-secondary">
                  Log In
                </Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button className="neo-brutalism">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="glassmorphism border-gray-700">
              <div className="flex flex-col space-y-6 mt-8">
                <Link href="/" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/search" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                  <MapPin className="w-5 h-5 text-primary" />
                  Find Parking
                </Link>
                <Link href="/#how-it-works" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                  How It Works
                </Link>
                <Link href="/business" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                  <Building className="w-5 h-5 text-primary" />
                  For Business
                </Link>
                <Link href="/help" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Help
                </Link>
                
                <div className="h-px bg-gray-800 my-2"></div>
                
                {!user ? (
                  <>
                    <Link href="/auth" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                      Log In
                    </Link>
                    <Link href="/auth?tab=register" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="text-accent">Sign Up</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserIcon className="w-5 h-5 text-primary" />
                      My Dashboard
                    </Link>
                    {user.userType === "vendor" && (
                      <Link href="/vendor/dashboard" className="text-lg font-medium flex items-center gap-2 text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
                        <Building className="w-5 h-5 text-primary" />
                        Vendor Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                      className="text-lg font-medium text-left flex items-center gap-2 text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
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
