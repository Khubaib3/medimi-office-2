<template>
  <v-card>
    <div class="card-header">
      <v-card-title class="d-flex justify-space-between pa-5 text--white">
        <!-- <div v-if="formType === 'New'">Create New Company</div> -->
        <!-- <div v-else>Edit Company</div> -->
        <div class="white--text" v-if="edit">Edit Service</div>
        <div class="white--text" v-else>New Service</div>
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
            <v-col cols="12" sm="5">
              <v-subheader class="pa-0 subtitle-1 font-weight-bold"
                >Name</v-subheader
              >
            </v-col>
            <v-col cols="12" sm="7">
              <v-text-field
                outlined
                dense
                v-model="department.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <v-subheader class="pa-0 subtitle-1 font-weight-bold"
                >Description</v-subheader
              >
            </v-col>
            <v-col cols="12" sm="7">
              <v-text-field
                outlined
                dense
                v-model="department.description"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <v-subheader class="pa-0 subtitle-1 font-weight-bold"
                >Indications</v-subheader
              >
            </v-col>
            <v-col cols="12" sm="7">
              <v-text-field
                outlined
                dense
                v-model="department.indications"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <v-subheader class="pa-0 subtitle-1 font-weight-bold"
                >Phone Number</v-subheader
              >
            </v-col>
            <v-col cols="12" sm="7">
              <v-text-field
                outlined
                dense
                v-model="department.phoneNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <v-subheader class="pa-0 subtitle-1 font-weight-bold"
                >Website</v-subheader
              >
            </v-col>
            <v-col cols="12" sm="7">
              <v-text-field
                outlined
                dense
                v-model="department.website"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="edit">
            <v-col cols="12" sm="5">
              <v-subheader class="pa-0 subtitle-1 font-weight-bold"
                >Status</v-subheader
              >
            </v-col>
            <v-col cols="12" sm="7">
              <v-select
                :items="statusItems"
                v-model="department.status"
                outlined
                hide-details
                dense
              />
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
        <v-col cols="12" sm="auto" order="1" order-sm="1">
          <v-btn
            v-if="edit"
            :block="$vuetify.breakpoint.xs ? true : false"
            color="primary"
            elevation="0"
            dark
            :loading="loader"
            @click="confirmEdit"
          >
            Confirm Edit
          </v-btn>
          <v-btn
            v-else
            :block="$vuetify.breakpoint.xs ? true : false"
            color="primary"
            elevation="0"
            dark
            :loading="loader"
            @click="confirmNew"
          >
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {

  props: {
    department: {
      type: Object,
      required: true
    },
    toggle: {
      type: Function,
      required: false
    },
    edit: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      loader: false,
      statusItems: ['Active', 'Disable']
    }
  },

  methods: {

    ...mapActions({
      createNewDepartment: 'department/createNewDepartment',
      editDepartment: 'department/editDepartment'
    }),


    async confirmNew() {
      this.loader = true
      const newDepartment = await this.createNewDepartment(this.department)
      this.loader = false
      this.toggle()
    },

    async confirmEdit() {
      this.loader = true
      const payload = {
        name: this.department.name,
        description: this.department.description,
        indications: this.department.indications,
        phoneNumber: this.department.phoneNumber,
        website: this.department.website,
        status: this.department.status,
      }
      const newDepartment = await this.editDepartment({ id: this.department.id, data: payload})
      this.loader = false
      this.toggle()
    }
  }

}
</script>

<style>

</style>