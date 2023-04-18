<template>
  <div class="landing">
    <div class="landing__header">
      <h1 class="landing__header__title">Welcome to Task Planner</h1>
      <p class="landing__header__subtitle">
        Get things done with your day, a list that refreshes everyday.
      </p>
    </div>
    <div class="landing__action">
      <b-input
        class="landing__action__input"
        @keyup.enter="addToTask()"
        v-model="newTask.title"
        placeholder="What's your plan for today?"
      >
      </b-input>
      <p class="landing__action__label">
        Press <span class="landing__action__label--highlight"> enter </span> to
        add task
      </p>
    </div>
  </div>
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
          this.$router.push("/allTask");
        })
        .catch((err) => err);
    },
  },
};
</script>
