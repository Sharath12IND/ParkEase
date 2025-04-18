import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/dashboard/sidebar";
import StatsOverview from "@/components/dashboard/stats-overview";
import RecentBookings from "@/components/dashboard/recent-bookings";
import { useQuery } from "@tanstack/react-query";
import { Vehicle } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Plus, Car, Edit, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Vehicle form schema
const vehicleSchema = z.object({
  licensePlate: z.string().min(2, "License plate is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  isDefault: z.boolean().default(false),
});

export default function UserDashboardPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);
  
  // Get user vehicles
  const { data: vehicles, isLoading: isLoadingVehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
    enabled: !!user,
  });

  // Vehicle form
  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      licensePlate: "",
      make: "",
      model: "",
      vehicleType: "sedan",
      isDefault: false,
    },
  });
  
  // Create vehicle mutation
  const createVehicleMutation = useMutation({
    mutationFn: async (data: z.infer<typeof vehicleSchema>) => {
      const res = await apiRequest("POST", "/api/vehicles", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Vehicle Added",
        description: "Your vehicle has been successfully added.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle form submission
  function onSubmit(values: z.infer<typeof vehicleSchema>) {
    createVehicleMutation.mutate(values);
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-neutral-50">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar - Only shown on desktop */}
            <div className="hidden md:block md:col-span-1">
              <div className="h-full rounded-xl overflow-hidden">
                <Sidebar activeItem="Dashboard" />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h1 className="text-2xl font-bold text-primary-900 mb-6">Dashboard</h1>
                
                <StatsOverview />
                
                <RecentBookings />
              </div>
              
              {/* Vehicle Management */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-primary-900 mb-6">My Vehicles</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Add new vehicle form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Plus className="h-4 w-4 mr-2" /> Add New Vehicle
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="make"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Make</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. Toyota" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="model"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Model</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. Camry" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="licensePlate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Plate</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. ABC-123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Type</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select vehicle type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="sedan">Sedan</SelectItem>
                                    <SelectItem value="suv">SUV</SelectItem>
                                    <SelectItem value="truck">Truck</SelectItem>
                                    <SelectItem value="van">Van</SelectItem>
                                    <SelectItem value="ev">Electric Vehicle</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="compact">Compact</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                  <FormLabel>Set as Default Vehicle</FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={createVehicleMutation.isPending}
                          >
                            {createVehicleMutation.isPending ? "Adding..." : "Add Vehicle"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  {/* Vehicle list */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Car className="h-4 w-4 mr-2" /> My Vehicles ({vehicles?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingVehicles ? (
                        <div className="text-center py-4">Loading vehicles...</div>
                      ) : vehicles && vehicles.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Vehicle</TableHead>
                              <TableHead>License</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {vehicles.map((vehicle) => (
                              <TableRow key={vehicle.id}>
                                <TableCell className="font-medium">
                                  {vehicle.make} {vehicle.model}
                                  {vehicle.isDefault && (
                                    <span className="ml-2 text-xs bg-primary-100 text-primary px-2 py-0.5 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>{vehicle.licensePlate}</TableCell>
                                <TableCell className="capitalize">{vehicle.vehicleType}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="icon" title="Edit vehicle">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Delete vehicle">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-6 text-neutral-500">
                          <Car className="h-12 w-12 mx-auto text-neutral-300 mb-2" />
                          <p>You haven't added any vehicles yet.</p>
                          <p className="text-sm">Add your first vehicle to make booking easier.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
