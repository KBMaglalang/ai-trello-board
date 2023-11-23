/**

Opens the task modal. */
export const openTaskModal = () => {
  const taskModal = document.getElementById("task_modal") as HTMLDialogElement;
  if (taskModal) {
    taskModal.showModal();
  }
};
