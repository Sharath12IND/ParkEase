import { Search, Ticket, Car } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-16 bg-primary-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary-900 mb-4">How ParkEase Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Book your perfect parking spot in three simple steps.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-primary-800" />
            </div>
            <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-3">Search & Find</h3>
            <p className="text-neutral-600">Enter your destination, date, and time to discover available parking options near you.</p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <Ticket className="h-8 w-8 text-primary-800" />
            </div>
            <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-3">Book & Pay</h3>
            <p className="text-neutral-600">Select your preferred spot, duration, and complete your booking with secure payment options.</p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <Car className="h-8 w-8 text-primary-800" />
            </div>
            <h3 className="text-xl font-semibold font-poppins text-primary-900 mb-3">Park & Go</h3>
            <p className="text-neutral-600">Use your digital QR code for seamless entry and exit - no tickets or payment machines needed.</p>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-semibold font-poppins text-primary-900 mb-4">Download the ParkEase App</h3>
              <p className="text-neutral-600 mb-6">Manage your bookings, access QR codes, and find parking on the go with our mobile app.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="flex items-center justify-center bg-neutral-900 text-white rounded-lg px-4 py-3 hover:bg-neutral-800 transition-all">
                  <i className="fab fa-apple text-2xl mr-3"></i>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-center bg-neutral-900 text-white rounded-lg px-4 py-3 hover:bg-neutral-800 transition-all">
                  <i className="fab fa-google-play text-2xl mr-3"></i>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1616469832301-e617133e917c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
