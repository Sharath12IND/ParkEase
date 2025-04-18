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
  
  const formatReviewDate = (dateString: Date) => {
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
      <h2 className="text-3xl font-bold font-poppins text-primary-900 mb-2">{facility.name}</h2>
      <p className="text-neutral-600 mb-6">{facility.address}, {facility.city}, {facility.state} {facility.zipCode}</p>
      
      {/* Image Gallery */}
      <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-2 h-80">
        <div className="col-span-2 row-span-2 relative">
          <div 
            className="w-full h-full rounded-l-lg bg-cover bg-center" 
            style={{ backgroundImage: `url(${facility.imageUrls?.[0] || 'https://images.unsplash.com/photo-1621928372414-30e144d111a0'})` }}
          ></div>
        </div>
        <div className="col-span-2 row-span-1 relative">
          <div 
            className="w-full h-full rounded-tr-lg bg-cover bg-center" 
            style={{ backgroundImage: `url(${facility.imageUrls?.[1] || 'https://images.unsplash.com/photo-1611521639504-f64cd0dd0d2d'})` }}
          ></div>
        </div>
        <div className="relative">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${'https://images.unsplash.com/photo-1604063155785-ee4488b8ad15'})` }}
          ></div>
        </div>
        <div className="relative">
          <div 
            className="w-full h-full rounded-br-lg bg-cover bg-center" 
            style={{ backgroundImage: `url(${'https://images.unsplash.com/photo-1470224114660-3f6686c562eb'})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-br-lg">
            <span className="text-white font-medium">+12 more</span>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                <Clock className="text-primary mr-3 h-5 w-5" />
                <div>
                  <div className="text-sm text-neutral-500">Opening Hours</div>
                  <div className="font-medium">{facility.has24HourAccess ? '24/7' : '8:00 AM - 10:00 PM'}</div>
                </div>
              </div>
              <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                <Car className="text-primary mr-3 h-5 w-5" />
                <div>
                  <div className="text-sm text-neutral-500">Spaces</div>
                  <div className="font-medium">{facility.totalSpaces}+</div>
                </div>
              </div>
              {facility.hasEVCharging && (
                <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                  <Zap className="text-primary mr-3 h-5 w-5" />
                  <div>
                    <div className="text-sm text-neutral-500">EV Charging</div>
                    <div className="font-medium">Available</div>
                  </div>
                </div>
              )}
              {facility.hasDisabled && (
                <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                  <Accessibility className="text-primary mr-3 h-5 w-5" />
                  <div>
                    <div className="text-sm text-neutral-500">Accessible</div>
                    <div className="font-medium">Available</div>
                  </div>
                </div>
              )}
              {facility.hasSecurity && (
                <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                  <Camera className="text-primary mr-3 h-5 w-5" />
                  <div>
                    <div className="text-sm text-neutral-500">Security</div>
                    <div className="font-medium">24/7 Monitored</div>
                  </div>
                </div>
              )}
              <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                <Car className="text-primary mr-3 h-5 w-5" />
                <div>
                  <div className="text-sm text-neutral-500">Height Limit</div>
                  <div className="font-medium">6'8" / 2.03m</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Facility Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-4">About This Facility</h3>
            <p className="text-neutral-600">
              {facility.description || 'This premium parking facility offers convenient access to surrounding attractions and amenities. With multiple levels and various parking options, you\'ll find the perfect spot for your vehicle.'}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold font-poppins text-primary-900">Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${i < Math.floor(facility.rating) ? 'text-accent fill-current' : 'text-neutral-300'} h-4 w-4`}
                    />
                  ))}
                </div>
                <span className="font-medium">{facility.rating.toFixed(1)}</span>
                <span className="text-neutral-500 ml-1">({facility.reviewCount})</span>
              </div>
            </div>
            
            {isLoadingReviews ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border-t border-neutral-200 py-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="mr-3">
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
              <div>
                {reviews.map((review) => (
                  <div key={review.id} className="border-t border-neutral-200 py-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="mr-3">
                          <AvatarFallback className="bg-primary-100 text-primary-800">
                            {getInitials("User")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Customer</div>
                          <div className="text-sm text-neutral-500">{formatReviewDate(review.createdAt)}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${i < review.rating ? 'fill-current' : 'text-neutral-300'} h-4 w-4`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-600">{review.comment}</p>
                  </div>
                ))}
                
                {reviews.length > 2 && (
                  <div className="text-center mt-4">
                    <button className="text-primary hover:text-primary/80 font-medium">
                      View All {facility.reviewCount} Reviews
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                No reviews yet. Be the first to review this parking facility!
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
