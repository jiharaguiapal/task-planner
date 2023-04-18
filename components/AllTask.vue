<template>
  <div>
    <div class="list">
      <b-row class="list__header">
        <b-col>
          <h1 class="list__header__title">Task Planner</h1>
        </b-col>
        <b-col>
          <b-nav class="list__header__nav" small align="end" pills>
            <b-nav-item @click="filterAll()">All</b-nav-item>
            <b-nav-item @click="filterImportant()">
              {{ countImportant }} Important</b-nav-item
            >
            <b-nav-item @click="filterDone()"> {{ countDone }} Done</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row class="list__search">
        <b-col>
          <b-input
            class="list__search__input"
            placeholder="Search"
            v-model="search"
          ></b-input>
        </b-col>
      </b-row>
      <b-card
        no-body
        class="list__task"
        v-for="task in filteredTask"
        :key="task.id"
      >
        <b-row no-gutters align-v="center">
          <b-col>
            <b-form-checkbox
              class="list__task__checkbox"
              @change="doneTask(task)"
              :checked="task.is_done == true"
            >
              <span
                class="list__task__checkbox_title"
                :class="task.is_done ? 'done-task' : ''"
              >
                {{ task.title }}
              </span>
            </b-form-checkbox>
          </b-col>

          <b-col class="list__task__col">
            <b-dropdown
              variant="muted"
              class="list__task__col__dropdown"
              size="sm"
            >
              <b-dropdown-group>
                <b-input
                  class="list__task__col__dropdown__input"
                  size="sm"
                  placeholder="Search Team Member"
                ></b-input>
              </b-dropdown-group>
              <b-dropdown-item
                class="list__task__col__dropdown__item"
                v-for="user in allUsers"
                :key="user.id"
              >
                <b-avatar size="sm" :src="user.avatar"></b-avatar>
                <span>
                  {{ user.name }}
                </span>
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col class="list__task__col">
            <font-awesome-icon
              class="list__task__col__important"
              @click="markImportant(task)"
              :class="task.is_important ? 'temp-yellow' : ''"
              :icon="['far', 'star']"
            />
          </b-col>
          <b-col class="list__task__col">
            <font-awesome-icon
              class="list__task__col__delete"
              @click="deleteTask(task)"
              :icon="['far', 'trash-can']"
            />
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="add">
      <AddTask />
    </div>
  </div>
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
      activeBtn: "muted",
    };
  },
  watch: {
    search() {
      this.filteredTask = this.allTasks.filter((task) =>
        task.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  computed: {
    ...mapGetters({
      allTasks: "getTasks",
      allUsers: "getUsers",
    }),

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

    searchFilter() {
      this.filteredTask = this.allTasks.filter((task) =>
        task.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async beforeCreate() {
    await this.$store.dispatch("fetchAllTasks");
    await this.$store.dispatch("fetchAllUsers");
  },
  created() {
    this.filteredTasks();
  },

  methods: {
    async filteredTasks() {
      await this.$store.dispatch("fetchAllTasks");
      this.filteredTask = [];
      if (this.filterOn == "all") {
        this.filteredTask = this.allTasks;
        // return this.filteredTask;
      }
      if (this.filterOn == "done") {
        this.allTasks.filter((task) => {
          if (task.is_done == true) {
            this.filteredTask.push(task);
          }
        });
        // return this.filteredTask;
      }
      if (this.filterOn == "important") {
        this.allTasks.filter((task) => {
          if (task.is_important == true) {
            this.filteredTask.push(task);
          }
        });
        // return this.filteredTask;
      }
    },
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
      this.filterOn = "all";
      this.filteredTasks();
    },
    filterDone() {
      this.filterOn = "done";
      this.filteredTasks();
    },
    filterImportant() {
      this.filterOn = "important";
      this.filteredTasks();
    },
  },
};
</script>

<style scoped lang="scss">
.done-task {
  text-decoration: line-through;
}
.temp-yellow {
  color: #f6c23e;
}
</style>
