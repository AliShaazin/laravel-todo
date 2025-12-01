"use client";
import TaskContainer from "./TaskContainer";
import TaskCard from "./cards/TaskCard";
import AddTaskPlaceholder from "./AddTaskPlaceholder";
import { Task } from "@/lib/types";
import { useState, useEffect } from "react";
import { echo } from "@/lib/echo";

type Props = {
  tasks: Task[];
};
const TaskClientWrapper = ({ tasks }: Props) => {
  const [taskList, setTaskList] = useState<Task[]>();

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  useEffect(() => {
    console.log("Echo connection status:", echo.connector.socket.connected);

    const channel = echo.channel("laravel-database-tasks");

    channel.listen("TaskChanged", (e: { tasks: Task[] }) => {
      console.log("Tasks updated:", e.tasks);
      setTaskList(e.tasks);
    });

    return () => {
      echo.leaveChannel("laravel-database-tasks");
    };
  }, []);

  return (
    <TaskContainer>
      {taskList?.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <AddTaskPlaceholder />
    </TaskContainer>
  );
};

export default TaskClientWrapper;
