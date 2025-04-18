import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LocationCard from "@/components/search/location-card";
import { ParkingFacility } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, MapPin, Search as SearchIcon, Car, Bolt, Umbrella, Accessibility, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Extract search params if any
  const initialLocation = searchParams.get('location') || '';
  const initialDateStr = searchParams.get('date') || '';
  const initialTime = searchParams.get('time') || '';

  // State for search filters
  const [location, setLocation] = useState(initialLocation);
  const [date, setDate] = useState<Date | undefined>(
    initialDateStr ? new Date(initialDateStr) : new Date()
  );
  const [time, setTime] = useState(initialTime);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [filters, setFilters] = useState({
    evCharging: false,
    covered: false,
    accessible: false,
    security: false,
    allDay: false
  });
  
  // Fetch facilities
  const { data: facilities, isLoading, error } = useQuery<ParkingFacility[]>({
    queryKey: ["/api/facilities"],
  });
  
  // Filter facilities based on search criteria
  const filteredFacilities = facilities?.filter(facility => {
    // Filter by location if provided
    if (location && !facility.name.toLowerCase().includes(location.toLowerCase()) && 
        !facility.address.toLowerCase().includes(location.toLowerCase()) &&
        !facility.city.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (facility.hourlyRate < priceRange[0] || facility.hourlyRate > priceRange[1]) {
      return false;
    }
    
    // Filter by amenities
    if (filters.evCharging && !facility.hasEVCharging) return false;
    if (filters.covered && !facility.hasCovered) return false;
    if (filters.accessible && !facility.hasDisabled) return false;
    if (filters.security && !facility.hasSecurity) return false;
    if (filters.allDay && !facility.has24HourAccess) return false;
    
    return true;
  });
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would update the URL with search params in a real app
    console.log("Search submitted:", { location, date, time });
  };
  
  // Handle filter change
  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Find Parking</h1>
            <p className="text-gray-300">Discover and book premium parking spots at top locations</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-background border border-gray-800">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 text-white">Search & Filters</h2>
                  
                  <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          placeholder="City, location or venue" 
                          className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal pl-9 bg-gray-800 border-gray-700 text-white",
                              !date && "text-gray-500"
                            )}
                          >
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
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
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Select
                          value={time}
                          onValueChange={setTime}
                        >
                          <SelectTrigger className="pl-9 bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {[...Array(24)].map((_, i) => (
                              <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                {i.toString().padStart(2, '0')}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium text-gray-300">Price Range (per hour)</label>
                        <span className="text-sm text-gray-400">
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 20]}
                        min={0}
                        max={20}
                        step={1}
                        value={priceRange}
                        onValueChange={(val) => setPriceRange(val as [number, number])}
                        className="accent-primary"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Amenities</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="evCharging" 
                            checked={filters.evCharging} 
                            onCheckedChange={() => handleFilterChange('evCharging')} 
                            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <label htmlFor="evCharging" className="text-sm flex items-center cursor-pointer text-gray-300">
                            <Bolt className="h-3 w-3 mr-1" /> EV Charging
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="covered" 
                            checked={filters.covered} 
                            onCheckedChange={() => handleFilterChange('covered')}
                            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
                          />
                          <label htmlFor="covered" className="text-sm flex items-center cursor-pointer text-gray-300">
                            <Umbrella className="h-3 w-3 mr-1" /> Covered Parking
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="accessible" 
                            checked={filters.accessible} 
                            onCheckedChange={() => handleFilterChange('accessible')}
                            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
                          />
                          <label htmlFor="accessible" className="text-sm flex items-center cursor-pointer text-gray-300">
                            <Accessibility className="h-3 w-3 mr-1" /> Accessible Spaces
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="security" 
                            checked={filters.security} 
                            onCheckedChange={() => handleFilterChange('security')}
                            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
                          />
                          <label htmlFor="security" className="text-sm flex items-center cursor-pointer text-gray-300">
                            <Shield className="h-3 w-3 mr-1" /> 24/7 Security
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="allDay" 
                            checked={filters.allDay} 
                            onCheckedChange={() => handleFilterChange('allDay')}
                            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
                          />
                          <label htmlFor="allDay" className="text-sm flex items-center cursor-pointer text-gray-300">
                            <Clock className="h-3 w-3 mr-1" /> 24/7 Access
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                      <SearchIcon className="mr-2 h-4 w-4" /> Apply Filters
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <Card key={index} className="overflow-hidden border-gray-800 bg-background">
                      <Skeleton className="h-48 w-full bg-gray-800" />
                      <CardContent className="p-6 space-y-3 bg-background">
                        <Skeleton className="h-6 w-3/4 bg-gray-800" />
                        <Skeleton className="h-4 w-1/2 bg-gray-800" />
                        <div className="flex gap-2 my-4">
                          <Skeleton className="h-6 w-20 bg-gray-800" />
                          <Skeleton className="h-6 w-20 bg-gray-800" />
                          <Skeleton className="h-6 w-20 bg-gray-800" />
                        </div>
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-5 w-16 bg-gray-800" />
                          <Skeleton className="h-5 w-32 bg-gray-800" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">
                  Error loading facilities. Please try again later.
                </div>
              ) : filteredFacilities && filteredFacilities.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-300">
                      Showing {filteredFacilities.length} {filteredFacilities.length === 1 ? 'result' : 'results'}
                    </p>
                    <Select defaultValue="price_asc">
                      <SelectTrigger className="w-[180px] border-gray-700 bg-background text-white">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-gray-700 text-white">
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating_desc">Highest Rated</SelectItem>
                        <SelectItem value="distance">Closest to Me</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredFacilities.map((facility) => (
                      <LocationCard key={facility.id} facility={facility} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <Car className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">No parking spots found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    We couldn't find any parking spots matching your filters. Try adjusting your search criteria.
                  </p>
                  <Button 
                    onClick={() => {
                      setLocation('');
                      setPriceRange([0, 20]);
                      setFilters({
                        evCharging: false,
                        covered: false,
                        accessible: false,
                        security: false,
                        allDay: false
                      });
                    }}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
