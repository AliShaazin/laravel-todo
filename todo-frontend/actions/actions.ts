import { Task } from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.tasks;
}

export const handleAddTask = async (prevState, formData) => {
  const title = formData.get("name") as string;
  const description = formData.get("description") as string;
};
