<template>
  <div>
    <v-card
      v-if="cardLoader == true"
      class="d-flex align-center justify-center"
      style="height: 200px"
    >
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-card>

    <v-card v-else color="grey lighten-5" elevation="0" outlined class="">
      <div>
        <v-card-title class="d-flex justify-space-between pa-5">
          <div class="secondary--text headline">Rendez-vous</div>
          <v-icon color="secondary" class="d-none d-sm-flex" @click="toggle"
            >mdi-close-thick</v-icon
          >
        </v-card-title>
      </div>
      <v-divider />
      <v-card-text style="height: auto">
        <v-row class="px-5" justify="center">
          <v-col cols="12" sm="6" class="d-flex justify-center">
            <v-row no-gutters>
              <v-col cols="6">
                <v-subheader class="pa-5">Matricule patient</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ patient.customId }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Prénom</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ patient.firstName }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Nom</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ patient.lastName }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Date de naissance</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ fixDate(patient.dob) }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Adresse</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ patient.address }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Numéro de téléphoné}</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ patient.phoneNumber }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Date de rdv</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ fixDate(date) }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Heure de rendez-vous</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ time }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5">Groupe sanguin</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ patient.bloodGroup }}</p>
              </v-col>
              <v-col cols="6">
                <v-subheader class="pa-5"
                  >Antécédents et terrain, Historique, Mensurations</v-subheader
                >
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">
                  <v-icon @click="viewInfo = !viewInfo">mdi-open-in-new</v-icon>
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" sm="6" class="d-flex justify-center">
            <v-row no-gutters>
              <v-col cols="6" align-self="center">
                <v-subheader class="pa-5">Motif de consultation</v-subheader>
              </v-col>
              <v-col cols="6" align-self="center">
                <p class="mb-0">{{ appointment.motive }}</p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-subheader class="pa-5"
                  >Informations pré-consultation</v-subheader
                >
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <p class="mb-0">{{ appointment.preInfo }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-5">
        <v-row no-gutters justify-sm="space-between">
          <v-col cols="12" sm="auto" order="2" order-sm="1">
            <v-btn
              :block="$vuetify.breakpoint.xs ? true : false"
              color="grey"
              class="mt-5 mt-sm-0"
              elevation="0"
              dark
              @click="toggle"
              >Cancel
            </v-btn>
          </v-col>
          <v-col cols="12" sm="auto" order="1" order-sm="1">
            <v-btn
              :block="$vuetify.breakpoint.xs ? true : false"
              color="primary"
              elevation="0"
              dark
              :loading="loader"
              @click="editAppointment"
            >
              Edit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    toggle: {
      type: Function,
      required: false,
    },
  },

  data() {
    return {
      cardLoader: true,
      date: "",
      time: "",

      patient: {},
      appointment: {},
    };
  },

  async created() {
    let data = await this.getAppointment({ id: this.id });
    this.patient = data.patient;
    this.appointment = data.appointment;
    let date = this.appointment.startDateTime.split(" ");
    this.date = date[0];
    this.time = date[1];

    this.cardLoader = false;
  },

  methods: {
    fixDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },

    editAppointment() {

    },

    ...mapActions({
      getAppointment: "appointment/getAppointment",
    }),
  },
};
</script>

<style></style>
