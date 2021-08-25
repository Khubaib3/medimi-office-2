<template>
  <v-sheet class="pa-5">
    <div>
      <hospital-details :hospital="hospital" />
    </div>
  </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import HospitalDetails from '../../components/hospital/HospitalDetails.vue';

export default {
  components: { HospitalDetails },
  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      hospital: (state) => state.hospital.hospital,
    }),
  },

};
</script>

<style></style>
