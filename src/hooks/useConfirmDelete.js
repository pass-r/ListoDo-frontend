import { useState } from "react";

export function useConfirmDelete() {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  // openConfirm places the resolve() in to resolveDelete.
  //   when resolveDelete(boolean) is executed, resolve() is called
  //   with the boolean passed to resolveDelete
  const [resolveDelete, setResolveDelete] = useState(null);

  const openConfirm = () => {
    return new Promise((resolve, reject) => {
      setResolveDelete(() => resolve);
      setConfirmOpen(true);
    });
  };

  const confirmDelete = () => {
    resolveDelete(true);
    setConfirmOpen(false);
  };

  const cancelDelete = () => {
    resolveDelete(false);
    setConfirmOpen(false);
  };

  return {
    isConfirmOpen,
    openConfirm,
    confirmDelete,
    cancelDelete,
  };
}
