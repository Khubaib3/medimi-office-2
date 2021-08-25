import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6AC4AE',
        accent: '#F5F5F5',
        secondary: '#254F72',
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent2,
        success: colors.green.accent3
      }
    }
  }
});