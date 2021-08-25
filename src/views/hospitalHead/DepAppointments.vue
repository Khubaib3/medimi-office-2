<template>
  <v-sheet class="pa-5">
    <div class="d-flex align-center justify-space-between flex-column flex-sm-row">
      <h2>Agendas des services</h2>
      <div style="width: 50%">
      <v-select
        :items="departmentItems"
        v-model="selectedDepartment"
        outlined
        hide-details
        dense
      />
      </div>
    </div>
    <v-divider class="mt-5"></v-divider>
    <v-card flat v-if="selectedDepartment != null">
      <v-card-text class="d-flex flex-column flex-sm-column flex-md-row align-center justify-space-between flex-row mb-3">
        <div class="left order-2 order-md-1 mb-2 mb-md-0">
          <v-btn
            text
            small
            outlined
            class="mr-2"
            color="grey darken-2"
            @click.stop="prev"
          >
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
            text
            small
            outlined
            color="grey darken-2"
            class="mr-2"
            @click.stop="next"
          >
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-btn
            outlined
            small
            text
            class="mr-4"
            color="grey darken-2"
            @click.stop="setToday"
          >
            Today
          </v-btn>
        </div>
        <div class="middle order-1 order-md-2 mb-2 mb-md-0">
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </div>
        <div class="right order-3 order-md-3 mb-2 mb-md-0">
          <v-btn
            text
            small
            outlined
            color="grey darken-2"
            class="mr-2"
            @click.stop="calendarType = 'month'"
          >
            Month
          </v-btn>
          <v-btn
            text
            small
            outlined
            color="grey darken-2"
            class="mr-2"
            @click.stop="calendarType = 'week'"
          >
            Week
          </v-btn>
          <v-btn
            text
            small
            outlined
            color="grey darken-2"
            @click.stop="calendarType = 'day'"
          >
            Day
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-sheet class="calendar-sheet" style="height: 65vh" v-if="selectedDepartment != null">
      <v-btn
        @click.stop="toggleNewDialog"
        color="#38957F"
        dark
        absolute
        bottom
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-calendar
        ref="calendar"
        v-model="focus"
        :locale="lang"
        :events="appointments"
        :interval-format="intervalFormat"
        @click:event="fireAppointment"
        :short-weekdays="false"
        color="primary"
        :type="calendarType"
      >
      </v-calendar>
    </v-sheet>
    <v-dialog v-model="newDialog" width="720" persistent scrollable>
      <pre-appointment :edit="formType" :department="selectedDepartment" :toggle="toggleNewDialog" :openNewAppointment="openNewAppointment" />
    </v-dialog>
    <v-dialog v-model="newAppDialog" width="720" persistent scrollable>
      <appointment-form :edit="formType" :patient="selectedPatient" :doctor="selectedDoctor" :department="selectedDepartment" :toggle="toggleNewAppDialog"/>
    </v-dialog>
    <v-dialog v-model="previewAppDialog" persistent scrollable>
      <preview-appointment :id="selectedId" :toggle="togglePreviewAppDialog"/>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from 'moment'
import PreAppointment from '../../components/hospital/department/PreAppointment.vue';
import AppointmentForm from '../../components/hospital/department/AppointmentForm.vue';
import PreviewAppointment from '../../components/hospital/department/PreviewAppointment.vue';
export default {

  components: { PreAppointment, AppointmentForm, PreviewAppointment },

  data() {
    return {
      departmentItems: [],
      selectedDepartment: null,
      // Calendar
      focus: "",
      calendarType: "week",
      lang: "fr",
      appointments: [],

      // appointment
      newDialog: false,
      newAppDialog: false,
      previewAppDialog: false,
      formType: false,
      selectedDoctor: {},
      selectedPatient: {},

      selectedId: null,
      
    };
  },

  watch: {
    selectedDepartment(val) {
      this.appointments = []
      let id = val.split('D')
      this.getAppointments(id[1])
    }
  },

  computed: {
    ...mapState({
      departments: (state) => state.department.departments
    })
  },

  async mounted() {
    await this.getDepartments();
    this.departments.forEach((value, key) => {
      this.departmentItems.push(value.customId)
    })

    // Calendar
    if(this.selectedDepartment != null) {
      this.$refs.calendar.checkChange();
      setTimeout(() => {
        this.$refs.calendar.move(1);
      }, 10);
      this.$refs.calendar.move(-1);

    }
    
  },

  methods: {

    fireAppointment({ event }) {
      this.selectedId = event.id
      this.togglePreviewAppDialog()
    },

    openNewAppointment(patient, doctor) {
      this.selectedPatient = patient
      this.selectedDoctor = doctor
      this.toggleNewDialog()
      this.toggleNewAppDialog()
    },

    async getAppointments(id) {
      let appointments = await this.getAppointmentsByDepartment({ id: id })
      for(let i = 0; i < appointments.length; i++) {
        this.appointments.push({
          id: `${appointments[i].id}`,
          name: `${appointments[i].patientName} - ${appointments[i].doctorName}`,
          start: appointments[i].startDateTime,
          end: appointments[i].endDateTime
        })
      }
    },

    togglePreviewAppDialog() {
      this.previewAppDialog = !this.previewAppDialog
    },


    toggleNewAppDialog() {
      this.newAppDialog = !this.newAppDialog
    },

    toggleNewDialog() {
      this.newDialog = !this.newDialog
    },

    intervalFormat(interval) {
      return interval.time;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    ...mapActions({
      getDepartments: "department/getDepartments",
      getAppointmentsByDepartment: "appointment/getAppointmentsByDepartment"
    })
  },
};
</script>

<style></style>
