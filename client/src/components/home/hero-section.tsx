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
    <section className="relative bg-gradient-to-br from-primary to-primary-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621928372414-30e144d111a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
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
          <div className="bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-2xl border border-white/20 animate-slideUp" style={{ animationDelay: "0.4s" }}>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSearch}>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <Input 
                    placeholder="Mall, Business Park, Venue..." 
                    className="w-full pl-10 pr-4 py-6 rounded-lg border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                          "w-full pl-10 pr-4 py-6 rounded-lg justify-start text-left font-normal border-neutral-200 hover:bg-neutral-50",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-lg border-neutral-200 shadow-lg" align="start">
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
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-[56px]"
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
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all whitespace-nowrap h-[56px] shadow-md hover:shadow-lg button-shine"
              >
                Find Parking
              </Button>
            </form>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-white/90 animate-slideUp" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>No Booking Fees</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
