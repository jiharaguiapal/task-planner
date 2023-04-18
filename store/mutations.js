export default {
  SET_ALLTASKS(state, tasks) {
    state.allTasks = tasks;
  },
  SET_ALLUSERS(state, users) {
    state.allUsers = users;
  },
  ADD_TASK(state, task) {
    state.allTasks.push(task);
  },
  UPDATE_TASK(state, updatedTask) {
    console.log("update mu", updatedTask);
    const index = state.allTasks.findIndex(
      (task) => task.id === updatedTask.id
    );
    state.allTasks.splice(index, 1, updatedTask);
  },
  DELETE_TASK(state, id) {
    state.allTasks.splice(state.allTasks.indexOf(id), 1);
  },
};
