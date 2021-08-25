<template>
  <div class="home" style="height: 100vh">
    <v-container class="d-flex justify-center align-center pt-10">
      <v-btn to="/" text color="secondary"><v-icon large>mdi-home</v-icon></v-btn>
      <v-spacer></v-spacer>
      <div>
      </div>
    </v-container>
    <div class="login d-flex justify-center mt-10">
      <v-card width="500" class="pa-5 mx-3 d-flex align-center justify-center flex-column ">
        <v-card-title class="error-page display-5">404!</v-card-title>
        <v-card-text class="text-center mt-5">
          <p class="display-1">{{ title }}</p>
          <p class="subtitle-1">{{ text }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" link to="/" class="text-capitalize" dark elevation="0"><v-icon small class="mr-2">mdi-home</v-icon>Home</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "FourOFour",
  data: () => ({
    title: 'Sorry, page not found',
    text: 'It will be as simple as Occidental in fact, it will Occidental to an English person'
  })

}
</script>

<style scoped>

.home {
  height: 100%;
  width: 100vw;
  background-color: #a3a2a2;
  background-image: url("../assets/images/tealish.png");
  background-repeat: repeat;
}

.error-page {
  text-transform: uppercase;
  background: repeating-linear-gradient(45deg, #30419b, #30419b 10px, #02c58d 10px, #02c58d 20px);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 110px;
  line-height: .7;
  position: relative;
}
</style>
