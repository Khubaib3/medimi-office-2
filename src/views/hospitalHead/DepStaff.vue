<template>
  <v-sheet class="pa-5">
    <div class="d-flex align-center justify-space-between flex-column flex-sm-row">
      <h2>Personnels des services</h2>
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
    <v-card flat class="mt-5" v-if="selectedDepartment != null">
      <v-tabs v-model="tab" centered background-color="primary">
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="headHeaders"
                :items="departmentHeads"
                :loading="headTableLoader"
                loading-text="Loading... Please wait"
                class="mt-10"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon class="mr-2" small @click="openHeadDialog(item.id)">
                    mdi-arrow-expand-all
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="secretaryHeaders"
                :items="secretaries"
                :loading="secretaryTableLoader"
                loading-text="Loading... Please wait"
                class="mt-10"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon class="mr-2" small @click="openSecretaryDialog(item.id)">
                    mdi-arrow-expand-all
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="doctorHeaders"
                :items="doctors"
                :loading="doctorTableLoader"
                loading-text="Loading... Please wait"
                class="mt-10"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon class="mr-2" small @click="openDoctorDialog(item.id)">
                    mdi-arrow-expand-all
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="headDialog" width="720" persistent scrollable>
      <head-comp :head="head" :toggle="toggleHead"/>
    </v-dialog>
    <v-dialog v-model="secretaryDialog" width="720" persistent scrollable>
      <secretary-comp :secretary="secretary" :toggle="toggleSecretary"/>
    </v-dialog>
    <v-dialog v-model="doctorDialog" width="720" persistent scrollable>
      <secretary-comp :doctor="doctor" :toggle="toggleDoctor"/>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HeadComp from '../../components/hospital/department/HeadComp.vue';
import SecretaryComp from '../../components/hospital/department/SecretaryComp.vue';
import DoctorComp from '../../components/hospital/department/DoctorComp.vue';
export default {

  components: { HeadComp, SecretaryComp, DoctorComp },

  data() {
    return {
      departmentItems: [],
      selectedDepartment: null,
      tab: null,
      items: ['Chef de service', 'Secrétaire', 'Doctor'],
      headHeaders: [
        { text: "ID", value: "customId" },
        { text: "Name", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "", value: "actions", sortable: false },
      ],
      secretaryHeaders: [
        { text: "ID", value: "customId" },
        { text: "Name", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "", value: "actions", sortable: false },
      ],
      doctorHeaders: [
        { text: "ID", value: "customId" },
        { text: "Name", value: "fullName" },
        { text: "Title", value: "title" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "", value: "actions", sortable: false },
      ],
      headTableLoader: false,
      secretaryTableLoader: false,
      doctorTableLoader: false,
      headDialog: false,
      secretaryDialog: false,
      doctorDialog: false,
      head: {},
      secretary: {},
      doctor: {}      
    };
  },

  watch: {
    tab(val) {
      if(val == 0) {
        if(this.departmentHeads.length == 0) {
          this.fireDepartmentHeads(val)
        }
      } else if(val == 1) {
        if(this.secretaries.length == 0) {
          this.fireDepartmentSecretaries()
        }
      } else {
        if(this.doctors.length == 0) {
          this.fireDepartmentDoctors()
        }
      }
    },

  },

  computed: {
    ...mapState({
      departments: (state) => state.department.departments,
      departmentHeads: (state) => state.department.departmentHeads,
      secretaries: (state) => state.department.secretaries,
      doctors: (state) => state.department.doctors,
    }),
  },

  async mounted() {
    await this.getDepartments();
    this.departments.forEach((value, key) => {
      this.departmentItems.push(value.customId)
    })
  },

  methods: {

    toggleHead() {
      this.headDialog = !this.headDialog
    },

    toggleSecretary() {
      this.secretaryDialog = !this.secretaryDialog
    },

    toggleDoctor() {
      this.doctorDialog = !this.doctorDialog
    },

    async openHeadDialog(id) {
      this.head = await this.getDepartmentHead({ id: id })
      this.toggleHead()
    },

    async openSecretaryDialog(id) {
      this.secretary = await this.getDepartmentSecretary({ id: id })
      this.toggleSecretary()
    },

    async openDoctorDialog(id) {
      let depId = this.selectedDepartment.split('D')
      this.doctor = await this.getDepartmentDoctor({ departmentId: depId[0], doctorId: id})
      this.toggleDoctor()
    },

    onDepartmentChange() {
      this.tab = 0
      this.fireDepartmentHeads()
    },

    async fireDepartmentHeads() {
      this.headTableLoader = true
      let depId = this.selectedDepartment.split('D')
      await this.getDepartmentHeads(depId[1])
      this.headTableLoader = false
    },

    async fireDepartmentSecretaries() {
      this.secretaryTableLoader = true
      let depId = this.selectedDepartment.split('D')
      await this.getDepartmentSecretaries(depId[1])
      this.secretaryTableLoader = false
    },

    async fireDepartmentDoctors() {
      this.doctorTableLoader = true
      let depId = this.selectedDepartment.split('D')
      await this.getDepartmentDoctors(depId[1])
      this.doctorTableLoader = false
    },


    ...mapActions({
      getDepartments: "department/getDepartments",
      getDepartmentHeads: "department/getDepartmentHeads",
      getDepartmentHead: "department/getDepartmentHead",
      getDepartmentSecretaries: "department/getDepartmentSecretaries",
      getDepartmentSecretary: "department/getDepartmentSecretary",
      getDepartmentDoctors: "department/getDepartmentDoctors",
      getDepartmentDoctor: "department/getDepartmentDoctor",
    }),
  },
};
</script>

<style></style>
