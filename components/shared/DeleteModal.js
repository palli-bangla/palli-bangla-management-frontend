"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteUserMutation } from "@/redux/api/userApi";




const DeleteModal = ({ isOpen, onClose, onConfirm,item, itemName, endpoint, _id,  }) => {

    const [deleteUser] = useDeleteUserMutation();
  const baseurl = `https://palli-bangla-server.vercel.app/api/v1/${endpoint}/${_id}`;

  const handleConfirm = async () => {

    try {
      const response = await fetch(baseurl, {
        method: "DELETE",
      });

      if (response.ok) {
        onConfirm();
      } else {
        console.error("Failed to delete the item:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while deleting the item:", error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {itemName}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{itemName} {item}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            No
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
