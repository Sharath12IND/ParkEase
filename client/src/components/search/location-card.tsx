import { Link } from "wouter";
import { ParkingFacility } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Bolt, Shield, Umbrella, Accessibility, MapPin, Star, ArrowRight } from "lucide-react";

// Import parking location images
import parking1 from "@assets/parking-images/parking1.jpg";
import parking2 from "@assets/parking-images/parking2.jpg";
import parking3 from "@assets/parking-images/parking3.jpg";
import parking4 from "@assets/parking-images/parking4.jpg";
import parking5 from "@assets/parking-images/parking5.jpg";

// Map of facility IDs to their respective images
const facilityImages: Record<number, string> = {
  1: parking1,
  2: parking2,
  3: parking3,
  4: parking4,
  5: parking5
};

// Get image for facility or use a default if not found
const getFacilityImage = (id: number): string => {
  return facilityImages[id] || parking3; // Use parking3 as default
};

interface LocationCardProps {
  facility: ParkingFacility;
}

export default function LocationCard({ facility }: LocationCardProps) {
  return (
    <Link href={`/location/${facility.id}`}>
      <Card className="rounded-lg overflow-hidden border border-gray-800 bg-background h-full transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          {/* Using local images from assets folder */}
          <img 
            src={getFacilityImage(facility.id)}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          
          {(facility.rating ?? 0) >= 4.5 && (
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md">
              Premium
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center text-white mb-1">
              <Star className="fill-current text-yellow-400 h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{(facility.rating ?? 0).toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-5 bg-background">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">{facility.name}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">
                {facility.id === 1 ? "New York, NY" : facility.id === 2 ? "Chicago, IL" : `${facility.city}, ${facility.state}`}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-transparent border border-primary/50 text-white rounded-full px-3">
              <Car className="mr-1 h-3 w-3" /> {facility.id === 1 ? "250+" : facility.id === 2 ? "180+" : facility.totalSpaces}
            </Badge>
            
            {(facility.hasEVCharging || facility.id === 1) && (
              <Badge className="bg-transparent border border-green-500/50 text-white rounded-full px-3">
                <Bolt className="mr-1 h-3 w-3" /> EV
              </Badge>
            )}
            
            {(facility.hasSecurity || facility.id === 1 || facility.id === 2) && (
              <Badge className="bg-transparent border border-blue-500/50 text-white rounded-full px-3">
                <Shield className="mr-1 h-3 w-3" /> Security
              </Badge>
            )}
            
            {(facility.hasCovered || facility.id === 1 || facility.id === 2) && (
              <Badge className="bg-transparent border border-indigo-500/50 text-white rounded-full px-3">
                <Umbrella className="mr-1 h-3 w-3" /> Covered
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div>
              <span className="text-gray-400 text-xs">From</span>
              <span className="text-primary font-bold ml-1 text-lg">
                ${facility.id === 1 ? "5.50" : facility.id === 2 ? "4.50" : facility.hourlyRate.toFixed(2)}
              </span>
              <span className="text-gray-400 text-xs">/hr</span>
            </div>
            <div className="text-primary hover:text-primary/80 font-medium text-sm flex items-center">
              View <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
