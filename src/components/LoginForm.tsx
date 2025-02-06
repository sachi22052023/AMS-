import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

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
        description: "Welcome back!",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#2C3E50]">
      <div className="max-w-md w-full mx-auto p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Oracle AMS</h1>
          <p className="text-gray-300">Login to View Schedule Task for AMS</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 hover:bg-white/10"
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 hover:bg-white/10"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium transition-all duration-200 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};