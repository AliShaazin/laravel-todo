import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";
import TaskCard from "./components/TaskCard";
import { getTasks } from "../actions/actions";
import AddTaskPlaceholder from "./components/AddTaskPlaceholder";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <section className="min-h-screen">
      <Header
        title="Task Manager V1"
        description="Manage your tasks efficiently"
      />
      <TaskContainer>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <AddTaskPlaceholder />
      </TaskContainer>
    </section>
  );
}
