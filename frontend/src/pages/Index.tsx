import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, CheckSquare, Github } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Team Management",
      description: "Efficiently manage your team members and their roles"
    },
    {
      icon: Calendar,
      title: "Task Scheduling",
      description: "Schedule and track tasks with deadline management"
    },
    {
      icon: CheckSquare,
      title: "Progress Tracking",
      description: "Monitor task completion and team productivity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-playfair font-bold text-2xl text-primary">TP</span>
              </div>
            </div>
            
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              TaskPilot
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate employee task management system designed for modern teams. 
              Streamline workflows, boost productivity, and achieve excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Login to Your Account
              </Button>
              <Button 
                onClick={() => navigate('/admin-signup')}
                variant="outline"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Register Your Comapny
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-3xl text-primary mb-4">
              Why Choose TaskPilot?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for teams of all sizes, from startups to enterprises
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-100">
            © 2025 TaskPilot. All rights reserved. | Professional Task Management Solutions | Made by <a href='https://github.com/devdixit-dev' target='_blank' className='border-b-2 border-red-500'>Dev Dixit</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
