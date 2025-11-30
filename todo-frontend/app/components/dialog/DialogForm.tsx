"use client";
import { handleAddTask } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { handleAddTask } from "@/actions/actions";

export function DialogForm() {
  const [formState, formAction] = useActionState(handleAddTask, null);
  return (
    <>
      <form action={formAction}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Task</DialogTitle>
            <DialogDescription>
              Fill in the details of the task and click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Task Name</Label>
              <Input id="name-1" name="name" placeholder="Enter task name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                placeholder="Enter task description"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </>
  );
}

export default DialogForm;
