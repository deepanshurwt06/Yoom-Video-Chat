import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MeetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  className?: string;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModel = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
     
      <DialogContent className="flex flex-col w-full max-w-[520px] gap-6 border-none bg-dark-1 px-6 py-9 text-white">
      <VisuallyHidden>
      <DialogTitle>Hidden Accessible Title</DialogTitle>
    </VisuallyHidden>
       <div className="flex flex-col gap-6">
        {image && (
            <div className='flex justfy-center'>
                <Image src={image} alt="image" width={72} height={72} />
            </div>
        )}
          <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
          {children}
          <Button className="bg-[#0e78f8] hover:bg-[#0e77f8b4] focus-visible:ring-0 focus-visible:ring-offset-0 " 
          onClick={handleClick}>
            {buttonIcon && (
                <Image src={buttonIcon} alt="button icon" width={13} height={13}/>
            )} &nbsp;
            {buttonText || 'Schedule Meeting'}
          </Button>
       </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
