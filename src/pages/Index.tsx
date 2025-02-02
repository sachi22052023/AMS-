import { TaskList } from "@/components/TaskList";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="bg-white p-4 shadow-md mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          ORACLE LSGUI
        </h1>
        {(isAdmin !== undefined) && (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
      <div className="container mx-auto px-4">
        {!isAdmin && <LoginForm />}
        {isAdmin !== undefined && <TaskList />}
      </div>
    </div>
  );
};

export default Index;