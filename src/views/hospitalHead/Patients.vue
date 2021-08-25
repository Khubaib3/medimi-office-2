<template>
  <v-sheet class="pa-5">
    <div
      class="d-flex align-center justify-space-between flex-column flex-sm-row"
    >
      <h2>Patients des services</h2>
      <div style="width: 50%">
        <v-select
          :items="departmentItems"
          v-model="selectedDepartment"
          outlined
          hide-details
          dense
          @change="onDepartmentChange()"
        />
      </div>
    </div>

    <v-card flat>
      <v-card-text>
        <v-data-table
          :headers="patientHeaders"
          :items="patients"
          :loading="patientTableLoader"
          loading-text="Loading... Please wait"
          class="mt-10"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" small @click="openPatientDialog(item.id)">
              mdi-arrow-expand-all
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      departmentItems: [],
      selectedDepartment: "",

      // table
      patientTableLoader: false,
      patients: [],
      patientHeaders: [
        { text: "ID", value: "customId" },
        { text: "Name", value: "fullName" },
        { text: "DOB", value: "dob" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "", value: "actions", sortable: false },
      ]
    };
  },

  watch: {
    selectedDepartment(val) {
      this.patients = []
      let id = val.split('D')
      this.onDepartmentChange(id[1])
    }
  },

  computed: {
    ...mapState({
      departments: (state) => state.department.departments,
    }),
  },

  async mounted() {
    if (this.departments.length == 0) {
      await this.getDepartments();
      this.departments.forEach((value, key) => {
        this.departmentItems.push(value.customId);
      });
    }
    this.departments.forEach((value, key) => {
      this.departmentItems.push(value.customId);
    });
  },

  

  methods: {

    async onDepartmentChange(id) {
      this.patients = await this.getDepartmentPatients({ id: id })
    },

    openPatientDialog(id) {
      console.log(id)
    },

    ...mapActions({
      getDepartments: "department/getDepartments",
      getDepartmentPatients: "patient/getDepartmentPatients"
    }),
  },
};
</script>

<style></style>
