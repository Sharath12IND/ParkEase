import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Booking, ParkingFacility, ParkingSlot, Vehicle } from "@shared/schema";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

interface EnhancedBooking extends Booking {
  facility?: ParkingFacility;
  slot?: ParkingSlot;
  vehicle?: Vehicle;
}

interface RecentBookingsProps {
  isVendor?: boolean;
}

export default function RecentBookings({ isVendor = false }: RecentBookingsProps) {
  // Get bookings
  const { data: bookings, isLoading: isLoadingBookings } = useQuery<Booking[]>({
    queryKey: isVendor ? ["/api/vendor/bookings"] : ["/api/bookings"],
  });
  
  // Get facilities, slots, and vehicles to display additional info
  const { data: facilities } = useQuery<ParkingFacility[]>({
    queryKey: ["/api/facilities"],
  });
  
  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const res = await apiRequest("PATCH", `/api/bookings/${bookingId}/cancel`, {});
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vendor/bookings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Cancellation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Enrich bookings with related data
  const enhancedBookings: EnhancedBooking[] = bookings
    ? bookings.map(booking => {
        const facility = facilities?.find(f => f.id === booking.facilityId);
        return {
          ...booking,
          facility
        };
      })
    : [];
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Handle cancel booking
  const handleCancelBooking = (bookingId: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate(bookingId);
    }
  };
  
  // Format date and time
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d, yyyy h:mm a');
  };
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isVendor ? "Recent Bookings" : "My Bookings"}</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {isLoadingBookings ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : enhancedBookings && enhancedBookings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                {isVendor && <TableHead>Customer</TableHead>}
                <TableHead>Location</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enhancedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">#{booking.id}</TableCell>
                  
                  {isVendor && (
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-primary-100 text-primary-800 text-xs">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">
                          Customer
                        </div>
                      </div>
                    </TableCell>
                  )}
                  
                  <TableCell>{booking.facility?.name || `Facility #${booking.facilityId}`}</TableCell>
                  <TableCell>Slot #{booking.slotId}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDateTime(booking.startTime.toString())} - {format(new Date(booking.endTime), 'h:mm a')}
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {booking.status === "confirmed" && (
                          <DropdownMenuItem onClick={() => handleCancelBooking(booking.id)}>
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                        {booking.status === "completed" && (
                          <DropdownMenuItem>Leave Review</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 text-neutral-500">
            {isVendor 
              ? "No bookings found for your facilities."
              : "You don't have any bookings yet. Find and book a parking spot!"
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
}
