import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ParkingFacility } from "@shared/schema";
import LocationCard from "@/components/search/location-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PopularLocations() {
  const { data: facilities, isLoading, error } = useQuery<ParkingFacility[]>({
    queryKey: ["/api/facilities"],
  });

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary-900 mb-4">Popular Parking Locations</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Discover premium parking spots at top shopping centers, business parks, and event venues.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2 my-4">
                    <Skeleton className="h-6 w-20" />
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
          <div className="text-center text-red-500 my-8">
            Error loading facilities. Please try again later.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities?.slice(0, 3).map((facility) => (
                <LocationCard key={facility.id} facility={facility} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/search">
                <Button variant="outline" className="border-2 border-primary hover:bg-primary-50">
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
