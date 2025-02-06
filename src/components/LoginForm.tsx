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
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Login to View Schedule Task for AMS</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-hover"
        >
          Login
        </button>
      </form>
    </div>
  );
};