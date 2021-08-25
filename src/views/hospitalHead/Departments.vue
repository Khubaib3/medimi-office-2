<template>
  <v-sheet class="pa-5">
    <div class="d-flex flex-column flex-sm-row align-center">
      <h2>Services</h2>
      <v-divider
        :vertical="$vuetify.breakpoint.smAndUp ? true : false"
        class="mx-0 mx-sm-4"
      />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        class="my-3 my-sm-0 mx-0 mx-sm-3 pt-0"
        :block="$vuetify.breakpoint.xs ? true : false"
        single-line
        hide-details
      />
      <v-btn
        elevation="0"
        color="primary"
        dark
        :block="$vuetify.breakpoint.xs ? true : false"
        class="subtitle-2"
        @click="newDepartment"
      >
        New Service
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="departments"
      :search="search"
      :loading="tableLoader"
      loading-text="Loading... Please wait"
      class="mt-10"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="setupEdit(item)">
          mdi-pencil-box-outline
        </v-icon>
        <v-icon class="mr-2" @click="removeDepartment(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="newDialog" width="720" persistent scrollable>
      <department-form :department="department" :toggle="toggleDialog" :edit="formType"/>
    </v-dialog>
  </v-sheet>
</template>

<script>

import { mapActions, mapState } from "vuex";
import DepartmentForm from '../../components/hospital/department/DepartmentForm.vue';

export default {
  components: { DepartmentForm },

  data() {
    return {
      search: "",
      tableLoader: true,
      newDialog: false,
      formType: false,
      department: {},
      headers: [
        { text: "ID", value: "customId" },
        { text: "Name", value: "name" },
        { text: "Indications", value: "indications" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Website", value: "website" },
        { text: "Status", value: "status" },
        { text: "", value: "actions", sortable: false },
      ],

    };
  },

  computed: {
    ...mapState({
      departments: (state) => state.department.departments,
    }),
  },

  async mounted() {
    await this.getDepartments()
    this.tableLoader = false
  },

  methods: {

    toggleDialog() {
      this.newDialog = !this.newDialog
    },

    newDepartment() {
      const payload = {
        name: '',
        description: '',
        indications: '',
        phoneNumber: '',
        website: ''
      }
      this.department = Object.assign({}, payload)
      this.toggleDialog()
    },

    removeDepartment(id) {
      this.deleteDepartment(id)
    },

    setupEdit(item) {
      this.department = Object.assign({}, item)
      this.formType = true
      this.toggleDialog()
    },

    ...mapActions({
      getDepartments: 'department/getDepartments',
      deleteDepartment: 'department/deleteDepartment'
    })
  }

}
</script>

<style>

</style>