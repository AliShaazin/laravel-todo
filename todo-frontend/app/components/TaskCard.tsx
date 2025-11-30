import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../lib/types";
import { Trash } from "lucide-react";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <section className="h-50 border rounded-lg border-gray-500 p-4 w-full flex flex-col justify-between relative">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="flex items-center  gap-2">
        Mark as done
        <Checkbox
          defaultChecked={task.completed}
          className="text-black data-[state=checked]:bg-green-500 data-[state=checked]:border-green-700 cursor-pointer"
        />
      </div>
      <div className="absolute p-2 top-2 right-2 text-gray-400 hover:text-red-400 cursor-pointer">
        <Trash />
      </div>
    </section>
  );
};

export default TaskCard;
