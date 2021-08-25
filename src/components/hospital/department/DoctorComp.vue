<template>
  <v-card>
    <div class="card-header">
      <v-card-title class="d-flex justify-space-between pa-5 text--white">
        <div class="white--text">Doctor - {{ doctor.customId }}</div>
        <v-icon dark class="d-none d-sm-flex" @click="toggle"
          >mdi-close-thick</v-icon
        >
      </v-card-title>
    </div>
    <v-divider />
    <v-card-text style="height: auto" class="pa-0">
      <v-card elevation="0">
        <v-card-text class="pt-5">
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="4">
              <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>First Name</v-list-item-title>
                <v-list-item-subtitle>{{ doctor.firstName }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Last Name</v-list-item-title>
                <v-list-item-subtitle>{{ doctor.lastName }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ doctor.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Phone Number</v-list-item-title>
                <v-list-item-subtitle>{{ doctor.phoneNumber }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-divider />
    <v-card-actions class="py-5 px-5">
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
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

  props: {
    doctor: {
      type: Object,
      required: true
    },
    toggle: {
      type: Function,
      required: false
    }
  },

  data() {
    return {

    }
  }

}
</script>

<style>

</style>