import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/dashboard/sidebar";
import StatsOverview from "@/components/dashboard/stats-overview";
import RecentBookings from "@/components/dashboard/recent-bookings";
import { useQuery } from "@tanstack/react-query";
import { ParkingFacility } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParkingCircle, MapPin, Clock, DollarSign, Plus, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function VendorDashboardPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Redirect if not logged in or not a vendor
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    } else if (user.userType !== "vendor") {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);
  
  // Get vendor facilities
  const { data: facilities } = useQuery<ParkingFacility[]>({
    queryKey: ["/api/vendor/facilities"],
    enabled: !!user && user.userType === "vendor",
  });
  
  // Sample chart data
  const occupancyData = [
    { name: "Mon", occupancy: 65 },
    { name: "Tue", occupancy: 59 },
    { name: "Wed", occupancy: 80 },
    { name: "Thu", occupancy: 81 },
    { name: "Fri", occupancy: 86 },
    { name: "Sat", occupancy: 95 },
    { name: "Sun", occupancy: 78 },
  ];
  
  const slotTypeData = [
    { name: "Standard", value: 65 },
    { name: "EV", value: 15 },
    { name: "Disabled", value: 10 },
    { name: "Reserved", value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (!user || user.userType !== "vendor") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-neutral-50">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Sidebar - Only shown on desktop */}
            <div className="hidden md:block md:col-span-1">
              <div className="h-full rounded-xl overflow-hidden">
                <Sidebar activeItem="Dashboard" isVendor={true} />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-primary-900">Vendor Dashboard</h1>
                  
                  {facilities && facilities.length > 0 && (
                    <div className="flex items-center">
                      <span className="mr-2 text-neutral-600">Viewing:</span>
                      <select className="bg-neutral-100 border-0 rounded-md text-sm py-1.5 px-3">
                        {facilities.map(facility => (
                          <option key={facility.id} value={facility.id.toString()}>
                            {facility.name}
                          </option>
                        ))}
                        <option value="all">All Facilities</option>
                      </select>
                    </div>
                  )}
                </div>
                
                <StatsOverview isVendor={true} />
                
                {/* Analytics Section */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
                  
                  <Tabs defaultValue="occupancy">
                    <TabsList className="mb-4">
                      <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
                      <TabsTrigger value="revenue">Revenue</TabsTrigger>
                      <TabsTrigger value="breakdown">Slot Breakdown</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="occupancy" className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={occupancyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis unit="%" />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Occupancy']}
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
                          />
                          <Bar dataKey="occupancy" fill="#172554" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    
                    <TabsContent value="revenue" className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={occupancyData.map(item => ({ ...item, revenue: item.occupancy * 12 }))}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis unit="$" />
                          <Tooltip 
                            formatter={(value) => [`$${value}`, 'Revenue']}
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
                          />
                          <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    
                    <TabsContent value="breakdown" className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={slotTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {slotTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip formatter={(value) => [`${value} slots`, 'Count']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <RecentBookings isVendor={true} />
              </div>
              
              {/* Facilities Management */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-primary-900">Facilities Management</h2>
                  <Button className="bg-primary">
                    <Plus className="h-4 w-4 mr-2" /> Add New Facility
                  </Button>
                </div>
                
                {facilities && facilities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilities.map((facility) => (
                      <Card key={facility.id} className="overflow-hidden">
                        <div className="h-32 bg-primary-100 relative">
                          <div 
                            className="w-full h-full bg-cover bg-center" 
                            style={{ backgroundImage: `url(${facility.imageUrls?.[0] || 'https://images.unsplash.com/photo-1621928372414-30e144d111a0'})` }}
                          ></div>
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary">{facility.totalSpaces} Spaces</Badge>
                          </div>
                          <div className="absolute bottom-2 right-2 flex space-x-2">
                            <Button size="icon" variant="secondary" className="h-8 w-8 bg-white hover:bg-neutral-100">
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="icon" variant="destructive" className="h-8 w-8">
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                          <div className="space-y-2 text-sm text-neutral-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
                              <span>{facility.address}, {facility.city}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-neutral-400" />
                              <span>{facility.has24HourAccess ? '24/7 Access' : 'Limited Hours'}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-neutral-400" />
                              <span>${facility.hourlyRate.toFixed(2)}/hr · ${facility.dailyRate?.toFixed(2) || '-'}/day</span>
                            </div>
                            <div className="flex items-center">
                              <ParkingCircle className="h-4 w-4 mr-2 text-neutral-400" />
                              <span>{(facility.totalSpaces - 45)} available of {facility.totalSpaces} spaces</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    <ParkingCircle className="h-12 w-12 mx-auto text-neutral-300 mb-2" />
                    <p>You haven't added any parking facilities yet.</p>
                    <p className="text-sm mb-4">Add your first facility to start receiving bookings.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Add Your First Facility
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
