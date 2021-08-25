<template>
  <v-sheet class="pa-5">
    <div
      class="d-flex align-center justify-space-between flex-column flex-sm-row"
    >
      <h2>Statistiques des services</h2>
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
    <v-card flat v-if="selectedDepartment != null">
      <v-card-text>
        <v-row>
        <v-col cols="12" md="8">
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                outlined
                append-icon="mdi-calendar"
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              range
              color="primary"
              locale="fr"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            color="secondary"
            block
            elevation="0"
            @click="searchByRange"
            :loading="loader"
            >Search</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
          <!-- Line -->
          <v-col cols="12" md="6">
            <div v-if="searched" class="ml-4">
              <v-subheader class="">Evolution du flux-patientele </v-subheader>
              <v-divider />
              <v-sheet
                class="v-sheet--offset mx-auto mt-10"
                color="primary"
                elevation="3"
                max-width="calc(100% - 32px)"
              >
                <v-sparkline
                  :labels="labels"
                  :value="value"
                  color="white"
                  line-width="2"
                  padding="16"
                ></v-sparkline>
              </v-sheet>
              <div class="ml-4 mt-5">
                <p class="headline secondary--text">Minimum: {{ min }}</p>
                <p class="headline secondary--text">Moyenne: {{ avg }}</p>
                <p class="headline secondary--text">Maximum: {{ max }}</p>
              </div>
            </div>
          </v-col>
          <!-- Graph -->
          <v-col cols="12" md="6">
            <div v-if="searched" class="ml-4">
              <v-subheader class=""
                >Reparition des maladies diagnostiquees
              </v-subheader>
              <v-divider />
              <PieChart :chartData="pieData" :options="options" class="mt-10" />
            </div>
          </v-col>
        </v-row>
        <v-row class="px-5">
          <v-col cols="12">
            <v-subheader class="">D'autres maladies </v-subheader>
            <v-divider />
          </v-col>
          <v-col class="ml-4" cols="12" sm="4" v-for="(item, i) in dataObject.chart" :key="i">
            {{ item.diagnostic }} - {{ item.counter }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import PieChart from "@/components/hospital/department/PieChart.vue";

export default {

  components: { PieChart },

  data() {
    return {
      departmentItems: [],
      selectedDepartment: null,
      
      // date
      searched: false,
      dates: [],
      dateMenu: false,
      loader: false,
      // end date

      //
      dataObject: {},

      // sparkline
      labels: [],
      value: [],
      min: "",
      max: "",
      avg: "",

      // chart
      chartLabels: [],
      chartData: [],
      pieData: {},
      options: {},
    }
  },


  watch: {
    selectedDepartment(val) {
      this.patients = []
      let id = val.split('D')
      this.onDepartmentChange(id[1])
    }
  },

  computed: {

    dateRangeText() {
      return this.dates.join(" ~ ");
    },

    ...mapState({
      departments: (state) => state.department.departments,
    }),
  },

  created() {
    setTimeout(() => {
      let start = moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD");
      let end = moment().format("YYYY-MM-DD");

      this.dates.push(start);
      this.dates.push(end);
    }, 500);
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



    async searchByRange() {

      const id = this.selectedDepartment.split('D')[1]
      const start = this.dates[0]
      const end = this.dates[1]

      this.dataObject = await this.getAppointmentRange({ id: id, start: start, end: end})

      this.dataObject.sparkline.forEach((val, key) => {
        let tmpVar = val.appointmentDate.split('-')
        this.labels.push(`${tmpVar[1]}-${tmpVar[2]}`)
        this.value.push(val.counter)
      })

      this.dataObject.chart.forEach((val, key) => {
        this.chartLabels.push(val.diagnostic)
        this.chartData.push(val.counter)
      })

      this.gettingMinMax(this.value)
      this.setupChart()
      this.searched = true
    },

    gettingMinMax(payload) {
      this.avg = payload.reduce((a, v, i) => (a * i + v) / (i + 1)).toFixed(2);
      this.min = Math.min(...payload);
      this.max = Math.max(...payload);
    },

    async onDepartmentChange() {
      
    },

    setupChart() {
      (this.pieData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#f87979", "#333", "#6AC4AE"],
            data: this.chartData,
          },
        ],
      }),
        (this.options = {
          legend: {
            position: "bottom",
            padding: 5,
          },
          responsive: true,
          maintainAspectRatio: false,
        });
    },

    ...mapActions({
      getDepartments: "department/getDepartments",
      getAppointmentRange: "appointment/getAppointmentRange"
    }),
  }

}
</script>

<style>

</style>