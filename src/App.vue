<template>
  <v-app style="background-color: white">
    <v-main>
      <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),

  async created() {
  }
};
</script>

<style>

.card-header {
  background-color: #6AC4AE;
}

.no-background-hover::before {
  background-color: transparent !important;
}
 
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
    
    
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .2s ease;
}
    
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

</style>
