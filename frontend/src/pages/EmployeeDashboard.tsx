
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckSquare, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Tasks Assigned",
      value: "12",
      description: "Total active tasks",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Completed Today",
      value: "5",
      description: "Tasks finished today",
      icon: CheckSquare,
      color: "text-success",
      bgColor: "bg-green-50"
    },
    {
      title: "Pending",
      value: "7",
      description: "Tasks remaining",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-yellow-50"
    }
  ];

  const myTasks = [
    {
      id: 1,
      title: "Complete user authentication module",
      description: "Implement login/logout functionality with JWT",
      assignedBy: "Sarah Manager",
      priority: "high",
      dueDate: "Today",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Update documentation",
      description: "Update API documentation for new endpoints",
      assignedBy: "Sarah Manager",
      priority: "medium",
      dueDate: "Tomorrow",
      status: "pending"
    },
    {
      id: 3,
      title: "Fix responsive design issues",
      description: "Fix mobile layout issues on dashboard page",
      assignedBy: "John Admin",
      priority: "low",
      dueDate: "Dec 28",
      status: "pending"
    },
    {
      id: 4,
      title: "Code review for team project",
      description: "Review pull requests from team members",
      assignedBy: "Sarah Manager",
      priority: "medium",
      dueDate: "Today",
      status: "pending"
    }
  ];

  const completedTasks = [
    {
      title: "Database migration script",
      completedAt: "2 hours ago",
      assignedBy: "Sarah Manager"
    },
    {
      title: "Unit tests for payment module",
      completedAt: "4 hours ago",
      assignedBy: "John Admin"
    },
    {
      title: "Bug fix: Login form validation",
      completedAt: "Yesterday",
      assignedBy: "Sarah Manager"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Here are your tasks for today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-primary">My Tasks</CardTitle>
              <CardDescription>Your assigned tasks and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-primary">{task.title}</h3>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>Assigned by {task.assignedBy}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                        {task.status !== 'completed' && (
                          <Button size="sm" variant="outline" className="h-7">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Recently Completed</CardTitle>
              <CardDescription>Your latest achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTasks.map((task, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-sm text-green-800">{task.title}</h4>
                    <p className="text-xs text-green-600 mt-1">
                      Completed {task.completedAt}
                    </p>
                    <p className="text-xs text-green-600">
                      Assigned by {task.assignedBy}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
