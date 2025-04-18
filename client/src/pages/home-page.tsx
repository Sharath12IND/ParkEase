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
        
        {/* Business Section - Redesigned */}
        <section className="py-20 bg-gradient-to-b from-neutral-50 to-neutral-100" id="business">
          <div className="container mx-auto px-4">
            {/* Section header with decorative element */}
            <div className="relative text-center mb-16">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-1 bg-primary rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 pt-6">Manage Your Business Parking</h2>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                Optimize your parking facilities, increase revenue, and improve customer experience with ParkEase for Business.
              </p>
            </div>
            
            {/* Dashboard Preview - Enhanced design */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Sidebar - Enhanced with better icons and spacing */}
                <div className="md:col-span-1 bg-primary-900 text-white p-6">
                  <div className="flex items-center mb-10 pl-2">
                    <div className="bg-white/10 p-2 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-lg block">ParkEase</span>
                      <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">Business</span>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    <a href="#" className="flex items-center space-x-3 bg-white/10 text-white rounded-xl p-3 mb-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-xl p-3 mb-1 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Facilities</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-xl p-3 mb-1 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      <span>Bookings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-xl p-3 mb-1 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span>Analytics</span>
                    </a>
                  </nav>
                </div>
                
                {/* Dashboard Content - Improved styling and contrast */}
                <div className="md:col-span-4 p-8">
                  <div className="mb-8 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-800">Facility Overview</h3>
                    <div className="flex items-center space-x-3">
                      <select className="bg-gray-100 border border-gray-200 rounded-lg text-gray-700 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>City Center Mall</option>
                        <option>Westfield Shopping Center</option>
                      </select>
                      <select className="bg-gray-100 border border-gray-200 rounded-lg text-gray-700 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Stats Overview - Enhanced with better color contrast and shadows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                      <div className="text-gray-600 font-medium mb-2">Total Bookings</div>
                      <div className="font-bold text-3xl text-gray-800 mb-3">1,248</div>
                      <div className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>12% from last week</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                      <div className="text-gray-600 font-medium mb-2">Revenue</div>
                      <div className="font-bold text-3xl text-gray-800 mb-3">$9,354</div>
                      <div className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>8% from last week</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                      <div className="text-gray-600 font-medium mb-2">Occupancy Rate</div>
                      <div className="font-bold text-3xl text-gray-800 mb-3">78%</div>
                      <div className="flex items-center text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span>3% from last week</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                      <div className="text-gray-600 font-medium mb-2">Avg. Duration</div>
                      <div className="font-bold text-3xl text-gray-800 mb-3">2.4 hrs</div>
                      <div className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>5% from last week</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Bookings Table - Enhanced design and interaction */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-bold text-gray-800">Recent Bookings</h4>
                      <button 
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center group"
                        onClick={() => alert("This would load more booking data in a real application")}
                      >
                        View All 
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Booking ID
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Slot
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Time
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              #1234567
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                                  <span className="font-semibold text-primary-800 text-sm">JD</span>
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                  John Doe
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              A10, Level 2
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              Today, 14:30 - 17:30
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <button className="text-primary hover:text-primary-600">View</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              #1234566
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                                  <span className="font-semibold text-primary-800 text-sm">SM</span>
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                  Sarah Miller
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              B4, Level 2
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              Today, 13:00 - 16:00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <button className="text-primary hover:text-primary-600">View</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              #1234565
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                                  <span className="font-semibold text-primary-800 text-sm">RJ</span>
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                  Robert Johnson
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              C7, Level 1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              Today, 10:00 - 13:00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                Completed
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <button className="text-primary hover:text-primary-600">View</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link href="/business">
                <Button className="bg-primary text-white hover:bg-primary-600 transition-all px-8 py-6 text-lg font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center">
                  Learn More About ParkEase for Business
                  <ArrowRight className="ml-2 h-5 w-5" />
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
