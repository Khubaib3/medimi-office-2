<template>
  <div class="grey lighten-4 app-wrapper">
    <nav-bar />
    <v-main class="pa-10">
      <v-sheet
        v-if="loading"
        class="d-flex align-center justify-center"
        style="height: 50vh"
      >
        <v-progress-circular
          indeterminate
          size="50"
          color="primary"
        ></v-progress-circular>
      </v-sheet>
      <transition name="slide-fade" mode="out-in" v-else>
        <router-view></router-view>
      </transition>
    </v-main>
  </div>
</template>

<script>
import NavBar from "@/components/hospital/NavBar.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    NavBar,
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapState({
      hospital: (state) => state.hospital.hospital,
    }),
  },

  async created() {
    if (!this.hospital) {
      await this.getHospital();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },

  methods: {
    ...mapActions({
      getHospital: "hospital/getHospital",
    }),
  },
};
</script>

<style>
.app-wrapper {
  height: 100vh;
}
</style>
