import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Test from "@/test/Test";
import AboutDetailsForm from "./AboutDetailsForm";

type EditAboutDialogProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditAboutDialog = ({ children, open, setOpen }: EditAboutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-md w-[90%] max-h-[80vh] overflow-y-auto p-6"
      >
        {/* Accessibility Labels */}
        <DialogTitle asChild>
          <h2 className="sr-only">Edit About Section</h2>
        </DialogTitle>
        <DialogDescription asChild>
          <p className="sr-only">Update your bio, location, links, and skills.</p>
        </DialogDescription>

        {/* Form */}
        <AboutDetailsForm />
      </DialogContent>
    </Dialog>
  );
};