import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Car, 
  Shield, 
  Coffee, 
  CreditCard, 
  Zap, 
  ChevronRight 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [, setNavLocation] = useLocation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [locationQuery, setLocationQuery] = useState("");
  const [time, setTime] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNavLocation(`/search?location=${encodeURIComponent(locationQuery)}&date=${date ? format(date, 'yyyy-MM-dd') : ''}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className="overflow-hidden bg-gradient-bg">
      {/* Hero Background with grid overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      {/* Animated glowing dots */}
      <div className="absolute top-20 left-20 h-4 w-4 rounded-full bg-primary animate-pulse-slow"></div>
      <div className="absolute top-40 right-40 h-3 w-3 rounded-full bg-accent animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-20 left-1/4 h-5 w-5 rounded-full bg-primary animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/3 right-1/5 h-2 w-2 rounded-full bg-accent animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      
      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[90vh]">
          {/* Left content */}
          <div className="lg:col-span-2 flex flex-col justify-center px-4 py-16 lg:py-0 relative z-10">
            <div className="max-w-xl mx-auto lg:mr-0">
              <div className="inline-block px-3 py-1 mb-6 rounded-full neon-border">
                <span className="text-sm font-medium neon-text tracking-wide">NEXT GEN PARKING SOLUTION</span>
              </div>
              
              <h1 className="text-white mb-6 fade-in">
                Find & Reserve <span className="accent-text">Premium</span> Parking Spots Instantly
              </h1>
              
              <p className="text-gray-300 text-lg mb-8 slide-up stagger-1">
                Book your ideal parking spot in advance at premium locations across the city.
                No more driving in circles or paying premium rates.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Car, text: "10,000+ Spots" },
                  { icon: Shield, text: "Secure Booking" },
                  { icon: Coffee, text: "Premium Locations" },
                  { icon: CreditCard, text: "Easy Payment" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center slide-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary mr-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 slide-up stagger-4">
                <Button className="neo-brutalism px-6 py-6">
                  Learn How It Works
                </Button>
                <Button variant="outline" className="border-primary text-primary px-6 py-6 neon-border">
                  View Popular Spots
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right content - search panel */}
          <div className="lg:col-span-3 flex items-center px-4 py-8 lg:py-0 relative z-10">
            <div className="w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto">
              <div className="card-glow p-6 md:p-8 slide-in-right">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold">Find Your Spot</h3>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map(n => (
                      <div 
                        key={n} 
                        className={`w-2 h-2 rounded-full ${n === 1 ? 'bg-accent' : 'bg-gray-600'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-5">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                        <Input 
                          placeholder="City, Mall, Business Park, Airport..." 
                          className="pl-10 py-6 bg-secondary/80 border-transparent focus:border-primary"
                          value={locationQuery}
                          onChange={(e) => setLocationQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-10 pr-4 py-6 justify-start text-left font-normal bg-secondary/80 border-transparent hover:bg-secondary",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                {date ? format(date, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                          <select
                            className="w-full h-[57px] pl-10 pr-4 py-3 rounded-md bg-secondary/80 border-transparent focus:border-primary text-white"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          >
                            <option value="">Select time</option>
                            {Array.from({ length: 24 }).map((_, i) => {
                              const hour = i.toString().padStart(2, '0');
                              return (
                                <option key={i} value={`${hour}:00`}>
                                  {hour}:00
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-3">Amenities</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "covered", label: "Covered Parking" },
                          { id: "ev", label: "EV Charging" },
                          { id: "valet", label: "Valet Service" },
                          { id: "security", label: "24/7 Security" },
                          { id: "handicap", label: "Accessible Parking" },
                          { id: "rewards", label: "Earn Rewards" }
                        ].map(option => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={option.id} 
                              className="rounded bg-secondary border-gray-600 text-primary focus:ring-primary/30" 
                            />
                            <label htmlFor={option.id} className="text-sm text-gray-300">{option.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-3">Price Range</p>
                      <div className="bg-secondary/50 h-2 rounded-full mb-2 relative">
                        <div className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 h-4 w-4 bg-primary rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>$0</span>
                        <span>$25</span>
                        <span>$50+</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 group"
                  >
                    <Zap className="h-5 w-5" />
                    <span>Find Parking Spots</span>
                    <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  </Button>
                </form>
                
                <div className="mt-5 pt-5 border-t border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Trusted by 2M+ users worldwide</span>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(n => (
                        <div 
                          key={n} 
                          className="w-6 h-6 rounded-full border border-gray-800"
                          style={{ 
                            backgroundColor: ['#4A61DD', '#DD4A61', '#61DD4A', '#DD61A4'][n-1] 
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
