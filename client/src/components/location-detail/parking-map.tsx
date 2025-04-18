import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ParkingSlot } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ArrowDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Parking garage layout images
const PARKING_IMAGES = {
  "1": "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "2": "https://images.unsplash.com/photo-1621928372414-30e144d111a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "3": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
};

interface ParkingMapProps {
  facilityId: number;
  onSelectSlot: (slot: ParkingSlot) => void;
  selectedSlotId: number | null;
}

export default function ParkingMap({ facilityId, onSelectSlot, selectedSlotId }: ParkingMapProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("1");
  const [viewMode, setViewMode] = useState<"grid" | "visual">("visual");
  
  // Fetch parking slots
  const { data: slots, isLoading } = useQuery<ParkingSlot[]>({
    queryKey: [`/api/facilities/${facilityId}/slots`],
  });
  
  // Group slots by level
  const slotsByLevel = slots ? 
    slots.reduce((acc, slot) => {
      const level = (slot.level ?? 1).toString();
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(slot);
      return acc;
    }, {} as Record<string, ParkingSlot[]>) : {};
  
  // Get unique levels
  const levels = slots ? 
    Array.from(new Set(slots.map(slot => (slot.level ?? 1).toString()))) : [];
  
  // Select first level if no level is selected
  useEffect(() => {
    if (levels.length > 0 && !levels.includes(selectedLevel)) {
      setSelectedLevel(levels[0]);
    }
  }, [levels, selectedLevel]);

  // Get slots for the selected level
  const slotsForLevel = slotsByLevel[selectedLevel] || [];
  
  // Determine color for slot status
  const getSlotColor = (slot: ParkingSlot) => {
    if (slot.id === selectedSlotId) return "bg-blue-600 border-blue-400"; // Selected
    if (slot.status === "available") return "bg-green-600 border-green-400"; // Available
    return "bg-red-600 border-red-400"; // Occupied or reserved
  };
  
  // Determine opacity for visual mode slot overlay
  const getSlotOpacity = (slot: ParkingSlot) => {
    if (slot.id === selectedSlotId) return "bg-blue-600/80"; // Selected
    if (slot.status === "available") return "bg-green-600/70"; // Available
    return "bg-red-600/70"; // Occupied or reserved
  };
  
  // Handle slot click
  const handleSlotClick = (slot: ParkingSlot) => {
    if (slot.status === "available") {
      onSelectSlot(slot);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Parking Map</h3>
        
        <div className="flex items-center space-x-3">
          <Tabs 
            value={viewMode} 
            onValueChange={(v) => setViewMode(v as "grid" | "visual")}
            className="border border-gray-200 dark:border-gray-700 rounded-md"
          >
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-0.5">
              <TabsTrigger 
                value="visual" 
                className="px-2 py-1 text-xs"
              >
                Visual
              </TabsTrigger>
              <TabsTrigger 
                value="grid" 
                className="px-2 py-1 text-xs"
              >
                Grid
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select
            value={selectedLevel}
            onValueChange={setSelectedLevel}
          >
            <SelectTrigger className="text-sm py-1 px-3 h-8 w-32 border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>Level {level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap items-center text-sm gap-4 mb-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <span className="font-medium text-gray-600 dark:text-gray-300">Legend:</span>
        <span className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-600 rounded-full mr-1"></span>
          <span className="text-gray-700 dark:text-gray-300">Available</span>
        </span>
        <span className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-1"></span>
          <span className="text-gray-700 dark:text-gray-300">Occupied</span>
        </span>
        <span className="flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-1"></span>
          <span className="text-gray-700 dark:text-gray-300">Selected</span>
        </span>
      </div>
      
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Skeleton className="h-48 w-full rounded-md" />
          <div className="flex justify-between mt-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      ) : (
        <div className="parking-map rounded-lg overflow-hidden">
          {viewMode === "visual" ? (
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={PARKING_IMAGES[selectedLevel as keyof typeof PARKING_IMAGES] || PARKING_IMAGES["1"]} 
                  alt={`Parking level ${selectedLevel}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay text */}
                <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/70 p-2 rounded-md text-sm font-medium text-gray-800 dark:text-white">
                  Level {selectedLevel} - Mall Entrance
                </div>
                
                {/* Direction indicators */}
                <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/70 p-2 rounded-md flex items-center text-sm font-medium text-gray-800 dark:text-white">
                  <ArrowDown className="h-4 w-4 mr-1 rotate-180" />
                  <span>Entry</span>
                </div>
                
                {/* Overlay slots */}
                <div className="absolute inset-0 grid grid-cols-5 sm:grid-cols-8 gap-2 p-8">
                  {slotsForLevel.map((slot) => (
                    <div 
                      key={slot.id}
                      className="relative"
                      style={{
                        gridColumn: `span 1 / span 1`,
                        gridRow: `span 1 / span 1`,
                      }}
                    >
                      <div 
                        className={`absolute inset-0 ${getSlotOpacity(slot)} rounded-md flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => handleSlotClick(slot)}
                      >
                        <div className="text-white font-bold flex flex-col items-center">
                          <Car className="h-5 w-5 mb-1" />
                          <span>{slot.slotNumber}</span>
                          {slot.id === selectedSlotId && (
                            <CheckCircle className="h-4 w-4 mt-1 animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Selected slot information */}
              {selectedSlotId && (
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 border-t border-blue-200 dark:border-blue-800 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {slotsForLevel.find(s => s.id === selectedSlotId)?.slotNumber || 'A1'}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Slot Selected</div>
                      <div className="text-xs text-blue-600 dark:text-blue-300">
                        Type: {slotsForLevel.find(s => s.id === selectedSlotId)?.slotType || 'Standard'}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900 text-blue-800 dark:text-blue-200"
                    onClick={() => setViewMode("grid")}
                  >
                    View as Grid
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 overflow-auto">
                {slotsForLevel.map((slot) => (
                  <div
                    key={slot.id}
                    className={`slot ${getSlotColor(slot)} h-14 rounded-md flex flex-col items-center justify-center text-white font-medium cursor-pointer border ${
                      slot.status === "available" ? "hover:opacity-90" : "cursor-not-allowed opacity-80"
                    } ${slot.id === selectedSlotId ? 'ring-2 ring-white' : ''}`}
                    onClick={() => slot.status === "available" && handleSlotClick(slot)}
                  >
                    <Car className="h-4 w-4 mb-1" />
                    {slot.slotNumber}
                  </div>
                ))}
                
                {slotsForLevel.length === 0 && (
                  <div className="col-span-10 p-10 text-center text-gray-500 dark:text-gray-400">
                    No parking slots available for this level.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
