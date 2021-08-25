<template>
  <div class="home">
    <v-container class="d-flex justify-center align-center pt-10">
      <v-btn to="/" text color="primary"><v-icon large>mdi-home</v-icon></v-btn>
      <v-spacer></v-spacer>
    </v-container>
    <div class="login d-flex justify-center mt-10">
      <v-card width="600" class="pa-5 mx-3">
        <!-- Card Header -->
        <div class="d-flex align-center flex-column">
          <v-img
            src="../assets/images/medimi-logo-colors.png"
            min-height="75"
            max-width="75"
            contain
          ></v-img>
          <v-card-title
            style="word-break: normal; text-align: center"
            class="font-weight-bold"
            >Connectez-vous pour continuer sur Medim</v-card-title
          >
        </div>
        <!-- End Card Header -->
        <!-- Login Fields -->
        <div>
          <v-row class="mb-5">
            <v-col cols="12">
              <v-text-field
                label="Email"
                v-model="credentials.email"
                type="text"
                class="px-4"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Mot de Passe"
                v-model="credentials.password"
                type="password"
                class="px-4"
                outlined
                @keydown.enter="login"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="px-7">
              <v-btn
                color="primary"
                large
                elevation="0"
                block
                :loading="loader"
                @click.stop="login"
                >Connexion</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    credentials: {
      email: "",
      password: "",
    },
    errorMsg: null,
    loader: false,
  }),

  methods: {
    async login() {
      this.loader = true;

      this.$store
        .dispatch("auth/login", this.credentials)
        .then((data) => {
          this.loader = false;
          if(data.userType == 'hospitalHead') return this.$router.push('/hospital/my')
        })
        .catch((err) => {
          console.log(err);
          this.loader = false;
        });
    },
  },
};
</script>
<style></style>
