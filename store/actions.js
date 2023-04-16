import axios from "axios";

export default {
  async fetchAllTasks({ commit }) {
    await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/tasks`,
      headers: {},
    })
      .then((res) => {
        commit("SET_ALLTASKS", res.data);
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async addNewTask({ commit }, { newTask }) {
    await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/tasks`,
      headers: {},
      data: {
        ...newTask,
      },
    })
      .then((res) => {
        commit("ADD_TASK", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateTask({ commit }, { taskId, taskData }) {
    await axios({
      method: "PUT",
      url: `${this.$axios.defaults.baseURL}/tasks/${taskId}`,
      headers: {},
      data: {
        ...taskData,
      },
    })
      .then((res) => {
        console.log("updateTask", res.data);
        commit("UPDATE_TASK", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteTask({ commit }, { taskId }) {
    await axios({
      method: "DELETE",
      url: `${this.$axios.defaults.baseURL}/tasks/${taskId}`,
      headers: {},
    })
      .then((res) => {
        console.log("delete", taskId);
        commit("DELETE_TASK", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
