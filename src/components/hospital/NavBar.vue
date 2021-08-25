<template>
  <div>
    <v-navigation-drawer v-model="drawer" app color="secondary" dark width="300">
      <!-- Navigation Drawer Header -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title d-flex justify-center">
            <v-img
              src="../../assets/images/medimi-logo.png"
              min-height="70"
              max-width="70"
              contain
            ></v-img>
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- Navigation Drawer Header END -->
      <v-divider class="my-2"></v-divider>
      <v-list dense>
        <!-- ========= Appointment ========= -->
        <v-list-item link :to="`/hospital/my`">
          <v-list-item-action>
            <v-icon>mdi-hospital-building</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mon hôpital</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- ========= My Profile ========= -->
        <v-list-item link :to="`/hospital/departments`">
          <v-list-item-action>
            <v-icon>mdi-domain-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Services</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- ========= My Patients ========= -->
        <v-list-item link :to="`/hospital/departmentStaff`">
          <v-list-item-action>
            <v-icon>mdi-card-account-details-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Personnels des services</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- ========= My Stats ========= -->
        <v-list-item link :to="`/hospital/departmentAppointments`">
          <v-list-item-action>
            <v-icon>mdi-calendar-range-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Agendas des services</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- ========= My Accounting ========= -->
        <v-list-item link :to="`/hospital/patients`">
          <v-list-item-action>
            <v-icon>mdi-clipboard-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Patients des services</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- ========= My Affiliated Hospitals ========= -->
        <!-- <v-list-item link disabled>
          <v-list-item-action>
            <v-icon>mdi-clipboard-list-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mon agenda</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item link :to="`/hospital/statistics`">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Indicateurs statistiques</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link disabled>
          <v-list-item-action>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Comptabilité globale</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- ========= General Settings ========= -->
        <v-list-item link disabled>
          <v-list-item-action>
            <v-icon>mdi-account-cog-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Paramètres généraux</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link disabled>
          <v-list-item-action>
            <v-icon>mdi-license</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Licence d'utilisation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      <!-- </v-list> -->

      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      
        <!-- ========= Tickets ========= -->
        <v-list-item link disabled>
          <v-list-item-action>
            <v-icon>mdi-alert-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tickets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#FFFFFF">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="user.userType == 'hospitalHead'">Dashboard - Chef hôpital</v-toolbar-title>
      <v-toolbar-title v-else>Dashboard - Chef clinic</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{ user.firstName }} {{ user.lastName }}</div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  name: "NavBar",
  data() {
    return {
      drawer: null,
      items: [
        {
          action: 'mdi-file-cog-outline',
          active: false,
          items: [
            { title: "File d'info services rattachés" },
            { title: "File d'informations hopital" },
            { title: "File d'informations globale" },
          ],
          title: 'File d’informations',
        }
      ]
    }
  },
  computed: mapState({
    user: state => state.auth.loggedInUser
  })

}
</script>

<style>
</style>