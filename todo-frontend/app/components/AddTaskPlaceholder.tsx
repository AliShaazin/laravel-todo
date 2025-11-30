"use client";
import { Plus } from "lucide-react";
import AddDialog from "./dialog/DialogForm";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

const AddTaskPlaceholder = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center flex items-center justify-center cursor-pointer h-50"
      >
        <Plus />
      </button>
      <AddDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default AddTaskPlaceholder;
