import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export function DashboardHeader() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/dashboard', {
          withCredentials: true
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboard();
  }, []); // Empty array = run only once on component mount

  return (
    <header className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-xl font-semibold text-primary">
              Welcome back, {dashboardData?.user.name}
            </h1>
            <p className="text-sm text-muted-foreground capitalize">
              {dashboardData?.user?.role} Dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-primary">{dashboardData?.user?.name}</p>
            <p className="text-xs text-muted-foreground">{dashboardData?.user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {dashboardData?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
