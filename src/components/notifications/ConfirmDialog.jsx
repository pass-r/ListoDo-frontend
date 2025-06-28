import { useRef, useEffect } from "react";
import styles from "../../style/ConfirmDialog.module.css";

export default function ConfirmDialog({ isOpen, onAccept, onCancel }) {
  const refDialog = useRef(null);

  // show or hide the modal dialog
  useEffect(() => {
    const dialog = refDialog.current;
    // if ref has not been attached yet
    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  return (
    <dialog className={styles.dialog} ref={refDialog}>
      <p>Do you want to delete the task</p>
      <div>
        <button onClick={onCancel}>No</button>
        <button onClick={onAccept}>Yes</button>
      </div>
    </dialog>
  );
}
