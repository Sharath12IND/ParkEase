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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold text-black">Select Your Parking Spot</h3>
        
        <div className="flex items-center gap-3">
          <Tabs 
            value={viewMode} 
            onValueChange={(v) => setViewMode(v as "grid" | "visual")}
            className="border-2 border-primary/20 rounded-lg shadow-sm"
          >
            <TabsList className="bg-white p-1">
              <TabsTrigger 
                value="visual" 
                className="px-4 py-2 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Visual
              </TabsTrigger>
              <TabsTrigger 
                value="grid" 
                className="px-4 py-2 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Grid
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select
            value={selectedLevel}
            onValueChange={setSelectedLevel}
          >
            <SelectTrigger className="text-base py-2 px-4 h-10 w-36 border-2 border-primary/20 rounded-lg bg-white text-black font-medium shadow-sm">
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
      <div className="flex flex-wrap items-center text-base gap-6 mb-4 bg-white p-4 rounded-xl shadow-md border border-primary/10">
        <span className="font-semibold text-black">Map Legend:</span>
        <span className="flex items-center bg-green-50 px-3 py-1 rounded-full">
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          <span className="text-black font-medium">Available</span>
        </span>
        <span className="flex items-center bg-red-50 px-3 py-1 rounded-full">
          <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
          <span className="text-black font-medium">Occupied</span>
        </span>
        <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
          <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
          <span className="text-black font-medium">Selected</span>
        </span>
      </div>
      
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-8">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <div className="parking-map rounded-xl overflow-hidden shadow-lg">
          {viewMode === "visual" ? (
            <div className="relative border-2 border-primary/10 rounded-xl bg-white">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1621928372414-30e144d111a0?auto=format&fit=crop&w=1400&q=80" 
                  alt={`Parking level ${selectedLevel}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay text */}
                <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg text-base font-bold text-black shadow-lg">
                  Level {selectedLevel} - Mall Entrance
                </div>
                
                {/* Direction indicators */}
                <div className="absolute bottom-4 right-4 bg-primary/90 p-3 rounded-lg flex items-center text-base font-bold text-white shadow-lg">
                  <ArrowDown className="h-5 w-5 mr-2 rotate-180" />
                  <span>Entry</span>
                </div>
                
                {/* Overlay slots */}
                <div className="absolute inset-0 grid grid-cols-5 sm:grid-cols-8 gap-3 p-10">
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
                        className={`absolute inset-0 ${getSlotOpacity(slot)} rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-all border-2 border-white/30 shadow-md hover:shadow-lg transform hover:scale-105`}
                        onClick={() => handleSlotClick(slot)}
                      >
                        <div className="text-white font-bold flex flex-col items-center">
                          <Car className="h-6 w-6 mb-1" />
                          <span className="text-base">{slot.slotNumber}</span>
                          {slot.id === selectedSlotId && (
                            <CheckCircle className="h-5 w-5 mt-1 animate-pulse text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Selected slot information */}
              {selectedSlotId && (
                <div className="bg-primary/10 p-4 border-t-2 border-primary/20 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md">
                      {slotsForLevel.find(s => s.id === selectedSlotId)?.slotNumber || 'A1'}
                    </div>
                    <div>
                      <div className="text-base font-bold text-black">Spot Selected</div>
                      <div className="text-sm text-black">
                        Type: <span className="font-semibold">{slotsForLevel.find(s => s.id === selectedSlotId)?.slotType || 'Standard'}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-2 border-primary/40 hover:bg-primary/10 text-primary font-semibold"
                    onClick={() => setViewMode("grid")}
                  >
                    View as Grid
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-3 overflow-auto">
                {slotsForLevel.map((slot) => (
                  <div
                    key={slot.id}
                    className={`slot ${getSlotColor(slot)} h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold cursor-pointer border-2 border-white/30 shadow-md ${
                      slot.status === "available" ? "hover:opacity-90 hover:scale-105 transform transition-all" : "cursor-not-allowed opacity-80"
                    } ${slot.id === selectedSlotId ? 'ring-4 ring-white' : ''}`}
                    onClick={() => slot.status === "available" && handleSlotClick(slot)}
                  >
                    <Car className="h-5 w-5 mb-1" />
                    <span className="text-base">{slot.slotNumber}</span>
                  </div>
                ))}
                
                {slotsForLevel.length === 0 && (
                  <div className="col-span-10 p-10 text-center bg-gray-50 rounded-lg">
                    <Car className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-gray-700">No Parking Spots</h4>
                    <p className="text-gray-500">No slots available for this level</p>
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
