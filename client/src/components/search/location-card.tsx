import { Link } from "wouter";
import { ParkingFacility } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Bolt, Shield, Umbrella, Accessibility } from "lucide-react";
import { Star } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface LocationCardProps {
  facility: ParkingFacility;
}

export default function LocationCard({ facility }: LocationCardProps) {
  return (
    <Link href={`/location/${facility.id}`}>
      <Card className="location-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer">
        <div className="relative h-48">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${facility.imageUrls?.[0] || 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'})` }}
          ></div>
          {facility.rating >= 4.8 && (
            <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
              Premium
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-poppins font-semibold text-xl text-primary-900">{facility.name}</h3>
            <div className="flex items-center text-accent">
              <Star className="fill-current h-4 w-4" />
              <span className="ml-1 text-neutral-700">{facility.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-neutral-600 mb-4">{facility.city}, {facility.state}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge variant="outline" className="bg-primary-50 text-primary border-none">
              <Car className="mr-1 h-3 w-3" /> {facility.totalSpaces}+ Spaces
            </Badge>
            
            {facility.hasEVCharging && (
              <Badge variant="outline" className="bg-primary-50 text-primary border-none">
                <Bolt className="mr-1 h-3 w-3" /> EV Charging
              </Badge>
            )}
            
            {facility.hasSecurity && (
              <Badge variant="outline" className="bg-primary-50 text-primary border-none">
                <Shield className="mr-1 h-3 w-3" /> 24/7 Security
              </Badge>
            )}
            
            {facility.hasCovered && (
              <Badge variant="outline" className="bg-primary-50 text-primary border-none">
                <Umbrella className="mr-1 h-3 w-3" /> Covered
              </Badge>
            )}
            
            {facility.hasDisabled && (
              <Badge variant="outline" className="bg-primary-50 text-primary border-none">
                <Accessibility className="mr-1 h-3 w-3" /> Accessible
              </Badge>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-neutral-500 text-sm">From</span>
              <span className="text-primary-900 font-semibold ml-1">${facility.hourlyRate.toFixed(2)}/hr</span>
            </div>
            <div className="text-primary hover:text-primary/80 font-medium transition-all flex items-center">
              View Availability <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
