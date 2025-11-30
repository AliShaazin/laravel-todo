import Header from "../components/Header";
import TaskContainer from "../components/TaskContainer";
import TaskCard from "../components/TaskCard";
import { getTasks } from "../actions/actions";
import AddTaskPlaceholder from "../components/AddTaskPlaceholder";
import { Task } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (!token) {
    redirect("/login");
  }
  const tasks = await getTasks();

  return (
    <section className="min-h-screen">
      <Header
        title="Task Manager V1"
        description="Manage your tasks efficiently"
      />
      <TaskContainer>
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <AddTaskPlaceholder />
      </TaskContainer>
    </section>
  );
}
