import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, Briefcase, TrendingUp, Shield, Clock, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Optimize Your Parking <span className="text-primary">Business</span> With ParkEase
                </h1>
                <p className="text-xl text-gray-300">
                  Join our network of parking facilities and increase your revenue by connecting with drivers looking for convenient parking options.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/auth?tab=register&type=vendor">
                    <Button size="lg" className="neo-brutalism">
                      Register as a Vendor
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Schedule a Demo
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-8 mt-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">Quick Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">No Upfront Costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">24/7 Support</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl shadow-primary/20 border border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1609600644791-c96d62b5fbe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Parking Garage" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-900/40">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Partner With <span className="text-primary">ParkEase</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join hundreds of parking facility owners who have increased their occupancy rates and simplified their operations.
            </p>
          </div>
          
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Increased Revenue</h3>
                <p className="text-gray-400">
                  Boost your occupancy rates and maximize revenue with our dynamic pricing system and advanced booking platform.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Facility Management</h3>
                <p className="text-gray-400">
                  Our vendor dashboard gives you complete control over your parking spaces, rates, availability, and bookings.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Expanded Customer Base</h3>
                <p className="text-gray-400">
                  Reach thousands of potential customers searching for convenient parking options in your area.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Secure Payments</h3>
                <p className="text-gray-400">
                  Receive payments directly to your account with our secure payment processing system and transparent fee structure.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Time-Saving Automation</h3>
                <p className="text-gray-400">
                  Automate check-ins, check-outs, and payments with our QR code system and license plate recognition technology.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Business Insights</h3>
                <p className="text-gray-400">
                  Gain valuable insights into your business with our analytics dashboard, helping you make data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works For Vendors
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Getting started with ParkEase is simple and straightforward
            </p>
          </div>
          
          <div className="container mx-auto max-w-4xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0 z-10">
                    1
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3">Register & Create Your Account</h3>
                    <p className="text-gray-400">
                      Sign up as a vendor on our platform and create your business profile with all necessary details about your parking facility.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0 z-10">
                    2
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3">Set Up Your Facility</h3>
                    <p className="text-gray-400">
                      Add your parking spaces, set rates, and configure availability. Upload photos and add amenities to attract more customers.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0 z-10">
                    3
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3">Go Live & Accept Bookings</h3>
                    <p className="text-gray-400">
                      Once your profile is verified, your facility goes live on our platform, and you'll start receiving booking requests from users.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0 z-10">
                    4
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3">Manage & Grow</h3>
                    <p className="text-gray-400">
                      Use our vendor dashboard to manage bookings, adjust pricing, and view analytics to optimize your business and maximize revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-900/40">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-primary/20 to-purple-900/20 backdrop-blur-md p-10 md:p-16 rounded-2xl border border-primary/30 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Optimize Your Parking Business?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Join our network of over 500 parking facilities and start increasing your revenue today.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/auth?tab=register&type=vendor">
                  <Button size="lg" className="neo-brutalism">
                    Register as a Vendor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}