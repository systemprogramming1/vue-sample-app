<template>
  <v-card
    class="dst-layerlist"
    height="60%"
    v-if="show"
    v-bind:style="{ left: left, top: top }"
  >
    <v-toolbar :color="color" class="" dark>
      <v-icon>{{ icon }}</v-icon>
      <v-toolbar-title class="dst-win-title">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="show = false"
        ><v-icon>close </v-icon></v-app-bar-nav-icon
      >
    </v-toolbar>

    <dst-layerlist />
  </v-card>
</template>

<script>
import LayerList from "./LayerList";

export default {
  name: "dst-layerlist-win",

  components: {
    "dst-layerlist": LayerList,
  },
  props: {
    color: { type: String, required: false, default: "red darken-3" },
    icon: { type: String, required: false, default: "layers" },
    title: { type: String, required: false, default: "Katmanlar" },
    draggable: { type: Boolean, required: false, default: true },
    initPos: { type: Object, required: false },
  },
  data() {
    return {
      moduleName: "dst-layerlist",
      show: false,
      left: this.initPos ? this.initPos.left + "px" : "10px",
      top: this.initPos ? this.initPos.top + "px" : "70px",
    };
  },
};
</script>

<style>
.v-card.dst-layerlist {
  position: absolute;
  z-index: 2;
  display: flex !important;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}

html {
  overflow: hidden !important;
}
</style>
