import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ParkingSlot } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ParkingMapProps {
  facilityId: number;
  onSelectSlot: (slot: ParkingSlot) => void;
  selectedSlotId: number | null;
}

export default function ParkingMap({ facilityId, onSelectSlot, selectedSlotId }: ParkingMapProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("1");
  
  // Fetch parking slots
  const { data: slots, isLoading } = useQuery<ParkingSlot[]>({
    queryKey: [`/api/facilities/${facilityId}/slots`],
  });
  
  // Group slots by level
  const slotsByLevel = slots ? 
    slots.reduce((acc, slot) => {
      const level = slot.level.toString();
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(slot);
      return acc;
    }, {} as Record<string, ParkingSlot[]>) : {};
  
  // Get unique levels
  const levels = slots ? 
    [...new Set(slots.map(slot => slot.level.toString()))] : [];
  
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
    if (slot.id === selectedSlotId) return "bg-blue-500"; // Selected
    if (slot.status === "available") return "bg-green-500"; // Available
    return "bg-red-500"; // Occupied or reserved
  };
  
  // Handle slot click
  const handleSlotClick = (slot: ParkingSlot) => {
    if (slot.status === "available") {
      onSelectSlot(slot);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-4">Parking Map</h3>
      
      <div className="parking-map bg-neutral-100 rounded-lg p-4 overflow-hidden">
        <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Level {selectedLevel} - Main Mall Entrance</h4>
            <div className="flex items-center space-x-4">
              <Select
                value={selectedLevel}
                onValueChange={setSelectedLevel}
              >
                <SelectTrigger className="bg-primary-50 border-0 rounded-md text-sm py-1 px-2 h-8 w-32">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>Level {level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center text-sm gap-2">
                <span className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  <span className="mr-2">Available</span>
                </span>
                <span className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                  <span className="mr-2">Occupied</span>
                </span>
                <span className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  <span>Selected</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 overflow-auto">
            {slotsForLevel.map((slot) => (
              <div
                key={slot.id}
                className={`slot ${getSlotColor(slot)} h-12 rounded flex items-center justify-center text-white font-medium cursor-pointer ${
                  slot.status === "available" ? "hover:bg-blue-500" : "cursor-not-allowed"
                }`}
                onClick={() => slot.status === "available" && handleSlotClick(slot)}
              >
                {slot.slotNumber}
              </div>
            ))}
            
            {slotsForLevel.length === 0 && (
              <div className="col-span-10 p-10 text-center text-neutral-500">
                No parking slots available for this level.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
