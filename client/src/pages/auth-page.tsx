import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Form schemas
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().optional(),
  userType: z.enum(["customer", "vendor"]),
});

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);
  const tabParam = searchParams.get("tab");
  const typeParam = searchParams.get("type");
  
  const [activeTab, setActiveTab] = useState(tabParam === "register" ? "register" : "login");
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      userType: typeParam === "vendor" ? "vendor" : "customer",
    },
  });

  // Handle login form submission
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  // Handle register form submission
  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    registerMutation.mutate(values);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-50">
      {/* Left column: Auth form */}
      <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <Link href="/" className="inline-flex items-center mb-8">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                <path d="M10 8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z"></path>
                <path d="M10 6a1 1 0 100 2 1 1 0 000-2z"></path>
              </svg>
              <span className="text-primary font-poppins font-bold text-2xl ml-2">ParkEase</span>
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-primary-900">
              {activeTab === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-neutral-600 mt-2">
              {activeTab === "login" 
                ? "Sign in to access your account" 
                : "Join ParkEase to start booking premium parking spots"}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm text-neutral-600">
                Don't have an account?{" "}
                <button 
                  className="text-primary font-medium hover:underline" 
                  onClick={() => setActiveTab("register")}
                >
                  Register now
                </button>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={registerForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Account Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="customer" id="customer" />
                              <label htmlFor="customer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Customer
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="vendor" id="vendor" />
                              <label htmlFor="vendor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Business/Vendor
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm text-neutral-600">
                Already have an account?{" "}
                <button 
                  className="text-primary font-medium hover:underline" 
                  onClick={() => setActiveTab("login")}
                >
                  Sign in
                </button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-500">
            By continuing, you agree to ParkEase's <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>.
          </div>
        </div>
      </div>

      {/* Right column: Hero section */}
      <div className="hidden md:block md:w-1/2 bg-primary-900 text-white p-12 relative">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1621928372414-30e144d111a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div></div> {/* Spacer */}
          <div>
            <h3 className="text-3xl font-bold font-poppins mb-6">Premium Parking Made Simple</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Instantly book parking spots at premium locations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Access real-time availability and secure payments</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>QR code entry for seamless check-in and check-out</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Manage all your bookings in one convenient dashboard</span>
              </li>
            </ul>
          </div>
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2">4.9 out of 5 stars from 2,000+ reviews</span>
            </div>
            <p className="text-primary-200 text-sm">Join thousands of users who have simplified their parking experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
