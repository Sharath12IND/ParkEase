import { Loader2 } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/90">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-12 text-center">Help Center</h1>
            
            {/* FAQ Section */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-800 mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="text-gray-300">
                <AccordionItem value="item-1" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">How do I book a parking spot?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>Booking a parking spot is easy:</p>
                    <ol className="list-decimal pl-5 space-y-2 mt-2">
                      <li>Search for a location or select from popular locations</li>
                      <li>Select your desired date and time</li>
                      <li>Choose an available parking spot</li>
                      <li>Complete the booking by providing vehicle and payment details</li>
                      <li>You'll receive a confirmation with a QR code that you can use to access the parking facility</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">What is the cancellation policy?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>You can cancel your booking up to 2 hours before the scheduled start time for a full refund. Cancellations made less than 2 hours before the start time may be subject to a 50% cancellation fee. No refunds are provided for no-shows or cancellations after the booking has started.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">How do I enter the parking facility?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>When you arrive at the parking facility, open your booking confirmation in the ParkEase app to display your QR code. Scan this code at the entrance terminal or show it to the parking attendant. Some locations may also use license plate recognition for seamless entry.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">What if I stay longer than my booking?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>If you need to extend your stay, you can use the app to extend your booking if the spot is still available for the additional time. If you exceed your booking time without extending, additional charges will apply based on the facility's hourly rate plus a possible overstay fee.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">Is my payment information secure?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>Yes, all payment information is encrypted and securely processed using PCI-compliant payment gateways. We do not store your full credit card details on our servers. You can also save payment methods securely for faster checkout in the future.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">Can I book a parking spot for someone else?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>Yes, you can book on behalf of someone else. When making the booking, you can add their vehicle details and send them the booking confirmation. Alternatively, you can add multiple drivers to your account who can access your bookings.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7" className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">What if there's an issue with my booking?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>If you encounter any issues with your booking, please contact our customer support immediately through the app or by calling our 24/7 support line at (800) 123-4567. We recommend keeping your booking confirmation and receipts handy for quicker resolution.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-lg hover:text-primary py-4">How do I become a parking partner?</AccordionTrigger>
                  <AccordionContent className="text-gray-400 pt-2 pb-4">
                    <p>If you own or manage a parking facility and would like to partner with ParkEase, please visit our "For Business" page or contact our partnership team at partners@parkease.com. We offer various integration options and a user-friendly vendor dashboard to manage your listings.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Contact Section */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Support</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Customer Support</h3>
                  <p className="text-gray-400">Our support team is available 24/7 to assist you with any questions or issues.</p>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium">Email Support</p>
                        <p className="text-gray-400">help@parkease.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium">Phone Support</p>
                        <p className="text-gray-400">(800) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium">Live Chat</p>
                        <p className="text-gray-400">Available in the app and website</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Submit a Request</h3>
                  <p className="text-gray-400">Fill out the form below and we'll get back to you as soon as possible.</p>
                  
                  <form className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your name" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email</label>
                      <input type="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your email" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Subject</label>
                      <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Select a topic</option>
                        <option>Booking Issue</option>
                        <option>Payment Problem</option>
                        <option>Technical Support</option>
                        <option>Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Message</label>
                      <textarea rows={4} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Describe your issue or question"></textarea>
                    </div>
                    
                    <button type="button" className="w-full py-3 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary/80 transition-colors flex items-center justify-center">
                      <Loader2 className="h-4 w-4 mr-2 hidden" />
                      Submit Request
                    </button>
                  </form>
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