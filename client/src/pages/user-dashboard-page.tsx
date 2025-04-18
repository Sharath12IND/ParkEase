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
  FormDescription,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Plus, Car, Edit, Trash, BarChart3, ClipboardList, ArrowRight, Loader2 } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="flex-grow bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Sidebar - Only shown on desktop */}
            <div className="hidden md:block md:col-span-1">
              <div className="sticky top-24 h-auto rounded-xl overflow-hidden border border-gray-800">
                <Sidebar activeItem="Dashboard" />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-4 space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      Welcome Back, {user?.username || 'User'}
                    </h1>
                    <p className="text-gray-300 mb-4">
                      Manage your parking reservations and vehicles from your personal dashboard
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg mt-4 md:mt-0">
                    <Car className="h-4 w-4 mr-2" /> New Booking
                  </Button>
                </div>
              </div>
              
              {/* Stats Overview - Dark themed */}
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-primary" /> 
                  Your Activity
                </h2>
                
                <StatsOverview />
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <ClipboardList className="h-5 w-5 mr-2 text-primary" /> 
                      Recent Bookings
                    </h3>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-gray-700">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <RecentBookings />
                </div>
              </div>
              
              {/* Vehicle Management - Dark themed */}
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Car className="h-6 w-6 mr-2 text-primary" /> 
                  My Vehicles
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Add new vehicle form */}
                  <div className="bg-gray-700 rounded-xl border border-gray-600 shadow-lg overflow-hidden">
                    <div className="bg-gray-700 p-4 border-b border-gray-600">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Plus className="h-4 w-4 mr-2 text-primary" /> Add New Vehicle
                      </h3>
                    </div>
                    <div className="p-5">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="make"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Make</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g. Toyota" 
                                      {...field}
                                      className="bg-gray-800 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="model"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Model</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g. Camry" 
                                      {...field}
                                      className="bg-gray-800 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="licensePlate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">License Plate</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g. ABC-123" 
                                    {...field}
                                    className="bg-gray-800 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Vehicle Type</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-800 border-gray-600 text-gray-100 focus:ring-offset-gray-900">
                                      <SelectValue placeholder="Select vehicle type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-800 border-gray-600 text-gray-100">
                                    <SelectItem value="sedan">🚗 Sedan</SelectItem>
                                    <SelectItem value="suv">🚙 SUV</SelectItem>
                                    <SelectItem value="truck">🚚 Truck</SelectItem>
                                    <SelectItem value="van">🚐 Van</SelectItem>
                                    <SelectItem value="ev">⚡ Electric Vehicle</SelectItem>
                                    <SelectItem value="hybrid">🔋 Hybrid</SelectItem>
                                    <SelectItem value="compact">🚗 Compact</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-600 bg-gray-800 p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-gray-200">Set as Default Vehicle</FormLabel>
                                  <FormDescription className="text-gray-400 text-xs">
                                    This vehicle will be pre-selected when making bookings
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 text-white"
                            disabled={createVehicleMutation.isPending}
                          >
                            {createVehicleMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding...
                              </>
                            ) : (
                              "Add Vehicle"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                  
                  {/* Vehicle list */}
                  <div className="bg-gray-700 rounded-xl border border-gray-600 shadow-lg overflow-hidden">
                    <div className="bg-gray-700 p-4 border-b border-gray-600">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Car className="h-4 w-4 mr-2 text-primary" /> 
                        My Vehicles ({vehicles?.length || 0})
                      </h3>
                    </div>
                    <div className="p-4">
                      {isLoadingVehicles ? (
                        <div className="text-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-2" />
                          <p className="text-gray-300">Loading your vehicles...</p>
                        </div>
                      ) : vehicles && vehicles.length > 0 ? (
                        <div className="rounded-lg overflow-hidden border border-gray-600">
                          <Table className="w-full">
                            <TableHeader className="bg-gray-800">
                              <TableRow className="border-b border-gray-600 hover:bg-gray-700">
                                <TableHead className="text-gray-300">Vehicle</TableHead>
                                <TableHead className="text-gray-300">License</TableHead>
                                <TableHead className="text-gray-300">Type</TableHead>
                                <TableHead className="text-right text-gray-300">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {vehicles.map((vehicle) => (
                                <TableRow key={vehicle.id} className="border-b border-gray-600 hover:bg-gray-600/50">
                                  <TableCell className="font-medium text-white">
                                    {vehicle.make} {vehicle.model}
                                    {vehicle.isDefault && (
                                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                        Default
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-gray-300">{vehicle.licensePlate}</TableCell>
                                  <TableCell className="capitalize text-gray-300">{vehicle.vehicleType}</TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" title="Edit vehicle" className="text-gray-400 hover:text-white hover:bg-gray-700">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Delete vehicle" className="text-gray-400 hover:text-red-400 hover:bg-gray-700">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-10 px-4">
                          <div className="bg-gray-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                            <Car className="h-8 w-8 text-gray-500" />
                          </div>
                          <h4 className="text-lg font-medium text-white mb-2">No vehicles found</h4>
                          <p className="text-gray-400 mb-6">You haven't added any vehicles yet.</p>
                          <p className="text-sm text-gray-500">Add your first vehicle using the form to make booking easier.</p>
                        </div>
                      )}
                    </div>
                  </div>
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
