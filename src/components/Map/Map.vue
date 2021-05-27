<template>
  <div id="map"></div>
</template>
<script>
import Vue from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { AppEventBus } from "../../AppEventBus";

export default {
  mounted() {
    this.initiateMap();
  },
  destroyed() {
    AppEventBus.$emit("ol-map-unmounted", this.map);
  },
  methods: {
    initiateMap() {
      this.$store.commit("updateLayerInfo");
      var _layerList = this.$store.getters.getLayerInfo;
      var map = new Map({
        target: "map",
        layers: _layerList,
        view: new View({
          projection: this.$appConfig.mapProjection,
          zoom: this.$appConfig.mapZoom,
          center: this.$appConfig.mapCenter,
        }),
      });

      Vue.prototype.$map = map;
      AppEventBus.$emit("ol-map-mounted", map);
    },
  },
};
</script>
<style>
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 99%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>