<template>
  <div id="map"></div>
</template>
<script>
import Vue from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { AppEventBus } from "../../AppEventBus";
import ZoomSlider from "ol/control/ZoomSlider";
import ScaleLine from "ol/control/ScaleLine";

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
      map
        .getControls()
        .extend([new ScaleLine(), new ScaleLine(), new ZoomSlider()]);
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
#map .ol-scale-line {
    background: rgba(0,60,136,0.3);
    border-radius: 4px;
    bottom: 33px;
    left: 8px;
    padding: 2px;
    position: absolute;
}
#map .ol-zoom .ol-zoom-out {
  margin-top: 200px;
}
#map .ol-zoomslider {
  background-color: #ece5d7;
  top: 14em;
}

#map .ol-zoom {
  top: 12.5em;
  left: 0.5em;
}

#map .ol-control button {
  bottom: 25px;
  display: block;
  padding: 0;
  color: white;
  font-size: 1.14em;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  height: 1.375em;
  width: 1.375em;
  line-height: 0.4em;
  background-color: rgba(0, 60, 136, 0.5);
  border: none;
  border-radius: 2px;
}

#map .ol-touch .ol-zoom .ol-zoom-out {
  margin-top: 212px;
}
#map .ol-touch .ol-zoomslider {
  top: 2.75em;
}

#map .ol-zoom-in.ol-has-tooltip:hover [role="tooltip"],
#map .ol-zoom-in.ol-has-tooltip:focus [role="tooltip"] {
  top: 3px;
}

#map .ol-zoom-out.ol-has-tooltip:hover [role="tooltip"],
#map .ol-zoom-out.ol-has-tooltip:focus [role="tooltip"] {
  top: 232px;
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