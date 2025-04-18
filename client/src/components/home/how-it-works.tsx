import { Car, Search, CreditCard, QrCode } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How ParkEase Works</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Book a parking spot in three simple steps and enjoy a hassle-free parking experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -mt-12 ml-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
            <h3 className="text-xl font-bold text-white mb-4">Find Parking</h3>
            <p className="text-gray-400">
              Search for parking spots by location, date, and time. Filter by amenities like EV charging or covered parking.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -mt-12 ml-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
            <h3 className="text-xl font-bold text-white mb-4">Select Your Spot</h3>
            <p className="text-gray-400">
              Choose from available parking spots at your desired location and select the one that best suits your needs.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -mt-12 ml-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">3</div>
            <h3 className="text-xl font-bold text-white mb-4">Book & Pay</h3>
            <p className="text-gray-400">
              Complete your booking by providing your vehicle details and making a secure payment through our platform.
            </p>
          </div>
          
          {/* Step 4 */}
          <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -mt-12 ml-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">4</div>
            <h3 className="text-xl font-bold text-white mb-4">Park with Ease</h3>
            <p className="text-gray-400">
              Use the QR code in your confirmation to enter the parking facility. Enjoy a smooth, contactless parking experience.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-900/20 backdrop-blur-md rounded-lg border border-primary/30">
            <p className="text-white">
              <span className="font-bold text-primary">Pro Tip:</span> Save your favorite parking locations and vehicle details for quicker bookings in the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}