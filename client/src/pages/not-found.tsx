import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-xl">
          <CardContent className="pt-8 pb-8 px-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-red-500/20 p-4 rounded-full mb-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">404 Not Found</h1>
              <p className="text-gray-400">
                The page you are looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="border-t border-gray-700 my-6"></div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              
              <Link href="/">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  <Home className="mr-2 h-4 w-4" />
                  Home Page
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-gray-500 text-center">
              If you believe this is an error, please contact support.
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
