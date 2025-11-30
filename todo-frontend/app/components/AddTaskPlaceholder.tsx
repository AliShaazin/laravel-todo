"use client";
import { Plus } from "lucide-react";
import AddDialog from "./dialog/DialogForm";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const handleClick = () => {
  //logic
};

const AddTaskPlaceholder = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={handleClick}
            className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center flex items-center justify-center cursor-pointer"
          >
            <Plus />
          </button>
        </DialogTrigger>
        <AddDialog />
      </Dialog>
    </>
  );
};

export default AddTaskPlaceholder;
