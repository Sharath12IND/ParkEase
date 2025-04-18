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
    <section className="relative bg-primary-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1621928372414-30e144d111a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins leading-tight">
            Premium Parking<br/>
            <span className="text-accent">Made Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-100 mb-8 leading-relaxed">
            Book parking spots in advance at premium locations.<br/>
            No more circling and searching for that perfect spot.
          </p>
          
          {/* Search Form */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSearch}>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
                  <Input 
                    placeholder="Mall, Business Park, Venue..." 
                    className="w-full pl-10 pr-4 py-6 rounded-lg"
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
                          "w-full pl-10 pr-4 py-6 rounded-lg justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
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
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all h-[56px]"
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
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all whitespace-nowrap h-[56px]"
              >
                Find Parking
              </Button>
            </form>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-8 text-sm text-neutral-300">
            <div className="flex items-center">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>No Booking Fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-accent mr-2 h-5 w-5" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
