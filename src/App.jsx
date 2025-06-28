import { useState } from "react";
import { useConfirmDelete } from "./hooks/useConfirmDelete.js";
import TaskProvider from "./components/tasks/TasksProvider.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import {
  Today,
  Future,
  Someday,
  Completed,
  Project,
} from "./components/tasks/taskviews/index.js";
import TaskModal from "./components/tasks/TaskModal.jsx";
import ConfirmDialog from "./components/notifications/ConfirmDialog.jsx";
import styles from "./style/App.module.css";
import "./style/global.css";

export default function App() {
  const [currentView, setCurrentView] = useState({ active: "today", isProject: false });
  const [modalState, setModalState] = useState({ isOpen: false, changeId: null });

  const { isConfirmOpen, openConfirm, confirmDelete, cancelDelete } = useConfirmDelete();

  const openEditModal = (id) => setModalState({ isOpen: true, changeId: id });

  const currentViewComponent = () => {
    if (!currentView.isProject) {
      const viewMap = {
        today: <Today openEditModal={openEditModal} openConfirm={openConfirm} />,
        future: <Future openEditModal={openEditModal} openConfirm={openConfirm} />,
        someday: <Someday openEditModal={openEditModal} openConfirm={openConfirm} />,
        completed: <Completed openEditModal={openEditModal} openConfirm={openConfirm} />,
      };
      return viewMap[currentView.active];
    } else {
      const projectView = (
        <Project
          openEditModal={openEditModal}
          openConfirm={openConfirm}
          projectName={currentView.active}
        />
      );
      return projectView;
    }
  };

  // TODO: Loading????
  // if (!data) {
  //   return <h1>Loading</h1>;
  // }

  return (
    <TaskProvider>
      <div className={styles.gridLayout}>
        <nav className={styles.sidebarContainer}>
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            openModal={() => setModalState({ isOpen: true, changeId: null })}
          />
        </nav>
        <main className={styles.mainContainer}>{currentViewComponent()}</main>
        {modalState.isOpen && (
          <TaskModal
            isOpen={modalState.isOpen}
            changeId={modalState.changeId}
            closeModal={() => setModalState({ isOpen: false, changeId: null })}
          />
        )}
      </div>
      {isConfirmOpen && (
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onAccept={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </TaskProvider>
  );
}
