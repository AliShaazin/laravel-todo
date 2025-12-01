"use server";
import { Task, User } from "@/lib/types";
import { TaskFormState } from "@/lib/types";
import { LoginFormState } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterFormState } from "@/lib/types";
import { authFetch } from "@/lib/apiHelper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(): Promise<User[]> {
  const res = await authFetch("/users");
  const data = await res.json();
  return data.users;
}

export async function getTasks(): Promise<Task[]> {
  const res = await authFetch("/tasks");
  const data = await res.json();
  return data.tasks;
}

// add task action (form action)
export async function handleAddTask(
  formState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
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

  const res = await authFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ title: name, description: description }),
  });

  console.log("Add Task Response Status:", res);
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

// login form action
export async function handleLogin(
  formState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("login-email") as string;
  const password = formData.get("login-password") as string;

  console.log("Login Data Received:", { email, password });
  if (!email) {
    return {
      email: email,
      error: { email: "Email is required" },
      password: password,
      success: false,
    };
  }
  if (!password) {
    return {
      email: email,
      password: password,
      error: { password: "Password is required" },
      success: false,
    };
  }

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errorMsg = "Login failed";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    return {
      email,
      password,
      error: { email: errorMsg },
      success: false,
    };
  }

  const data = await res.json();
  const cookie = await cookies();
  cookie.set("access_token", data.access_token, {
    path: "/",
    secure: false, // TODO: set to true, figure out why it doesnt set cookie on safari when set to true
    httpOnly: false, // TODO: set to true, and figure out a way to send cookie using credentials include
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
  });
  redirect("/");
}

// register form action
export async function handleRegister(
  formState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const username = formData.get("register-username") as string;
  const email = formData.get("register-email") as string;
  const password = formData.get("register-password") as string;

  console.log("Register Data Received:", { username, email, password });
  if (!username) {
    return {
      username: username,
      email: email,
      error: { email: "Username is required" },
      password: password,
      success: false,
    };
  }
  if (!email) {
    return {
      username: username,
      email: email,
      error: { email: "Email is required" },
      password: password,
      success: false,
    };
  }
  if (!password) {
    return {
      username: username,
      email: email,
      password: password,
      error: { password: "Password is required" },
      success: false,
    };
  }

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name: username, email, password }),
  });

  if (!res.ok) {
    let errorMsg = "Registration failed";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    return {
      username,
      email,
      password,
      error: { email: errorMsg },
      success: false,
    };
  }

  const loginRes = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    let errorMsg = "Login after registration failed";
    try {
      const errorData = await loginRes.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    return {
      username,
      email,
      password,
      error: { email: errorMsg },
      success: false,
    };
  }

  const data = await loginRes.json();
  console.log("Login after registration successful:", data);
  const cookie = await cookies();
  cookie.set("access_token", data.access_token, {
    path: "/",
    secure: false, // TODO: set to true, figure out why it doesnt set cookie on safari when set to true
    httpOnly: false, // TODO: set to true, and figure out a way to send cookie using credentials include
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
  });
  redirect("/");
}
