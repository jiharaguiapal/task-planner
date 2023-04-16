<template>
  <b-container>
    <div>
      <b-row>
        <b-col>
          <h1>Task Planner</h1>
        </b-col>
        <b-col>
          <b-button variant="muted" @click="filterAll()">All</b-button>
          <b-button variant="muted" @click="filterImportant()">
            {{ countImportant }} Important
          </b-button>
          <b-button variant="muted" @click="filterDone()">
            {{ countDone }} Done</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-input
            @change="searchFilter"
            placeholder="Search"
            v-model="search"
          ></b-input>
          <!-- @keyup.enter="searchFilter()" -->
        </b-col>
      </b-row>
      <b-card v-for="task in filteredTasks" :key="task.id">
        <b-row>
          <b-col>
            <b-form-checkbox
              @change="doneTask(task)"
              :checked="task.is_done == true"
            >
            </b-form-checkbox>
          </b-col>
          <b-col>
            <p :class="task.is_done ? 'done-task' : ''">{{ task.title }}</p>
          </b-col>
          <b-col>
            <font-awesome-icon
              @click="markImportant(task)"
              :class="task.is_important ? 'temp-yellow' : ''"
              :icon="['far', 'star']"
            />
          </b-col>
          <b-col>
            <font-awesome-icon
              @click="deleteTask(task)"
              :icon="['far', 'trash-can']"
            />
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div>
      <AddTask />
    </div>
  </b-container>
</template>

<script>
import AddTask from "./AddTask";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Alltask",
  components: {
    AddTask,
  },
  data() {
    return {
      taskData: {},
      filteredTask: [],
      filterOn: "all",
      search: "",
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchAllTasks");
  },
  created() {},
  computed: {
    ...mapGetters({
      allTasks: "getTasks",
    }),
    // searchFilter() {
    //   let result;
    //   result = this.filteredTask.find((task) =>
    //     task.title.includes(this.search)
    //   );
    //   this.filteredTask = [];
    //   this.filteredTask.push(result);
    // },
    countDone() {
      let doneTasks = [];
      this.allTasks.filter((task) => {
        if (task.is_done == true) {
          doneTasks.push(task);
        }
      });
      return doneTasks.length;
    },
    countImportant() {
      let importantTasks = [];
      this.allTasks.filter((task) => {
        if (task.is_important == true) {
          importantTasks.push(task);
        }
      });
      return importantTasks.length;
    },

    filteredTasks() {
      this.filteredTask = [];
      if (this.filterOn == "all") {
        this.filteredTask = this.allTasks;
        return this.filteredTask;
      }
      if (this.filterOn == "done") {
        this.allTasks.filter((task) => {
          if (task.is_done == true) {
            this.filteredTask.push(task);
          }
        });
        return this.filteredTask;
      }
      if (this.filterOn == "important") {
        this.allTasks.filter((task) => {
          if (task.is_important == true) {
            this.filteredTask.push(task);
          }
        });
        return this.filteredTask;
      }
    },
  },
  methods: {
    doneTask(task) {
      //   this.taskData.is_done = !task.is_done;
      this.taskData = {
        is_done: !task.is_done,
      };
      this.$store
        .dispatch("updateTask", {
          taskData: this.taskData,
          taskId: task.id,
        })
        .then((res) => {
          this.$router.push("/allTask");
        })
        .catch((err) => err);
    },
    markImportant(task) {
      //   this.taskData.is_important = !task.is_important;
      this.taskData = {
        is_important: !task.is_important,
      };
      this.$store
        .dispatch("updateTask", {
          taskData: this.taskData,
          taskId: task.id,
        })
        .then((res) => {
          this.$router.push("/allTask");
        })
        .catch((err) => err);
    },
    deleteTask(task) {
      this.$store
        .dispatch("deleteTask", {
          taskId: task.id,
        })
        .then((res) => {
          this.$store.dispatch("fetchAllTasks");
        })
        .catch((err) => err);
    },
    filterAll() {
      //   this.filteredTask = this.allTasks;
      this.filterOn = "all";
    },
    filterDone() {
      //   this.filteredTask = [];
      //   this.allTasks.filter((task) => {
      //     if (task.is_done == true) {
      //       this.filteredTask.push(task);
      //     }
      //   });
      this.filterOn = "done";
    },
    filterImportant() {
      //   this.filteredTask = [];

      //   this.allTasks.filter((task) => {
      //     if (task.is_important == true) {
      //       this.filteredTask.push(task);
      //     }
      //   });
      this.filterOn = "important";
    },
    // searchFilter() {
    //   let result;
    //   result = this.allTasks.find((task) => task.title.includes(this.search));
    //   console.log("result", result);
    // },
  },
};
</script>

<style scoped lang="scss">
.done-task {
  text-decoration: line-through;
}
.temp-yellow {
  color: yellow;
}
</style>
