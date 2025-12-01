"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/lib/types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatTime } from "@/lib/helperFunctions";
import { clientAuthFetch } from "@/lib/helperFunctions";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await clientAuthFetch(`/tasks/${id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  const handleMarkedDone = async (checked: boolean) => {
    await clientAuthFetch(`/tasks/${task.id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_completed: checked }),
    });
    router.refresh();
  };
  return (
    <section className="h-50 border rounded-lg border-gray-500 p-4 w-full flex flex-col justify-between relative">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="flex items-center  gap-2">
        Mark as done
        <Checkbox
          defaultChecked={task.is_completed}
          checked={task.is_completed}
          onCheckedChange={handleMarkedDone}
          className="text-black data-[state=checked]:bg-green-500 data-[state=checked]:border-green-700 cursor-pointer "
        />
      </div>
      <button
        onClick={() => handleDelete(task.id)}
        className="absolute p-2 top-2 right-2 text-gray-400 hover:text-red-400 cursor-pointer"
      >
        <Trash />
      </button>
      <div>
        <span className="text-gray-400 text-xs">
          Last updated at: {formatTime(task.updated_at)}
        </span>
      </div>
    </section>
  );
};

export default TaskCard;
