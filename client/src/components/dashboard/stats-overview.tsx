import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatProps {
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
}

const Stat = ({ title, value, change }: StatProps) => (
  <Card className="bg-neutral-50">
    <CardContent className="p-4">
      <div className="text-neutral-500 text-sm mb-1">{title}</div>
      <div className="font-semibold text-2xl mb-2">{value}</div>
      <div className={`flex items-center text-xs ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
        {change.positive ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
        <span>{change.value} from last week</span>
      </div>
    </CardContent>
  </Card>
);

interface StatsOverviewProps {
  isVendor?: boolean;
}

export default function StatsOverview({ isVendor = false }: StatsOverviewProps) {
  // For vendor dashboard
  const vendorStats = [
    {
      title: "Total Bookings",
      value: "1,248",
      change: { value: "12%", positive: true }
    },
    {
      title: "Revenue",
      value: "$9,354",
      change: { value: "8%", positive: true }
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      change: { value: "3%", positive: false }
    },
    {
      title: "Avg. Duration",
      value: "2.4 hrs",
      change: { value: "5%", positive: true }
    }
  ];
  
  // For customer dashboard
  const customerStats = [
    {
      title: "Active Bookings",
      value: "2",
      change: { value: "1 more", positive: true }
    },
    {
      title: "Total Spent",
      value: "$87.50",
      change: { value: "15%", positive: true }
    },
    {
      title: "Favorite Location",
      value: "City Center",
      change: { value: "3 visits", positive: true }
    },
    {
      title: "Avg. Booking",
      value: "2.8 hrs",
      change: { value: "0.3 hrs", positive: true }
    }
  ];
  
  const stats = isVendor ? vendorStats : customerStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Stat key={index} {...stat} />
      ))}
    </div>
  );
}
