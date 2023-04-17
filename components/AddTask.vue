<template>
  <div class="add-task">
    <b-input
      class="add-task__input"
      @keyup.enter="addToTask()"
      v-model="newTask.title"
      placeholder="What's your plan for today?"
    ></b-input>
    <p class="add-task__label">Press enter to add task</p>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      newTask: {
        title: null,
      },
    };
  },

  methods: {
    addToTask() {
      this.$store
        .dispatch("addNewTask", {
          newTask: this.newTask,
        })
        .then((res) => {
          this.newTask = {
            title: null,
          };
        })
        .catch((err) => err);
    },
  },
};
</script>
