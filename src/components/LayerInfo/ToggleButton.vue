<template>

  <v-btn icon :dark="dark" @click="toggleUi">
    <v-icon medium>{{icon}}</v-icon>
    {{text}}
  </v-btn>

</template>

<script>
import Vue from 'vue'
import { WguEventBus } from '../../AppEventBus'

export default {
  name: 'dst-infoclick-btn',
  props: {
    icon: {type: String, required: false, default: 'info'},
    text: {type: String, required: false, default: ''},
    dark: {type: Boolean, required: false, default: false}
  },
  data: function () {
    return {
      moduleName: 'dst-infoclick'
    }
  },
  created () {
    var me = this;
   
  },
  methods: {
    toggleUi () {
      // TODO move to a father class
      this.win.show = !this.win.show;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
