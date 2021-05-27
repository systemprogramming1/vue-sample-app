<template>

  <v-btn icon :dark="dark" @click="toggleUi">
    <v-icon medium>{{icon}}</v-icon>
    {{text}}
  </v-btn>

</template>

<script>

import Vue from 'vue';
import LayerListWin from './LayerListWin'
import { AppEventBus } from '../../AppEventBus'

export default {
  name: 'dst-layerlist-btn',
  components: {
    'dst-layerlist-win': LayerListWin
  },
  props: {
    icon: {type: String, required: false, default: 'layers'},
    text: {type: String, required: false, default: ''},
    dark: {type: Boolean, required: false, default: false}
  },
  data: function () {
    return {
      moduleName: 'dst-layerlist'
    }
  },
  created () {
    var me = this;
    AppEventBus.$on('app-mounted', () => {
      me.win = Vue.prototype.cmpLookup[me.moduleName + '-win'];
    });
    if (!me.win) {
      me.win = Vue.prototype.cmpLookup[me.moduleName + '-win'];
    }
  },
  methods: {
    toggleUi () {
      this.win.show = !this.win.show
    }
  }
};
</script>
