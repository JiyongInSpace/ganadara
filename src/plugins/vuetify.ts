/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import 'animate.css';
import "vuetify/styles";
import { lightTheme } from "@/themes/light";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'dark',
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    },
  },
});
