export type Task = {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TaskFormState = {
  name: string;
  description: string;
  error?: { name?: string; description?: string };
  success?: boolean;
};

export type LoginFormState = {
  email: string;
  password: string;
  error?: { email?: string; password?: string };
  success?: boolean;
};

export interface RegisterFormState extends LoginFormState {
  username: string;
}
