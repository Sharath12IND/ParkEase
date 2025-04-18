import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addHours } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { ParkingFacility, ParkingSlot, Vehicle } from "@shared/schema";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

interface BookingFormProps {
  facility: ParkingFacility;
  selectedSlot: ParkingSlot | null;
  onChangeSlot: () => void;
}

export default function BookingForm({ facility, selectedSlot, onChangeSlot }: BookingFormProps) {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [hours, setHours] = useState(3);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  
  // Get user vehicles
  const { data: vehicles, isLoading: isLoadingVehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
    enabled: !!user,
  });
  
  // Calculate start and end times
  const startTime = date;
  const endTime = addHours(startTime, hours);
  
  // Calculate price
  const basePrice = facility.hourlyRate * hours;
  const evFee = selectedSlot?.slotType === "ev" ? 5 : 0;
  const serviceFee = 2.5;
  const totalPrice = basePrice + evFee + serviceFee;
  
  // Create booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      if (!user) {
        setLocation("/auth");
        return;
      }
      const res = await apiRequest("POST", "/api/bookings", bookingData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your parking spot has been successfully booked.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: [`/api/facilities/${facility.id}/slots`] });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Set default vehicle when vehicles are loaded
  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      const defaultVehicle = vehicles.find(v => v.isDefault) || vehicles[0];
      setSelectedVehicleId(defaultVehicle.id.toString());
    }
  }, [vehicles]);
  
  const handleBooking = () => {
    if (!selectedSlot) {
      toast({
        title: "No Slot Selected",
        description: "Please select a parking slot before booking.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedVehicleId) {
      toast({
        title: "No Vehicle Selected",
        description: "Please select or add a vehicle for your booking.",
        variant: "destructive",
      });
      return;
    }
    
    bookingMutation.mutate({
      facilityId: facility.id,
      slotId: selectedSlot.id,
      vehicleId: parseInt(selectedVehicleId),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      totalAmount: totalPrice,
      status: "confirmed",
      paymentStatus: "paid",
    });
  };
  
  if (!user) {
    return (
      <Card className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
        <CardContent className="p-0">
          <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-4">Book Your Parking Spot</h3>
          <p className="mb-6 text-neutral-600">Please log in or create an account to book a parking spot.</p>
          <Button 
            className="w-full" 
            onClick={() => setLocation("/auth")}
          >
            Log In or Sign Up
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <CardContent className="p-0">
        <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-4">Book Your Parking Spot</h3>
        
        {/* Date & Time Selection */}
        <div className="mb-6">
          <label className="block text-neutral-700 font-medium mb-2">Date & Time</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-10 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full pl-10 justify-start text-left font-normal"
                >
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
                  {format(date, "h:mm a")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Duration Selection */}
        <div className="mb-6">
          <label className="block text-neutral-700 font-medium mb-2">Duration</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((h) => (
              <Button 
                key={h} 
                variant={hours === h ? "default" : "outline"}
                className={hours === h ? "bg-primary text-white" : "bg-primary-50 hover:bg-primary-100 text-primary"}
                onClick={() => setHours(h)}
              >
                {h}h
              </Button>
            ))}
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-600">Custom duration</span>
              <span className="text-primary font-medium">{hours} hours</span>
            </div>
            <Slider
              defaultValue={[3]}
              min={1}
              max={10}
              step={1}
              value={[hours]}
              onValueChange={(val) => setHours(val[0])}
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1h</span>
              <span>5h</span>
              <span>10h</span>
            </div>
          </div>
        </div>
        
        {/* Vehicle Selection */}
        <div className="mb-6">
          <label className="block text-neutral-700 font-medium mb-2">Vehicle</label>
          {isLoadingVehicles ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          ) : (
            <Select
              value={selectedVehicleId}
              onValueChange={setSelectedVehicleId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles?.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                    {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                  </SelectItem>
                ))}
                <SelectItem value="add_new">Add New Vehicle</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        
        {/* Selected Spot */}
        <div className="mb-6">
          <label className="block text-neutral-700 font-medium mb-2">Selected Spot</label>
          {selectedSlot ? (
            <div className="bg-primary-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <span className="text-primary font-medium text-lg">{selectedSlot.slotNumber}</span>
                <span className="text-neutral-500 ml-2">Level {selectedSlot.level}</span>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium" onClick={onChangeSlot}>
                Change
              </Button>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-lg text-amber-800">
              Please select a parking slot from the map below.
            </div>
          )}
        </div>
        
        {/* Price Breakdown */}
        <div className="mb-6">
          <h4 className="font-medium text-neutral-700 mb-3">Price Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Base rate ({hours} hours)</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {evFee > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-600">EV Charging Access</span>
                <span>${evFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-600">Service fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="separator my-2"></div>
            <div className="flex justify-between font-medium text-base">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Booking Button */}
        <Button 
          className="w-full" 
          onClick={handleBooking}
          disabled={!selectedSlot || !selectedVehicleId || bookingMutation.isPending}
        >
          {bookingMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
        
        <div className="text-center text-sm text-neutral-500 mt-4">
          <p>You won't be charged until you confirm this booking</p>
        </div>
      </CardContent>
    </Card>
  );
}
