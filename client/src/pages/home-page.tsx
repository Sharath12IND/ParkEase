import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import PopularLocations from "@/components/home/popular-locations";
import HowItWorks from "@/components/home/how-it-works";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <PopularLocations />
        <HowItWorks />
        
        {/* Business Section */}
        <section className="py-16 bg-neutral-100" id="business">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary-900 mb-4">Manage Your Business Parking</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Optimize your parking facilities, increase revenue, and improve customer experience with ParkEase for Business.
              </p>
            </div>
            
            {/* Dashboard Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Sidebar */}
                <div className="md:col-span-1 bg-primary-900 text-white p-4">
                  <div className="flex items-center mb-8 pl-2">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                      <path d="M10 8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z"></path>
                      <path d="M10 6a1 1 0 100 2 1 1 0 000-2z"></path>
                    </svg>
                    <span className="font-bold text-lg ml-2">ParkEase</span>
                    <span className="text-xs bg-accent text-primary-900 px-2 py-0.5 rounded ml-2">Business</span>
                  </div>
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center space-x-3 bg-primary-800 text-white rounded-lg p-3 mb-1">
                      <i className="fas fa-th-large"></i>
                      <span>Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-primary-100 hover:bg-primary-800 rounded-lg p-3 mb-1 transition-colors">
                      <i className="fas fa-parking"></i>
                      <span>Facilities</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-primary-100 hover:bg-primary-800 rounded-lg p-3 mb-1 transition-colors">
                      <i className="fas fa-ticket-alt"></i>
                      <span>Bookings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-primary-100 hover:bg-primary-800 rounded-lg p-3 mb-1 transition-colors">
                      <i className="fas fa-chart-line"></i>
                      <span>Analytics</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-primary-100 hover:bg-primary-800 rounded-lg p-3 mb-1 transition-colors">
                      <i className="fas fa-cog"></i>
                      <span>Settings</span>
                    </a>
                  </nav>
                </div>
                
                {/* Dashboard Content */}
                <div className="md:col-span-4 p-6">
                  <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-xl font-semibold font-poppins text-primary-900">Facility Overview</h3>
                    <div className="flex items-center space-x-2">
                      <select className="bg-neutral-100 border-0 rounded-md text-sm py-1.5 px-3">
                        <option>City Center Mall</option>
                        <option>Westfield Shopping Center</option>
                      </select>
                      <select className="bg-neutral-100 border-0 rounded-md text-sm py-1.5 px-3">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="text-neutral-500 text-sm mb-1">Total Bookings</div>
                      <div className="font-semibold text-2xl mb-2">1,248</div>
                      <div className="flex items-center text-xs text-green-600">
                        <i className="fas fa-arrow-up mr-1"></i>
                        <span>12% from last week</span>
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="text-neutral-500 text-sm mb-1">Revenue</div>
                      <div className="font-semibold text-2xl mb-2">$9,354</div>
                      <div className="flex items-center text-xs text-green-600">
                        <i className="fas fa-arrow-up mr-1"></i>
                        <span>8% from last week</span>
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="text-neutral-500 text-sm mb-1">Occupancy Rate</div>
                      <div className="font-semibold text-2xl mb-2">78%</div>
                      <div className="flex items-center text-xs text-red-600">
                        <i className="fas fa-arrow-down mr-1"></i>
                        <span>3% from last week</span>
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="text-neutral-500 text-sm mb-1">Avg. Duration</div>
                      <div className="font-semibold text-2xl mb-2">2.4 hrs</div>
                      <div className="flex items-center text-xs text-green-600">
                        <i className="fas fa-arrow-up mr-1"></i>
                        <span>5% from last week</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Bookings Table */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-neutral-800">Recent Bookings</h4>
                      <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium">View All</a>
                    </div>
                    <div className="bg-neutral-50 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Booking ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Slot
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                              #1234567
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                                  <span className="font-medium text-primary-800 text-xs">JD</span>
                                </div>
                                <div className="text-sm font-medium text-neutral-900">
                                  John Doe
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                              A10, Level 2
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                              Today, 14:30 - 17:30
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Active
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                              #1234566
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                                  <span className="font-medium text-primary-800 text-xs">SM</span>
                                </div>
                                <div className="text-sm font-medium text-neutral-900">
                                  Sarah Miller
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                              B4, Level 2
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                              Today, 13:00 - 16:00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Active
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/business">
                <Button className="bg-primary text-white hover:bg-primary/90 transition-all">
                  Learn More About ParkEase for Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
