<template>
  <div class="home">
    <v-container class="d-flex justify-center align-center">
      <v-img
        src="../assets/images/medimi-logo-colors.png"
        min-height="75"
        max-width="75"
        contain
      ></v-img>
      <v-spacer></v-spacer>
    </v-container>
    <div class="hero d-flex flex-column justify-center">
      <v-container>
        <h1
          class="primary--text text-h4 font-weight-bold text-sm-h3 text-md-h2 text-lg-h1"
        >
          Tableau de Bord Médical Medimi
        </h1>
        <v-btn large color="primary text--capitalize px-10 mt-10" elevation="0" @click="toLogin"
          >Connexion</v-btn
        >
      </v-container>
    </div>
    <!-- Home -->
  </div>
  <!-- Component Wrapper -->
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: "Home",

  data() {
    return {

    }
  },

  methods: {
    toLogin() {
      this.$router.push({ name: 'Login'})
    }
  },

  created() {
    document.title = "Medimi"
  },

};
</script>

<style>
.hero {
  height: 60vh;
  width: 100vw;
}

.home {
  height: 100%;
  width: 100vw;
  background-color: #f9f9f9;
  background-image: url("../assets/images/tealish.png");
  background-repeat: repeat;
}
</style>
