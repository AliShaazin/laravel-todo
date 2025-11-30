"use client";
import { getTasks, handleAddTask } from "@/actions/actions";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { Modal } from "../modal/Modal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type DialogFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function DialogForm({ open, setOpen }: DialogFormProps) {
  const [formState, formAction, isPending] = useActionState(handleAddTask, {
    name: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      router.refresh();
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <Modal
      title="Add a Task"
      showFooter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <form action={formAction} className="space-y-6">
        <p className="text-sm text-gray-500">
          Fill in the details of the task and click save when you&apos;re done.
        </p>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Task Name</Label>
            <Input id="name" name="name" placeholder="Enter task name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Enter task description"
            />
            {formState.error?.name && (
              <div className="text-red-500">{formState.error.name ?? ""}</div>
            )}
            {formState.error?.description && (
              <div className="text-red-500">
                {formState.error.description ?? ""}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default DialogForm;
