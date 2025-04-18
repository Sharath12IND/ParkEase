import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LocationDetails from "@/components/location-detail/location-details";
import BookingForm from "@/components/location-detail/booking-form";
import ParkingMap from "@/components/location-detail/parking-map";
import { ParkingFacility, ParkingSlot } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function LocationDetailPage() {
  const { id } = useParams();
  const facilityId = parseInt(id);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  
  // Fetch facility details
  const { data: facility, isLoading: isLoadingFacility, error } = useQuery<ParkingFacility>({
    queryKey: [`/api/facilities/${facilityId}`],
    enabled: !isNaN(facilityId),
  });
  
  const handleSelectSlot = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    
    // Scroll to booking form on mobile
    if (window.innerWidth < 768) {
      const bookingElement = document.getElementById('booking-form');
      if (bookingElement) {
        bookingElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  const handleChangeSlot = () => {
    setSelectedSlot(null);
    
    // Scroll to map on mobile
    if (window.innerWidth < 768) {
      const mapElement = document.getElementById('parking-map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          {isLoadingFacility ? (
            <LoadingState />
          ) : error || !facility ? (
            <ErrorState />
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Left Side - Details */}
                <div className="w-full md:w-7/12">
                  <LocationDetails facility={facility} />
                  
                  {/* Parking Map */}
                  <div id="parking-map">
                    <ParkingMap 
                      facilityId={facilityId} 
                      onSelectSlot={handleSelectSlot}
                      selectedSlotId={selectedSlot?.id || null}
                    />
                  </div>
                </div>
                
                {/* Right Side - Booking Form */}
                <div className="w-full md:w-5/12" id="booking-form">
                  <BookingForm 
                    facility={facility} 
                    selectedSlot={selectedSlot}
                    onChangeSlot={handleChangeSlot}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-7/12">
          <Skeleton className="h-12 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          
          {/* Image Gallery Skeleton */}
          <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-2 h-80">
            <Skeleton className="col-span-2 row-span-2 rounded-l-lg" />
            <Skeleton className="col-span-2 row-span-1 rounded-tr-lg" />
            <Skeleton className="rounded-br-lg" />
            <Skeleton className="rounded-br-lg" />
          </div>
          
          {/* Details Skeleton */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-8 w-40" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
          
          {/* Map Skeleton */}
          <Skeleton className="h-8 w-40 mb-4" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        
        <div className="w-full md:w-5/12">
          <Skeleton className="h-[600px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">Facility Not Found</h2>
      <p className="text-neutral-600 mb-8">
        We couldn't find the parking facility you're looking for. It may have been removed or the URL is incorrect.
      </p>
      <a href="/search" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
        Browse All Locations
      </a>
    </div>
  );
}
