import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/dashboard/sidebar";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form, 
  FormControl,
  FormDescription,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Smartphone, 
  Mail, 
  Key,
  Save,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// User profile schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  notifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    marketing: z.boolean().default(false),
  }),
});

// Password update schema
const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AccountSettingsPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: "",
      address: "",
      bio: "",
      notifications: {
        email: true,
        sms: false,
        marketing: false,
      },
    },
  });

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: z.infer<typeof profileSchema>) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: async (data: z.infer<typeof passwordSchema>) => {
      const res = await apiRequest("PATCH", "/api/user/password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
      });
      passwordForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle profile form submission
  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    updateProfileMutation.mutate(values);
  }
  
  // Handle password form submission
  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    updatePasswordMutation.mutate(values);
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
                <Sidebar activeItem="Settings" />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-4 space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Account Settings</h1>
                    <p className="text-gray-300">Manage your account information and preferences</p>
                  </div>
                </div>
              </div>
              
              {/* Settings Tabs */}
              <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
                <Tabs defaultValue="profile" className="w-full">
                  <div className="border-b border-gray-700">
                    <div className="px-4">
                      <TabsList className="bg-transparent border-b border-gray-700 w-full justify-start rounded-none">
                        <TabsTrigger 
                          value="profile" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 py-3 text-gray-400 hover:text-white"
                        >
                          Profile
                        </TabsTrigger>
                        <TabsTrigger 
                          value="security" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 py-3 text-gray-400 hover:text-white"
                        >
                          Security
                        </TabsTrigger>
                        <TabsTrigger 
                          value="notifications" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 py-3 text-gray-400 hover:text-white"
                        >
                          Notifications
                        </TabsTrigger>
                        <TabsTrigger 
                          value="payment" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 py-3 text-gray-400 hover:text-white"
                        >
                          Payment
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </div>
                  
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="p-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center mb-6">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-xl font-bold text-white">Profile Information</h2>
                      </div>
                      
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Full Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your full name" 
                                      {...field}
                                      className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Email Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your email" 
                                      {...field}
                                      className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your phone number" 
                                      {...field}
                                      className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-gray-400 text-xs">
                                    Used for booking confirmations and updates
                                  </FormDescription>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your address" 
                                      {...field}
                                      className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-gray-400 text-xs">
                                    Your billing address for invoices
                                  </FormDescription>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={profileForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Bio</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us a little about yourself" 
                                    {...field}
                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary min-h-[120px]"
                                  />
                                </FormControl>
                                <FormDescription className="text-gray-400 text-xs">
                                  Optional: Add a short bio to personalize your profile
                                </FormDescription>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button 
                              type="submit" 
                              className="bg-primary hover:bg-primary/90 text-white"
                              disabled={updateProfileMutation.isPending}
                            >
                              {updateProfileMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" />
                                  Save Changes
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </TabsContent>
                  
                  {/* Security Tab */}
                  <TabsContent value="security" className="p-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center mb-6">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-xl font-bold text-white">Security Settings</h2>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                        
                        <Form {...passwordForm}>
                          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                            <FormField
                              control={passwordForm.control}
                              name="currentPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Current Password</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="password"
                                      placeholder="Enter your current password" 
                                      {...field}
                                      className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">New Password</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="password"
                                        placeholder="Enter new password" 
                                        {...field}
                                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                      />
                                    </FormControl>
                                    <FormDescription className="text-gray-400 text-xs">
                                      At least 8 characters with a mix of letters, numbers and symbols
                                    </FormDescription>
                                    <FormMessage className="text-red-400" />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Confirm New Password</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="password"
                                        placeholder="Confirm your new password" 
                                        {...field}
                                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-primary"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="flex justify-end">
                              <Button 
                                type="submit" 
                                className="bg-primary hover:bg-primary/90 text-white"
                                disabled={updatePasswordMutation.isPending}
                              >
                                {updatePasswordMutation.isPending ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <Key className="mr-2 h-4 w-4" />
                                    Update Password
                                  </>
                                )}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                      
                      <Separator className="my-8 bg-gray-700" />
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                        <p className="text-gray-400 mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                        
                        <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border border-gray-600">
                          <div className="flex items-center">
                            <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                              <p className="text-gray-400 text-sm">Protect your account with an additional verification step</p>
                            </div>
                          </div>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="p-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center mb-6">
                        <Bell className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <Form {...profileForm}>
                          <div className="space-y-4">
                            <FormField
                              control={profileForm.control}
                              name="notifications.email"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-4">
                                  <div className="space-y-0.5">
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 text-primary mr-2" />
                                      <FormLabel className="text-white font-medium">Email Notifications</FormLabel>
                                    </div>
                                    <FormDescription className="text-gray-400 text-sm">
                                      Receive booking confirmations and important updates via email
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
                            
                            <FormField
                              control={profileForm.control}
                              name="notifications.sms"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-4">
                                  <div className="space-y-0.5">
                                    <div className="flex items-center">
                                      <Smartphone className="h-4 w-4 text-primary mr-2" />
                                      <FormLabel className="text-white font-medium">SMS Notifications</FormLabel>
                                    </div>
                                    <FormDescription className="text-gray-400 text-sm">
                                      Receive text message reminders about your upcoming bookings
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
                            
                            <FormField
                              control={profileForm.control}
                              name="notifications.marketing"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-4">
                                  <div className="space-y-0.5">
                                    <div className="flex items-center">
                                      <Bell className="h-4 w-4 text-primary mr-2" />
                                      <FormLabel className="text-white font-medium">Marketing Communications</FormLabel>
                                    </div>
                                    <FormDescription className="text-gray-400 text-sm">
                                      Receive promotions, discounts, and news about new features
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
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <Button 
                              onClick={() => profileForm.handleSubmit(onProfileSubmit)()}
                              className="bg-primary hover:bg-primary/90 text-white"
                              disabled={updateProfileMutation.isPending}
                            >
                              {updateProfileMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" />
                                  Save Preferences
                                </>
                              )}
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Payment Tab */}
                  <TabsContent value="payment" className="p-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center mb-6">
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-xl font-bold text-white">Payment Methods</h2>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg border border-gray-600 p-5">
                        <div className="flex items-center mb-6">
                          <div className="bg-primary/20 p-2 rounded-full mr-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Add Payment Method</h3>
                            <p className="text-gray-400 text-sm">Add a new credit card or other payment method</p>
                          </div>
                        </div>
                        
                        <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                          <CreditCard className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                          <p className="text-gray-400">No payment methods found</p>
                          <Button className="mt-4 bg-primary hover:bg-primary/90 text-white">
                            Add Payment Method
                          </Button>
                        </div>
                        
                        <p className="mt-4 text-xs text-gray-500">
                          Your payment information is securely stored and processed. We do not store your full card details on our servers.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}