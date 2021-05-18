<template>
  <v-footer :color="color" class="white--text" app>
    <span class="wgu-footer-left" v-html="footerTextLeft"></span>
    <v-spacer></v-spacer>
    <div class="wgu-footer-right">
      <span v-html="footerTextRight"></span>
      <span v-if="showCopyrightYear"
        >&copy; {{ new Date().getFullYear() }}</span
      >
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "wgu-app-footer",
  props: {
    color: { type: String, required: false, default: "red darken-3" },
    footerTextLeft: {
      type: String,
      required: false,
      default:
        'Powered by Sudabis',
    },
    footerTextRight: { type: String, required: false, default: "BASARSOFT" },
    showCopyrightYear: { type: Boolean, required: false, default: true },
  },
};
</script>
<style>
@media only screen and (max-width: 600px) {
  .v-footer {
    font-size: 14px;
  }
}
.v-application a {
  color: inherit;
}
</style>
