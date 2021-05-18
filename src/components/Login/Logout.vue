<template>

  <v-btn icon :dark="dark" @click="onClick">
    <v-icon medium>{{icon}}</v-icon>
    {{text}}
  </v-btn>

</template>

<script>

export default {
  name: 'wgu-logout-btn',
  props: {
    icon: {type: String, required: false, default: 'logout'},
    text: {type: String, required: false, default: ''},
    dark: {type: Boolean, required: false, default: false}
  },
  methods: {
    onClick () {
      this.$store.dispatch("logOff");
    }
  }
}

</script>
