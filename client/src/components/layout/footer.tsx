import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                <path d="M10 8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z"></path>
                <path d="M10 6a1 1 0 100 2 1 1 0 000-2z"></path>
              </svg>
              <span className="font-poppins font-bold text-2xl ml-2">ParkEase</span>
            </div>
            <p className="text-primary-200 mb-6">Premium parking solutions for modern drivers and businesses.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/#how-it-works" className="text-primary-200 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-primary-200 hover:text-white transition-colors">Trust & Safety</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Download Our App</h4>
            <p className="text-primary-200 mb-4">Get the ParkEase app for seamless parking management on the go.</p>
            <div className="flex flex-col space-y-2">
              <a href="#" className="flex items-center bg-white text-primary-900 rounded-lg px-4 py-2 hover:bg-neutral-100 transition-all">
                <i className="fab fa-apple text-2xl mr-3"></i>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center bg-white text-primary-900 rounded-lg px-4 py-2 hover:bg-neutral-100 transition-all">
                <i className="fab fa-google-play text-2xl mr-3"></i>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="separator my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ParkEase. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
