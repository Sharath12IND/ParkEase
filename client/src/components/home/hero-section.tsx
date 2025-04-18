import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle } from "lucide-react";
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
    <section className="relative bg-gradient-to-br from-primary/90 to-primary-900 dark:from-primary/70 dark:to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621928372414-30e144d111a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 dark:opacity-20"></div>
        
        {/* Animated Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/30 dark:bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 dark:bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        
        {/* Additional Dark Mode Elements */}
        <div className="dark:block hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <h1 className="text-white mb-6 font-poppins leading-tight animate-slideUp">
            Premium Parking<br/>
            <span className="text-accent font-extrabold">Made Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-100 mb-10 leading-relaxed animate-slideUp" style={{ animationDelay: "0.2s" }}>
            Book parking spots in advance at premium locations.<br/>
            No more circling and searching for that perfect spot.
          </p>
          
          {/* Search Form */}
          <div className="bg-white/95 dark:glass-effect p-5 md:p-6 rounded-xl shadow-2xl border border-white/20 dark:border-white/10 animate-slideUp" style={{ animationDelay: "0.4s" }}>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSearch}>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <Input 
                    placeholder="Mall, Business Park, Venue, Airport, Hotel..." 
                    className="w-full pl-10 pr-4 py-6 rounded-lg border-neutral-200 dark:border-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-secondary/50 dark:text-white dark:placeholder:text-neutral-400"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-10 pr-4 py-6 rounded-lg justify-start text-left font-normal border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-secondary/50 dark:text-white",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-lg border-neutral-200 dark:border-neutral-700 shadow-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="rounded-lg"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-[56px] dark:bg-secondary/50 dark:text-white"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Select time</option>
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {i.toString().padStart(2, '0')}:00
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all whitespace-nowrap h-[56px] shadow-md hover:shadow-lg button-shine dark:border dark:border-primary/30"
              >
                Find Parking
              </Button>
            </form>
            
            {/* Advanced Search Options */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="covered" className="rounded text-primary focus:ring-primary/30" />
                <label htmlFor="covered">Covered Parking</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ev" className="rounded text-primary focus:ring-primary/30" />
                <label htmlFor="ev">EV Charging</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="handicap" className="rounded text-primary focus:ring-primary/30" />
                <label htmlFor="handicap">Accessible Parking</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="security" className="rounded text-primary focus:ring-primary/30" />
                <label htmlFor="security">24/7 Security</label>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-white/90 animate-slideUp" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 animate-pulse-slow" style={{ animationDelay: "0.2s" }}>
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 animate-pulse-slow" style={{ animationDelay: "0.4s" }}>
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>No Booking Fees</span>
            </div>
            <div className="flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 animate-pulse-slow" style={{ animationDelay: "0.6s" }}>
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 animate-pulse-slow" style={{ animationDelay: "0.8s" }}>
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
