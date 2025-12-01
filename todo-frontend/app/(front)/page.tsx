import { getTasks } from "../../actions/actions";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TaskClientWrapper from "@/components/TaskClienWrapper";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (!token) {
    redirect("/login");
  }
  const tasks = await getTasks();

  return (
    <section className="min-h-screen w-full flex flex-col items-center">
      <Header
        title="Task Manager V1"
        description="Manage your tasks efficiently"
      />
      <TaskClientWrapper tasks={tasks} />
    </section>
  );
}
