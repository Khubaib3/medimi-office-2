<template>
  <v-card>
    <div class="card-header">
      <v-card-title class="d-flex justify-space-between pa-5 text--white">
        <!-- <div v-if="formType === 'New'">Create New Company</div> -->
        <!-- <div v-else>Edit Company</div> -->
        <div class="white--text" v-if="edit">Edit Rendez-vous</div>
        <div class="white--text" v-else>Rendez-vous</div>
        <v-icon dark class="d-none d-sm-flex" @click="toggle"
          >mdi-close-thick</v-icon
        >
      </v-card-title>
    </div>
    <v-divider />
    <v-card-text style="height: auto">
      <v-row>
        <v-col cols="12" md="6">
          <v-expand-transition>
            <v-card flat elevation="0" v-show="search">
              <v-card-text style="height: auto">
                <div class="d-flex justify-end">
                  <v-btn outlined elevation="0" @click="disableSearch()"
                    >Add New Patient</v-btn
                  >
                </div>
                <v-subheader class="red--text">{{ errorMessage }}</v-subheader>
                <div>
                  <v-text-field
                    v-model="idSearch"
                    label="Search Patient by ID"
                    hint="SN-P00000001"
                    solo
                    @keydown.enter="searching"
                  ></v-text-field>
                </div>
                <v-btn
                  @click.stop="searching"
                  color="primary"
                  block
                  elevation="0"
                  :loading="searchLoader"
                  class="text-capitalize px-5"
                  >Search</v-btn
                >
              </v-card-text>
            </v-card>
          </v-expand-transition>
          <v-expand-transition>
            <v-card flat elevation="0" v-show="newForm">
              <v-card-text style="height: auto">
                <div class="d-flex justify-end">
                  <v-btn outlined elevation="0" @click="disableNew()"
                    >Search Patient</v-btn
                  >
                </div>
                <v-row
                  :no-gutters="$vuetify.breakpoint.xsOnly ? true : false"
                  class="mt-5"
                >
                  <v-col cols="12" :sm="grid.sm" :md="grid.md" :lg="grid.lg">
                    <v-text-field
                      outlined
                      dense
                      label="Prénom"
                      v-model="patient.firstName"
                    />
                  </v-col>
                  <v-col cols="12" :sm="grid.sm" :md="grid.md" :lg="grid.lg">
                    <v-text-field
                      outlined
                      dense
                      label="Nom de famille"
                      v-model="patient.lastName"
                    />
                  </v-col>
                  <v-col cols="12" :sm="grid.sm" :md="grid.md" :lg="grid.lg">
                    <v-select
                      outlined
                      dense
                      :items="sexItems"
                      label="le sexe"
                      v-model="patient.sex"
                    />
                  </v-col>
                  <v-col cols="12" :sm="grid.sm" :md="grid.md" :lg="grid.lg">
                    <v-text-field
                      outlined
                      dense
                      label="Numéro de contact"
                      v-model="patient.phoneNumber"
                    />
                  </v-col>
                  <v-col cols="12" :sm="grid.sm" :md="grid.md" :lg="grid.lg">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="patient.dob"
                          label="Date de naissance"
                          append-icon="mdi-calendar"
                          readonly
                          dense
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="patient.dob"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" :sm="grid.sm" :md="grid.md" :lg="grid.lg">
                    <v-text-field
                      outlined
                      dense
                      label="E-mail"
                      v-model="patient.email"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      dense
                      label="Adresse"
                      v-model="patient.address"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      @click.stop="addNewPatient"
                      color="primary"
                      block
                      elevation="0"
                      :loading="addPatientLoader"
                      class="text-capitalize px-5"
                      >Add</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expand-transition>
          <v-expand-transition v-if="patientFound">
            <v-card elevation="0">
              <v-card-text class="pt-5 px-0">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-subheader class="display-1"
                      >Patient - {{ selectedPatient.customId }}</v-subheader
                    >
                    <v-list-item two-line class="mt-3">
                      <v-list-item-content>
                        <v-list-item-title>First Name</v-list-item-title>
                        <v-list-item-subtitle>{{
                          selectedPatient.firstName
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Last Name</v-list-item-title>
                        <v-list-item-subtitle>{{
                          selectedPatient.lastName
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>DOB</v-list-item-title>
                        <v-list-item-subtitle>{{
                          selectedPatient.dob
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Sex</v-list-item-title>
                        <v-list-item-subtitle>{{
                          selectedPatient.sex
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Phone Number</v-list-item-title>
                        <v-list-item-subtitle>{{
                          selectedPatient.phoneNumber
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </v-col>
        <v-divider vertical class="mt-5"></v-divider>
        <v-col cols="12" md="6">
          <v-select
            class="mt-6"
            outlined
            dense
            :items="doctorItems"
            label="Doctor"
            hide-details
            v-model="selectedDoctor"
            @change="onDoctorSelect()"
          />
          <v-expand-transition v-if="selectedDoctor != null">
            <v-card elevation="0">
              <v-card-text class="">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>First Name</v-list-item-title>
                        <v-list-item-subtitle>{{
                          doctor.firstName
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Last Name</v-list-item-title>
                        <v-list-item-subtitle>{{
                          doctor.lastName
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Title</v-list-item-title>
                        <v-list-item-subtitle>{{
                          doctor.title
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-list-item-subtitle>{{
                          doctor.email
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Phone Number</v-list-item-title>
                        <v-list-item-subtitle>{{
                          doctor.phoneNumber
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </v-col>
      </v-row>
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
            :block="$vuetify.breakpoint.xs ? true : false"
            color="primary"
            elevation="0"
            dark
            :loading="loader"
            @click="confirm"
          >
            Confirm Patient & Doctor
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    toggle: {
      type: Function,
      required: false,
    },
    openNewAppointment: {
      type: Function,
      required: false,
    },
    edit: {
      type: Boolean,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loader: false,
      statusItems: ["Active", "Disable"],

      // Search patient
      searchLoader: false,
      search: true,
      idSearch: "",
      errorMessage: "",

      // patient found
      patientFound: false,
      selectedPatient: {},

      // new patient
      newForm: false,
      addPatientLoader: false,
      patient: {},
      menu: false,
      sexItems: ["Mâle", "Femelle"],
      grid: {
        sm: 12,
        md: 12,
        lg: 6,
      },

      // doctor
      doctorItems: [],
      selectedDoctor: null,
      doctor: {},

      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },

  watch: {},

  computed: {
    ...mapState({
      doctors: (state) => state.department.doctors,
      loggedInUser: (state) => state.auth.loggedInUser,
    }),
  },

  mounted() {
    this.fireDepartmentDoctors();
  },

  methods: {
    async addNewPatient() {
      try {
        this.addPatientLoader = true;
        const body = {
          firstName: this.patient.firstName || "",
          lastName: this.patient.lastName || "",
          email: this.patient.email || "",
          phoneNumber: this.patient.phoneNumber,
          address: this.patient.address,
          dob: this.patient.dob,
          sex: this.patient.sex,
          weight: "",
          height: "",
          bloodGroup: "",
          preConditions: [],
          diseases: [],
          createdBy: "Hospital Head",
          createdById: this.loggedInUser.id,
        };

        this.selectedPatient = await this.addPatientByStaff(body);

        if (!this.selectedPatient)
          return Promise.reject("Error in adding patient");

        console.log(this.selectedPatient);

        this.addPatientLoader = false;
        this.search = false;
        this.newForm = false;
        this.patientFound = true;

        return true;
      } catch (error) {
        this.addPatientLoader = false;
        console.log(error);
        return error;
      }
    },

    confirm() {
      this.openNewAppointment(this.selectedPatient, this.doctor)
    },

    disableSearch() {
      this.search = false;
      this.newForm = true;
    },

    disableNew() {
      this.search = true;
      this.newForm = false;
    },

    onDoctorSelect() {
      if (this.selectedDoctor != null) {
        let id = this.selectedDoctor.split("(");
        let realId = id[1].split(")");
        for (let i = 0; i < this.doctors.length; i++) {
          if (this.doctors[i].customId == realId[0]) {
            let name = this.doctors[i].fullName.split(" ");
            this.doctor = this.doctors[i];
            this.doctor.firstName = name[0];
            this.doctor.lastName = name[1];
          }
        }
      }
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    async fireDepartmentDoctors() {
      let depId = this.department.split("D");
      await this.getDepartmentDoctors(depId[1]);
      for (let i = 0; i < this.doctors.length; i++) {
        let doc = `Dr. ${this.doctors[i].fullName} (${this.doctors[i].customId})`;
        this.doctorItems.push(doc);
      }
    },

    async searching() {
      try {
        this.searchLoader = true
        this.selectedPatient = await this.searchById({ id: this.idSearch });
        if(!this.selectedPatient) {
          this.searchLoader = false
          return this.errorMessage = 'Patient not found!'
        } 
        this.search = false;
        this.newForm = false;
        this.searchLoader = false
        this.patientFound = true;
      } catch (error) {
        this.searchLoader = false
        this.errorMessage = error
        return error
      }
    },

    ...mapActions({
      createNewDepartment: "department/createNewDepartment",
      editDepartment: "department/editDepartment",
      getDepartmentDoctors: "department/getDepartmentDoctors",
      addPatientByStaff: "patient/addPatientByStaff",
      searchById: "patient/searchById",
    }),
  },
};
</script>

<style></style>
