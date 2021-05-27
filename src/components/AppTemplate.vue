<template>
  <v-app>
    <dst-app-header
      :color="baseColor"
      :footerTextLeft="footerTextLeft"
      :footerTextRight="footerTextRight"
      :showCopyrightYear="showCopyrightYear"
    />
    <dst-app-map />

    <template v-for="(moduleWin, index) in moduleWins">
      <component
        :is="moduleWin.type" :key="index" :ref="moduleWin.type"
        :color="baseColor"
        :draggable="moduleWin.draggable"
        :initPos="moduleWin.initPos"
      />
    </template>


    <dst-app-footer
      :color="baseColor"
      :footerTextLeft="footerTextLeft"
      :footerTextRight="footerTextRight"
      :showCopyrightYear="showCopyrightYear"
    />
  </v-app>
</template>

<script>
import Vue from "vue";
import AppHeader from "./Shared/AppHeader";
import AppFooter from "./Shared/AppFooter";
import OlMap from "./Map/Map";
import { AppEventBus } from '../AppEventBus';
import LayerListWin from '../components/Layer/LayerListWin'
import LayerInfoWin from '../components/LayerInfo/InfoLayerWin'

export default {
  name: "dst-app-tpl",
  components: {
    "dst-app-header": AppHeader,
    "dst-app-footer": AppFooter,
    "dst-app-map": OlMap,
    'dst-layerlist-win': LayerListWin,
    'dst-infoclick-win': LayerInfoWin,
  },
  data() {
    return {
      isEmbedded: false,
      footerTextLeft: Vue.prototype.$appConfig.footerTextLeft,
      footerTextRight: Vue.prototype.$appConfig.footerTextRight,
      showCopyrightYear: Vue.prototype.$appConfig.showCopyrightYear,
      baseColor: Vue.prototype.$appConfig.baseColor,
      moduleWins: this.getModuleWinData(),
    };
  },
  created() {
    this.$store.dispatch("initAuth");
  },
  mounted() {
     const refs = this.$refs;
    let cmpLookup = {};
    for (const key of Object.keys(refs)) {
      cmpLookup[key] = refs[key][0];
    }
    Vue.prototype.cmpLookup = cmpLookup;
    AppEventBus.$emit("app-mounted");
  },
    methods: {
    
      getModuleWinData () {
        const appConfig = Vue.prototype.$appConfig || {};
        const modulesConfs = appConfig.modules || {};
        let moduleWins = [];
        for (const key of Object.keys(modulesConfs)) {
          const moduleOpts = appConfig.modules[key];
          if (moduleOpts.win === true) {
            moduleWins.push({
              type: key + '-win',
              draggable: moduleOpts.draggable,
              initPos: moduleOpts.initPos
            });
          }
        }
        return moduleWins;
      }
    }
};
</script>
