<template>
  <b-container>
    <div>
      <h1>Welcome to Task Planner</h1>
      <p>Get things done with your day, a list that refreshes everyday.</p>
    </div>
    <div>
      <b-input
        @keyup.enter="addToTask()"
        v-model="newTask.title"
        placeholder="What's your plan for today?"
      ></b-input>
      <p>Press enter to add task</p>
    </div>
  </b-container>
</template>

<script>
import AddTask from "./AddTask";

export default {
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
          console.log("res add", res);
          this.$router.push("/allTask");
        })
        .catch((err) => err);
    },
  },
};
</script>
