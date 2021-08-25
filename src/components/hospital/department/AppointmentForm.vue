<template>
  <v-card color="grey lighten-5" elevation="0" outlined class="">
    <div class="">
      <v-card-title class="d-flex justify-space-between pa-5">
        <div class="secondary--text headline">Rendez-vous</div>
        <v-icon color="secondary" class="d-none d-sm-flex" @click="toggle()"
          >mdi-close-thick</v-icon
        >
      </v-card-title>
    </div>
    <v-divider />
    <v-card-text style="height: auto">
        <v-card color="grey lighten-5" elevation="0">
          <v-card-text style="height: auto">
            <v-row class="pt-5" no-gutters>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Matricule patient</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-text-field
                  outlined
                  dense
                  disabled
                  v-model="patient.customId"
                ></v-text-field>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Prénom</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-text-field
                  outlined
                  dense
                  disabled
                  v-model="patient.firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Nom</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-text-field
                  outlined
                  dense
                  disabled
                  v-model="patient.lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Date de rdv</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
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
                      v-model="date"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="primary"
                    v-model="date"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Heure de rendez-vous</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-select
                  outlined
                  dense
                  :items="timeSelect"
                  v-model="time"
                ></v-select>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Motif de consultation</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-select
                  outlined
                  :items="motiveItems"
                  dense
                  v-model="appointment.motive"
                ></v-select>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Type de rendez-vous</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-select
                  outlined
                  dense
                  :items="typeSelect"
                  v-model="appointment.type"
                ></v-select>
              </v-col>
              <v-col cols="12" :sm="labelColumns">
                <v-subheader :class="labelClass" class="body-1"
                  >Informations pré-consultation</v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="fieldColumns">
                <v-text-field
                  outlined
                  dense
                  v-model="appointment.preInfo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
    </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row no-gutters justify-sm="space-between">
          <v-col cols="12" sm="auto" order="2" order-sm="1">
            <v-btn
              :block="$vuetify.breakpoint.xs ? true : false"
              color="grey"
              class="mt-5 mt-sm-0"
              elevation="0"
              dark
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
              @click="save"
            >
              Confirm
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
  </v-card>
</template>

<script>
import { mask } from "vue-the-mask";
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {

  directives: { mask },

  props: {
    toggle: {
      type: Function,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false
    },
    department: {
      type: String,
      required: true
    },
    patient: {
      type: Object,
      required: true
    },
    doctor: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      // CLASSES AND STUFF
      labelColumns: 5,
      fieldColumns: 7,
      labelClass: "pa-0",
      loader: false,

      motiveItems: [],
      appointment: {
        motive: "",
        type: "",
        startDateTime: "",
        preInfo: "",
      },
      dateMenu: false,
      date: "",
      time: "",
      timeSelect: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
      ],
      typeSelect: ["Office", "Video", "Home"],
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    };
  },

  created() {
    if(this.doctor.title == 'Psychiatre') {
      this.motiveItems = [
        'Boulimie',
        'Dépression nerveuse',
        'Enurésie',
        'Phobie',
        'Troubles obssessionnels compulsifs',
        'Nervosité',
        'Angoisse',
        'Surmenage',
        'Baby blues',
        'Burn out'
      ]
    } else if(this.doctor.title == 'Cardiologue') {
      this.motiveItems = [
        'Angine de poitrine',
        'Artérite',
        'Arythmie cardiaque',
        'Palpitations',
        'Phlébite',
        'Varice'
      ]
    } else if(this.doctor.title == 'Chirurgie thoracique et cardiovasculaire') {
      this.motiveItems = [
        'Consultation post-opératoire'
      ]
    } else if(this.doctor.title == 'Chirurgien dentiste') {
      this.motiveItems = [
        'Blanchiment dentaire',
        'Détartrage',
        'Consultation post-opératoire'
      ]
    } else if(this.doctor.title == 'Dermatologue') {
      this.motiveItems = [
        'Eruption cutanée',
        'Acné',
        'Eczéma',
        'Cellulite',
        'Dermatose',
        'Gale',
        'Impétigo',
        'Infection cutanée',
        'Intertrigo',
        'Démangaisons cutanés ',
        'Prurit',
        'Séborhée',
        'Teigne',
        'Urticaire',
        'Vergétures',
        'Verrues',
        'Zona',
      ]
    } else if(this.doctor.title == 'Endocrinologue') {
      this.motiveItems = [
        'Obésité',
        'Diabète',
        'Thyroïde',
        'Diabète gestationnel',
        'Cholestérol',
        'HTA sencondaire',
        'Troubles du choléstérol',
        'Hyperthyroïdie',
        'Hypothyroïdie'
      ]
    } else if(this.doctor.title == 'Généraliste') {
      this.motiveItems = [
        'Douleur abdominale',
        "Douleur à l'oreille",
        'Mal de gorge',
        'Ecoulement nasal',
        'Nez bouché',
        'Courbatures',
        'Vertiges',
        'Céphalées',
        'Fièvre',
        'Etat grippal',
        'Acidité gastrique',
        'Allergie',
        'Abcès',
        'Angine',
        'Anorexie',
        'Asthénie physique',
        'Troubles digestifs',
        'Ballonnements',
        "Brulûres d'estomac",
        'Brulûre',
        'Constipation',
        'Contusion',
        'Crampes',
        'Dyspepsie',
        'Escarres',
        'Fatigue chronique',
        'Fièvre',
        'Furoncle',
        'Grippe',
        'Herpès',
        'Hypertension artérielle',
        'Hypotension',
        'Insomnie',
        'Mal du transport',
        'Myalgie',
        'Mycose',
        'Nausées',
        'Paludisme',
        "Rétention d'eau",
        'Rhume',
        'Sclérose en plaques',
        'SIDA',
        'Spasme',
        'Spasmophilie',
        'Stress',
        'Thrombose',
        'Ulcère gastroduodénal',
        'Vomissements'
      ]
    } else if(this.doctor.title == 'Gynécologue') {
      this.motiveItems = [
        'Troubles menstruels',
        'Douleur pelvienne',
        'Pertes blanches(leucorrhées)'
      ]
    } else if(this.doctor.title == 'Gynécologue-obstétricien') {
      this.motiveItems = [
        'Consultation post-opératoire',
        'Aménorhée',
        'Candidose génitale',
        'Dysménorhée',
        'Frigidité',
        'Vaginite'
      ]
    } else if(this.doctor.title == 'Hématologue') {
      this.motiveItems = [
        'Drépanocytose'
      ]
    } else if(this.doctor.title == 'Hépato-gastro-entérologue') {
      this.motiveItems = [
        'Aérocolie',
        'Aérophagie',
        'Calculs biliaires',
        'Colique',
        'Colite',
        'Reflux gastrique',
        'Iléite',
        'Gastro-entérite',
        'Hémorroïdes',
        'Hépatite',
        'Indigestion',
        'Vers intestinaux'
      ]
    } else if(this.doctor.title == 'Néphrologue') {
      this.motiveItems = [
        'Calculs rénaux',
        'Néphrite'
      ]
    } else if(this.doctor.title == 'Neurologue') {
      this.motiveItems = [
        'Céphalées et Migraine',
        'Epilepsie',
        'Troubles du sommeil',
        'Electroneuromyogramme (ENMG)',
        'Névralgie',
        'Névrite'
      ]
    } else if(this.doctor.title == 'Oncologue') {
      this.motiveItems = [
        'Cancer'
      ]
    } else if(this.doctor.title == 'Ophtalmologue') {
      this.motiveItems = [
        "Fond d'œil",
        'Consultation post-opératoire',
        'Flou visuel',
        'Conjonctivite',
        'Orgelet'
      ]
    } else if(this.doctor.title == 'Orthopédiste-traumatologue') {
      this.motiveItems = [
        "Consultation post-opératoire",
        'Arthrose',
        'Traumatisme',
        'Entorse',
        'Foulure',
        'Etirement ligamentaire',
        'Lumbago',
        'Sciatique',
        'Tendinite'
      ]
    } else if(this.doctor.title == 'Oto-rhino-laryngologue') {
      this.motiveItems = [
        "Douleur à l'oreille",
        'Vertiges chroniques',
        'Acouphène',
        'Amygdalite',
        'Otite',
        'Gingivite',
        'Laryngite',
        'Pharyngite',
        'Rhinite',
        'Sinusite',
        'Surdité'
      ]
    } else if(this.doctor.title == 'Pédiatre') {
      this.motiveItems = [
        "Vaccination",
        'Troubles du comportement',
        'Retard de développement'
      ]
    } else if(this.doctor.title == 'Pneumologue') {
      this.motiveItems = [
        "Bronchite",
        'Pleurésie',
        'Pneumonie',
        'Toux chronique',
        'Asthme '
      ]
    } else if(this.doctor.title == 'Rhumatologue') {
      this.motiveItems = [
        "Arthrite",
        'Goutte',
        'Ostéoporose',
        'Polyarthrite rhumatoïde',
        'Rhumatisme'
      ]
    } else if(this.doctor.title == 'Stomatologue') {
      this.motiveItems = [
        "Aphtes récidivants"
      ]
    } else if(this.doctor.title == 'Urologue') {
      this.motiveItems = [
        "Rétention chronique d'urine",
        "Rétention aigue d'urine",
        "Saignement dans les urines (hématurie)",
        'Consultation post-opératoire',
        'Cystite',
        'Impuissance sexuelle',
        'Infection urinaire',
        'Prostatisme'
      ]
    } else {
      this.motiveItems = [
        "Consultation post-opératoire"
      ]
    }
    
  },

  computed: {
    ...mapState({
      loggedInUser: (state) => state.auth.loggedInUser,
    }),
  },

  watch: {

  },

  methods: {

    ...mapActions({
      addAppointment: 'appointment/addAppointment'
    }),

    confirm() {
      console.log(this.doctor)
      console.log(this.patient)
      console.log(this.department)
      console.log(`${this.loggedInUser.customId} - ${this.loggedInUser.firstName}`)
    },

    async save() {
      this.loader = true;

      let time = moment(this.date + " " + this.time);
      let startDate = time.format("YYYY-MM-DD HH:mm");
      time.add(30, "minutes");
      let endDate = time.format("YYYY-MM-DD HH:mm");

      let depId = this.department.split('D')
      let body = {
        patientId: `${this.patient.id}`,
        doctorId: `${this.doctor.id}`,
        departmentId: `${depId[1]}`,
        doctorName: `${this.doctor.fullName}`,
        doctorTitle: `${this.doctor.title}`,
        patientName: `${this.patient.firstName} ${this.patient.lastName}`,
        date: `${startDate.split(' ')[0]}`,
        startDateTime: `${startDate}`,
        endDateTime: `${endDate}`,
        motive: `${this.appointment.motive}`,
        preInfo: `${this.appointment.preInfo}`,
        type: `${this.appointment.type}`,
        status: `Scheduled`,
        createdBy: `Hospital Head - ${this.loggedInUser.firstName} ${this.loggedInUser.lastName} (${this.loggedInUser.customId})`
      }

      const appointment = await this.addAppointment(body)

      this.loader = false
      this.toggle()
    }

  },
};
</script>

<style></style>
