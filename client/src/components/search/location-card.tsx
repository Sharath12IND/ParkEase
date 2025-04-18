import { Link } from "wouter";
import { ParkingFacility } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Bolt, Shield, Umbrella, Accessibility, MapPin, Star, ArrowRight } from "lucide-react";

interface LocationCardProps {
  facility: ParkingFacility;
}

export default function LocationCard({ facility }: LocationCardProps) {
  return (
    <Link href={`/location/${facility.id}`}>
      <Card className="card-glow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-card h-full transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={facility.imageUrls?.[0] || 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
            alt={facility.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {(facility.rating ?? 0) >= 4.5 && (
            <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
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
        
        <CardContent className="p-5">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1 line-clamp-1">{facility.name}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{facility.city}, {facility.state}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
              <Car className="mr-1 h-3 w-3" /> {facility.totalSpaces}+
            </Badge>
            
            {facility.hasEVCharging && (
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                <Bolt className="mr-1 h-3 w-3" /> EV
              </Badge>
            )}
            
            {facility.hasSecurity && (
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                <Shield className="mr-1 h-3 w-3" /> Security
              </Badge>
            )}
            
            {facility.hasCovered && (
              <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                <Umbrella className="mr-1 h-3 w-3" /> Covered
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
            <div>
              <span className="text-gray-500 dark:text-gray-400 text-xs">From</span>
              <span className="text-gray-900 dark:text-white font-bold ml-1 text-lg">${facility.hourlyRate.toFixed(2)}</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">/hr</span>
            </div>
            <div className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm flex items-center">
              View <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
