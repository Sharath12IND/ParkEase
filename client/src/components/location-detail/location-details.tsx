import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ParkingFacility, Review } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Car, 
  Zap, 
  Accessibility, 
  Camera, 
  Star, 
  Calendar 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface LocationDetailsProps {
  facility: ParkingFacility;
}

export default function LocationDetails({ facility }: LocationDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  // Fetch reviews
  const { data: reviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: [`/api/facilities/${facility.id}/reviews`],
  });
  
  const getInitials = (name: string) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  };
  
  const formatReviewDate = (dateString: Date | null) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return format(date, 'PP');
    }
  };

  return (
    <>
      <h2 className="text-4xl font-extrabold text-black mb-2 tracking-tight">{facility.name}</h2>
      <p className="text-black text-lg mb-6 font-medium">{facility.address}, {facility.city}, {facility.state} {facility.zipCode}</p>
      
      {/* Image Gallery */}
      <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-3 h-96 rounded-xl overflow-hidden shadow-xl">
        <div className="col-span-2 row-span-2 relative group">
          <div 
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80')` }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-bold text-xl">Modern Facility</h3>
          </div>
        </div>
        <div className="col-span-2 row-span-1 relative group overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=700&q=80')` }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white font-bold">Secure Parking</h3>
          </div>
        </div>
        <div className="relative group overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&w=400&q=80')` }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <h3 className="text-white font-bold text-sm">EV Charging</h3>
          </div>
        </div>
        <div className="relative group overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603038728088-1d1774dcb01c?auto=format&fit=crop&w=400&q=80')` }}
          ></div>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/60 transition-all">
            <span className="text-white font-bold text-lg">+8 More</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Facility Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          {/* Facility Details */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black mb-5">Facility Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-md border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Clock className="text-primary h-7 w-7" />
                </div>
                <h4 className="font-bold text-black text-base">Hours</h4>
                <div className="font-medium text-center text-black mt-1">{facility.has24HourAccess ? '24/7 Access' : '8:00 AM - 10:00 PM'}</div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-md border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Car className="text-primary h-7 w-7" />
                </div>
                <h4 className="font-bold text-black text-base">Total Spaces</h4>
                <div className="font-medium text-center text-black mt-1">{facility.totalSpaces}+ Parking Spots</div>
              </div>
              
              {facility.hasEVCharging && (
                <div className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-md border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Zap className="text-primary h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-black text-base">EV Charging</h4>
                  <div className="font-medium text-center text-black mt-1">Premium Stations</div>
                </div>
              )}
              
              {facility.hasDisabled && (
                <div className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-md border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Accessibility className="text-primary h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-black text-base">Accessibility</h4>
                  <div className="font-medium text-center text-black mt-1">Reserved Spaces</div>
                </div>
              )}
              
              {facility.hasSecurity && (
                <div className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-md border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Camera className="text-primary h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-black text-base">Security</h4>
                  <div className="font-medium text-center text-black mt-1">24/7 Monitored</div>
                </div>
              )}
              
              <div className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-md border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Calendar className="text-primary h-7 w-7" />
                </div>
                <h4 className="font-bold text-black text-base">Reservation</h4>
                <div className="font-medium text-center text-black mt-1">Instant Booking</div>
              </div>
            </div>
          </div>
          
          {/* Facility Description */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-md">
            <h3 className="text-2xl font-bold text-black mb-4">About This Facility</h3>
            <p className="text-black text-lg leading-relaxed">
              {facility.description || 'This premium parking facility offers convenient access to surrounding attractions and amenities. With multiple levels and various parking options, you\'ll find the perfect spot for your vehicle. Enjoy peace of mind with our 24/7 security monitoring and easy access system.'}
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <h4 className="font-semibold text-black">Hourly Rate</h4>
                <p className="text-primary font-bold text-xl">${facility.hourlyRate.toFixed(2)}/hr</p>
              </div>
              
              {facility.dailyRate && (
                <div className="bg-primary/5 p-3 rounded-lg">
                  <h4 className="font-semibold text-black">Daily Rate</h4>
                  <p className="text-primary font-bold text-xl">${facility.dailyRate.toFixed(2)}/day</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div>
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-black">Customer Reviews</h3>
              <div className="flex items-center bg-primary/10 p-2 px-4 rounded-lg">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${i < Math.floor(facility.rating || 0) ? 'text-yellow-500 fill-current' : 'text-neutral-300'} h-5 w-5`}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg text-black ml-2">{(facility.rating || 0).toFixed(1)}</span>
                <span className="text-black ml-1">({facility.reviewCount || 0} reviews)</span>
              </div>
            </div>
            
            {isLoadingReviews ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border border-neutral-200 p-4 rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="mr-3 h-12 w-12">
                          <AvatarFallback className="bg-primary-100 text-primary-800">
                            ??
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                          <div className="h-3 w-16 bg-neutral-200 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-4 w-4 bg-neutral-200 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-4 w-full bg-neutral-200 rounded mt-2"></div>
                    <div className="h-4 w-3/4 bg-neutral-200 rounded mt-2"></div>
                  </div>
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-neutral-200 p-5 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center">
                        <Avatar className="mr-4 h-12 w-12 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {getInitials("User")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-black">Customer</div>
                          <div className="text-sm text-black/70">{formatReviewDate(review.createdAt)}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500 bg-yellow-50 p-1 px-2 rounded">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${i < review.rating ? 'fill-current' : 'text-neutral-300'} h-4 w-4`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-black text-lg">{review.comment}</p>
                  </div>
                ))}
                
                {reviews.length > 2 && (
                  <div className="text-center mt-6">
                    <button className="text-white bg-primary hover:bg-primary/90 font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                      View All {facility.reviewCount} Reviews
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-neutral-200">
                <Star className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-black mb-2">No Reviews Yet</h4>
                <p className="text-black/70 max-w-md mx-auto">
                  Be the first to review this parking facility and help others make informed decisions!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
