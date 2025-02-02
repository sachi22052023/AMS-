import { TaskList } from "@/components/TaskList";
import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-sky-100">
      <div className="bg-white p-4 shadow-md mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          ORACLE LSGUI
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <LoginForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Index;