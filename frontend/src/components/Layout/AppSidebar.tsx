
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Users, Calendar, User, LogOut, Settings } from "lucide-react";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getMenuItems = () => {
    const baseItems = [
      {
        title: "Profile",
        url: "/profile",
        icon: Settings,
      },
    ];

    if (user?.role === 'admin') {
      return [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: Calendar,
        },
        {
          title: "User Management",
          url: "/admin/users",
          icon: Users,
        },
        {
          title: "Task Management",
          url: "/admin/tasks",
          icon: Calendar,
        },
        ...baseItems,
      ];
    } else if (user?.role === 'manager') {
      return [
        {
          title: "Dashboard",
          url: "/manager/dashboard",
          icon: Calendar,
        },
        {
          title: "Task Management",
          url: "/manager/tasks",
          icon: Calendar,
        },
        ...baseItems,
      ];
    } else {
      return [
        {
          title: "Dashboard",
          url: "/employee/dashboard",
          icon: Calendar,
        },
        ...baseItems,
      ];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TP</span>
          </div>
          <span className="font-playfair font-bold text-lg text-primary">TaskPilot</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {user?.role?.toUpperCase()} PANEL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-primary/10 hover:text-primary">
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{user?.name}</span>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
