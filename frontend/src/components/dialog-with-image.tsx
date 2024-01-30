import React from "react";
import { Dialog, DialogBody, IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface DialogWithImageProps {
  handleOpen: () => void;
  open: boolean;
  imageUrl: string;
}

export function DialogWithImage({
  open,
  imageUrl,
  handleOpen,
}: DialogWithImageProps) {
  return (
    <Dialog size="xl" className="relative" open={open} handler={handleOpen} placeholder={''}>
      <div className="flex items-center gap-2 bg-gray-500 rounded-lg absolute right-0 z-50">
        <IconButton variant="text" size="sm" onClick={handleOpen} placeholder={''}>
          <XMarkIcon color="purple" className="h-6" />
        </IconButton>
      </div>
      <DialogBody placeholder={''}>
        <img
          width={760}
          height={768}
          alt="nature"
          className="h-[48rem] w-full rounded-lg object-cover object-center"
          src={imageUrl}
        />
      </DialogBody>
    </Dialog>
  );
}