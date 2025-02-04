import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { User, Lock } from 'lucide-react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back, admin!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "You can only view and update task progress.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#403E43]">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:scale-[1.01]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-[#9b87f5] rounded-full flex items-center justify-center mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#9b87f5] focus:ring-2 focus:ring-[#9b87f5] focus:ring-opacity-20 transition-colors bg-gray-50"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#9b87f5] focus:ring-2 focus:ring-[#9b87f5] focus:ring-opacity-20 transition-colors bg-gray-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#9b87f5] text-white py-3 rounded-lg hover:bg-[#7E69AB] transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#9b87f5] focus:ring-opacity-50"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Admin: username "admin", password "admin"</p>
            <p>User: username "sandeep", password "sandeep"</p>
          </div>
        </div>
      </div>
    </div>
  );
};