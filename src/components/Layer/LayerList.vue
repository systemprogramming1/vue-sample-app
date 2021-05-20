<template>
  <div id="app">
    <v-app id="inspire">
      <v-treeview
        selectable
        v-model="selection"
        selected-color="blue"
        :items="items"
        hoverable
        item-key="layerName"
        item-text="layerTitle"
        @update:active="updateForm"
      ></v-treeview>
    </v-app>
  </div>
</template>

<script>
import { mapableMixin } from "../../mixin/mapableMixin";
import TileWmsSource from "ol/source/TileWMS";
import LayerUtil from '../../util/layerUtil';
import Vue from 'vue';

export default {
  name: "wgu-layerlist",
  mixins: [mapableMixin],
  props: {},
  data() {
    return {
      items: [],
      selection: []
    };
  },
  watch: {
    selection(newValue) {
      this.updateForm(newValue);
    },
  },
  methods: {
    onMapBound() {
      this.createLayerItems();
      this.items.forEach((element) => {
        element.children.forEach((_layer) => {
          if (_layer.isOpen) {
            this.selection.push(_layer.layerName);
          }
        });
      });
    },

    updateForm(selection) {
      debugger;
      var layerList = this.$store.getters.getUserLayer;
      var _districtcodes = this.$store.getters.getUserRegionId;
      if (_districtcodes != null) {
        _districtcodes = _districtcodes.join(",");
      }

      layerList.forEach(function (layer) {
        layer.children.forEach((element) => {
          if (selection.includes(element.layerName)) {
            element.isOpen = true;
          } else {
            element.isOpen = false;
          }
        });
      });
      sessionStorage.setItem("userLayers", JSON.stringify(layerList));
      this.$store.commit("updateLayerInfo");

      for (var i = layerList.length - 1; i >= 0; i--) {
        var _group = layerList[i];
        const _layer = LayerUtil.getLayerByTitle(_group.layerName, this.map); 

        if (_group.children.length > 0 && _layer != undefined) {
        
          var _openLayers = [];
          var _cqlFilter = [];

          for (var m = _group.children.length - 1; m >= 0; m--) {
            if (_group.children[m].isOpen) {
              _openLayers.push(
                _group.children[m].workspaceName +
                  ":" +
                  _group.children[m].layerName
              );
              _cqlFilter.push(" auth_region_id IN(" + _districtcodes + ")");
            }
          }
          if (_openLayers.length > 0) {
            _layer.setSource(
              new TileWmsSource({
                crossOrigin: "Anonymous",
                url: Vue.prototype.$appConfig.geoserver_Url,
                params: {
                  LAYERS: _openLayers.join(","),
                  FORMAT: "image/png8",
                  TILED: true,
                  CQL_FILTER: _cqlFilter.join(";"),
                },
                projection: "EPSG:3857",
              })
            );
          } else {
            _layer.setSource(null);
          }
        } else {
          _layer.setSource(null);
        }
      }
    },
    createLayerItems() {
      this.items = this.$store.getters.getUserLayer;
    },
  },
};
</script>

<style>
.wgu-layer-viz-cb {
  width: 45px;
}
</style>
