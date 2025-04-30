import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ParkingFacility } from "@shared/schema";
import LocationCard from "@/components/search/location-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import parking location images
import parking1 from "@assets/parking-images/parking1.jpg";
import parking2 from "@assets/parking-images/parking2.jpg";
import parking3 from "@assets/parking-images/parking3.jpg";
import parking4 from "@assets/parking-images/parking4.jpg";
import parking5 from "@assets/parking-images/parking5.jpg";

// Use local image assets for mall images
const MALL_IMAGES = [
  parking3, // Default
  parking1,
  parking2,
  parking4,
  parking5,
  parking1,
  parking2,
  parking3,
  parking4,
  parking5,
];

// Sample extended facility data
const EXTENDED_FACILITIES = [
  {
    id: 101,
    name: "Westfield Shopping Center",
    address: "245 Market Street",
    city: "Chicago",
    state: "IL",
    zipCode: "60007",
    hourlyRate: 4.5,
    dailyRate: 25.0,
    totalSpaces: 180,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: true,
    hasDisabled: true,
    has24HourAccess: true,
    imageUrls: [MALL_IMAGES[1]],
    rating: 4.0,
    latitude: 41.8781,
    longitude: -87.6298,
    description: "Convenient parking at Chicago's premier shopping destination",
    ownerId: 1,
    reviewCount: 18
  },
  {
    id: 102,
    name: "Grand Avenue Mall",
    address: "789 Grand Avenue",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    hourlyRate: 6.0,
    dailyRate: 40.0,
    totalSpaces: 300,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: true,
    hasDisabled: true,
    has24HourAccess: true,
    imageUrls: [MALL_IMAGES[2]],
    rating: 4.7,
    latitude: 34.0522,
    longitude: -118.2437,
    description: "Premium parking in the heart of downtown Los Angeles",
    ownerId: 1,
    reviewCount: 42
  },
  {
    id: 103,
    name: "Harbor Place Center",
    address: "456 Harbor Drive",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    hourlyRate: 5.0,
    dailyRate: 30.0,
    totalSpaces: 220,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: false,
    hasDisabled: true,
    has24HourAccess: false,
    imageUrls: [MALL_IMAGES[3]],
    rating: 4.5,
    latitude: 47.6062,
    longitude: -122.3321,
    description: "Secure parking near Seattle's busiest shopping district",
    ownerId: 1,
    reviewCount: 23
  },
  {
    id: 104,
    name: "Riverside Shopping Mall",
    address: "123 Riverside Blvd",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    hourlyRate: 4.0,
    dailyRate: 22.0,
    totalSpaces: 250,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: true,
    hasDisabled: true,
    has24HourAccess: true,
    imageUrls: [MALL_IMAGES[4]],
    rating: 4.2,
    latitude: 25.7617,
    longitude: -80.1918,
    description: "Waterfront parking with easy access to Miami's best shops",
    ownerId: 1,
    reviewCount: 31
  },
  {
    id: 105,
    name: "Downtown Plaza Parking",
    address: "555 Main Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    hourlyRate: 3.5,
    dailyRate: 18.0,
    totalSpaces: 200,
    hasEVCharging: false,
    hasSecurity: true,
    hasCovered: false,
    hasDisabled: true,
    has24HourAccess: false,
    imageUrls: [MALL_IMAGES[5]],
    rating: 4.3,
    latitude: 30.2672,
    longitude: -97.7431,
    description: "Affordable parking in downtown Austin",
    ownerId: 1,
    reviewCount: 14
  },
  {
    id: 106,
    name: "Galleria Parking Complex",
    address: "888 Galleria Way",
    city: "Houston",
    state: "TX",
    zipCode: "77056",
    hourlyRate: 5.5,
    dailyRate: 32.0,
    totalSpaces: 400,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: true,
    hasDisabled: true,
    has24HourAccess: true,
    imageUrls: [MALL_IMAGES[6]],
    rating: 4.8,
    latitude: 29.7604,
    longitude: -95.3698,
    description: "Premium parking at Houston's largest shopping center",
    ownerId: 1,
    reviewCount: 52
  },
  {
    id: 107,
    name: "Metropolitan Center",
    address: "321 Metro Drive",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    hourlyRate: 8.0,
    dailyRate: 45.0,
    totalSpaces: 180,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: true,
    hasDisabled: true,
    has24HourAccess: true,
    imageUrls: [MALL_IMAGES[7]],
    rating: 4.6,
    latitude: 37.7749,
    longitude: -122.4194,
    description: "Central parking in San Francisco's bustling downtown",
    ownerId: 1,
    reviewCount: 35
  },
  {
    id: 108,
    name: "Historic District Garage",
    address: "200 Heritage Lane",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    hourlyRate: 7.0,
    dailyRate: 38.0,
    totalSpaces: 150,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: true,
    hasDisabled: true,
    has24HourAccess: false,
    imageUrls: [MALL_IMAGES[8]],
    rating: 4.4,
    latitude: 42.3601,
    longitude: -71.0589,
    description: "Convenient parking in Boston's historic shopping district",
    ownerId: 1,
    reviewCount: 27
  },
  {
    id: 109,
    name: "Capitol Mall Parking",
    address: "1000 Capitol Avenue",
    city: "Washington",
    state: "DC",
    zipCode: "20001",
    hourlyRate: 6.5,
    dailyRate: 35.0,
    totalSpaces: 220,
    hasEVCharging: true,
    hasSecurity: true,
    hasCovered: false,
    hasDisabled: true,
    has24HourAccess: true,
    imageUrls: [MALL_IMAGES[9]],
    rating: 4.5,
    latitude: 38.8951,
    longitude: -77.0364,
    description: "Secure parking near Washington's most popular shopping areas",
    ownerId: 1,
    reviewCount: 33
  }
];

export default function PopularLocations() {
  const { data: facilities, isLoading, error } = useQuery<ParkingFacility[]>({
    queryKey: ["/api/facilities"],
  });

  // Combine real and sample data
  const allFacilities = facilities ? 
    [...facilities.map(f => ({...f, imageUrls: [f.imageUrls?.[0] || MALL_IMAGES[0]]})), ...EXTENDED_FACILITIES] : 
    [...EXTENDED_FACILITIES];

  return (
    <section className="py-12 md:py-20 bg-neutral-100 dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Popular Parking Locations</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover premium parking spots at top shopping centers, business parks, and event venues.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md dark:bg-gray-800">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2 my-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400 my-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-lg font-medium">Error loading facilities</p>
            <p className="mt-2">Please try again later or contact support if the problem persists.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allFacilities.slice(0, 8).map((facility) => (
                <LocationCard key={facility.id} facility={facility} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/search">
                <Button className="neo-brutalism px-6 py-6">
                  View All Locations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
