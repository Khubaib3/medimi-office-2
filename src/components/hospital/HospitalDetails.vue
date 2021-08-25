<template>
  <div>
    <v-card elevation="0">
      <v-card-title>Hospital - {{ hospital.customId }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Name</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>License</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.licenseType }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Phone Number</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.phoneNumber }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Website</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.website }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Description</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Address</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.address }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Indications</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.indications }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Creation Date</v-list-item-title>
                <v-list-item-subtitle>{{ getDate(hospital.createdAt) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="4">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Status</v-list-item-title>
                <v-list-item-subtitle>{{ hospital.status }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col> -->
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    hospital: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getDate(date) {
      return moment(date).locale('fr').format("LL")
    }
  }

};
</script>

<style></style>
