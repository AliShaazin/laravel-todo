import { Button } from "@/components/ui/button";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
export function Modal({
  title,
  open,
  onOpenChange,
  size = "sm",
  children = null,
  showFooter = true,
  customFooter = null,
  fullScreenType = false,
  saveButtonText = "Save",
  actionButton = null,
  handleActionButtonClick = () => {},
}: {
  children?: React.ReactNode;
  size?: string;
  title?: string | React.ReactNode;
  open: boolean;
  showFooter?: boolean;
  customFooter?: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  fullScreenType?: boolean;
  saveButtonText?: string | React.ReactNode;
  actionButton?: React.ReactNode | null;
  handleActionButtonClick?: () => void;
}) {
  // const formRef = useRef<{ getFormData: () => any; isValid: () => boolean }>(
  //   null
  // );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sizeLookup = {
    sm: "min-w-sm",
    md: "min-w-md",
    lg: "min-w-lg",
    xl: "min-w-xl",
    "2xl": "min-w-2xl",
    "3xl": "min-w-3xl",
    "4xl": "min-w-4xl",
    "400": "min-w-[400px]",
    "500": "min-w-[500px]",
    "600": "min-w-[600px]",
    "700": "min-w-[700px]",
    "800": "min-w-[800px]",
    "900": "min-w-[900px]",
    full: "min-w-screen",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={`${
          isFullScreen
            ? sizeLookup.full
            : sizeLookup[size as keyof typeof sizeLookup]
        } ${
          !fullScreenType && "rounded-l-xl"
        } transition-all duration-600 transition-quick-out`}
      >
        <SheetHeader
          className={`p-4 flex flex-row border-b border-[#EDEDED] min-h-16 items-center gap-2 w-full justify-between`}
        >
          <section className="flex items-center gap-2">
            <SheetTitle
              className={`
                ${
                  fullScreenType
                    ? `text-[#A3A3A3] text-sm leading-5 font-medium`
                    : `text-[#141414] text-lg font-medium`
                }
              pointer-events-none`}
            >
              {title}
            </SheetTitle>
          </section>
          {fullScreenType && (
            <button
              onClick={() => setIsFullScreen((prev) => !prev)}
              className="cursor-pointer relative w-6 h-6 flex items-center justify-center"
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isFullScreen ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
                aria-hidden={isFullScreen}
              >
                <Maximize2 size={14} className="text-[#737373]" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isFullScreen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                aria-hidden={!isFullScreen}
              >
                <Minimize2 size={14} className="text-[#737373]" />
              </span>
            </button>
          )}
          {!fullScreenType && (
            <SheetPrimitive.Close className="cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none">
              <XIcon className="w-5 h-5" stroke="#737373" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          )}
        </SheetHeader>

        <div
          className={`p-6 flex-1 overflow-y-auto overflow-ellipsis overflow-x-hidden`}
        >
          {children}
        </div>

        {customFooter ? (
          <SheetFooter>{customFooter}</SheetFooter>
        ) : (
          showFooter && (
            <SheetFooter className="flex flex-row justify-between items-center border-t border-[#EDEDED] h-18 px-6">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="bg-white border border-[#D6D6D6] rounded-[9px] text-[#424242] text-sm leading-5 font-medium cursor-pointer"
                >
                  Cancel
                </Button>
              </SheetClose>

              <section className="flex items-center gap-2 ">
                {actionButton && (
                  <Button
                    onClick={handleActionButtonClick}
                    className="border border-[#D6D6D6] rounded-[9px] bg-white flex items-center justify-center cursor-pointer h-8 w-8"
                  >
                    {actionButton}
                  </Button>
                )}
                <Button
                  type="submit"
                  variant={"default"}
                  size={"sm"}
                  className="rounded-[9px] bg-[#141414] border border-[#141414] text-white text-sm leading-5 font-medium cursor-pointer w-fit"
                >
                  {saveButtonText}
                </Button>
              </section>
            </SheetFooter>
          )
        )}

        {/* <SheetFooter className="flex flex-row justify-between items-center">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit" variant={"default"} size={"sm"}>
            Save
          </Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
