<template>
  <v-app-bar
   :collapse="!collapseOnScroll"
   :collapse-on-scroll="collapseOnScroll"
    absolute
    color="#fcb69f"
    dark
    shrink-on-scroll
    dense
    :src="headerLogo"
    scroll-target="#scrolling-techniques-2" 
  >
   <v-switch
          v-model="collapseOnScroll"
          color="white"
          hide-details
        ></v-switch>
    <v-toolbar-title>
      <img :src="titleLogo" class="logoHeader"
    /></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu v-if="menuButtons.length" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon dark v-on="on">
          <v-icon medium>menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <template v-for="(tbButton, index) in menuButtons">
          <v-list-item
            :is="tbButton.type"
            :key="index"
            :icon="tbButton.icon"
            :text="tbButton.text"
            :color="color"
          >
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <template v-for="(tbButton, index) in tbButtons">
      <component
        :is="tbButton.type"
        :key="index"
        :icon="tbButton.icon"
        :text="tbButton.text"
        :color="color"
        :dark="tbButton.dark"
      />
    </template>

    <slot name="dst-tb-after-auto-buttons"></slot>

    <slot name="dst-tb-end"></slot>
  </v-app-bar>
</template>
<script>
import Vue from "vue";
import HelpWin from "../ToolButtons/ToggleButton";
import ZoomToMaxExtentButton from "../Map/ZoomToMaxExtentButton";
import LayerListToggleButton from "../Layer/ToggleButton";
import InfoClickButton from "../LayerInfo/ToggleButton";
import LogoutToggleButton from "../Login/Logout";
export default {
  name: "dst-app-header",
  components: {
    "dst-helpwin-btn": HelpWin,
    "dst-zoomtomaxextent-btn": ZoomToMaxExtentButton,
    "dst-layerlist-btn": LayerListToggleButton,
    "dst-logout-btn": LogoutToggleButton,
    "dst-infoclick-btn": InfoClickButton,
  },
  props: {
    color: { type: String, required: false, default: "red darken-3" },
  },
  data() {
    return {
      title: this.$appConfig.title,
      menuButtons: this.getModuleButtonData() || [],
      tbButtons: this.getToolbarButtons() || [],
      headerLogo: this.$appConfig.headerImage,
      titleLogo: this.$appConfig.titleImage,
     collapseOnScroll: true,
    };
  },
  methods: {
    getModuleButtonData() {
      const appConfig = Vue.prototype.$appConfig || {};
      const modulesConfs = appConfig.modules || {};
      let moduleWins = [];
      for (const key of Object.keys(modulesConfs)) {
        const moduleOpts = appConfig.modules[key];
        if (moduleOpts.target === "menu") {
          moduleWins.push({
            type: key + "-btn",
            target: moduleOpts.target,
          });
        }
      }
      return moduleWins;
    },

    getToolbarButtons() {
      const appConfig = Vue.prototype.$appConfig || {};
      const modulesConfs = appConfig.modules || {};
      let moduleWins = [];
      for (const key of Object.keys(modulesConfs)) {
        const moduleOpts = appConfig.modules[key];
        if (moduleOpts.target === "toolbar") {
          moduleWins.push({
            type: key + "-btn",
            target: moduleOpts.target,
            dark: moduleOpts.darkLayout,
          });
        }
      }
      return moduleWins;
    },
  },
};
</script>

<style>

</style>
