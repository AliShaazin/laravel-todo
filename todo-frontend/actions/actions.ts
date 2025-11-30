"use server";
import { Task } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.tasks;
}

type FormState = {
  name: string;
  description: string;
  error?: { name?: string; description?: string };
  success?: boolean;
};

export async function handleAddTask(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  console.log("Form Data Received:", { name, description });
  if (!name) {
    return {
      name: name,
      error: { name: "Task name is required" },
      description: description,
      success: false,
    };
  }
  if (!description) {
    return {
      name: name,
      description: description,
      error: { description: "Task description is required" },
      success: false,
    };
  }

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: name, description: description }),
  });

  if (!res.ok) {
    return {
      name: name,
      description: description,
      error: { name: "Failed to add task" },
    };
  }

  return {
    name: "",
    description: "",
    success: true,
  };
}
