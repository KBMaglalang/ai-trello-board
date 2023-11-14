export const closeTaskModal = () => {
  const taskModal = document.getElementById("task_modal") as HTMLDialogElement;
  if (taskModal) {
    taskModal.close();
  }
};
