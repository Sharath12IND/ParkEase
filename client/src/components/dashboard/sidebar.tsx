import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  ParkingCircle,
  Ticket,
  BarChart3,
  Settings,
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  isVendor?: boolean;
}

export default function Sidebar({ activeItem, isVendor = false }: SidebarProps) {
  const { user } = useAuth();
  
  // Define navigation items based on user type
  const navItems = isVendor ? [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: "/vendor/dashboard" 
    },
    { 
      name: "Facilities", 
      icon: <ParkingCircle className="h-5 w-5" />, 
      path: "/vendor/facilities" 
    },
    { 
      name: "Bookings", 
      icon: <Ticket className="h-5 w-5" />, 
      path: "/vendor/bookings" 
    },
    { 
      name: "Analytics", 
      icon: <BarChart3 className="h-5 w-5" />, 
      path: "/vendor/analytics" 
    },
    { 
      name: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/vendor/settings" 
    }
  ] : [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: "/dashboard" 
    },
    { 
      name: "My Bookings", 
      icon: <Ticket className="h-5 w-5" />, 
      path: "/dashboard/bookings" 
    },
    { 
      name: "My Vehicles", 
      icon: <ParkingCircle className="h-5 w-5" />, 
      path: "/dashboard/vehicles" 
    },
    { 
      name: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/dashboard/settings" 
    }
  ];

  return (
    <div className="bg-primary-900 text-white p-4 h-full">
      <div className="flex items-center mb-8 pl-2">
        <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
          <path d="M10 8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z"></path>
          <path d="M10 6a1 1 0 100 2 1 1 0 000-2z"></path>
        </svg>
        <span className="font-bold text-lg ml-2">ParkEase</span>
        {isVendor && (
          <span className="text-xs bg-accent text-primary-900 px-2 py-0.5 rounded ml-2">Business</span>
        )}
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <a className={cn(
              "flex items-center space-x-3 rounded-lg p-3 mb-1 transition-colors",
              activeItem === item.name 
                ? "bg-primary-800 text-white" 
                : "text-primary-100 hover:bg-primary-800"
            )}>
              {item.icon}
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </nav>
      
      {/* User info at bottom */}
      {user && (
        <div className="absolute bottom-8 left-4 right-4">
          <div className="border-t border-primary-800 pt-4 text-primary-200 text-sm">
            <div className="font-medium text-white">{user.fullName}</div>
            <div>{user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}
