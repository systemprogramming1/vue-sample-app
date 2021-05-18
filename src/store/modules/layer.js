import Vue from 'vue';
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import TileWmsSource from "ol/source/TileWMS";
import {store} from "../store";
const state = {
   layerList:[]
}

const getters = {
    getLayerInfo(state) {
        return state.layerList;
    }
}

const mutations = {
    updateLayerInfo(state) {
      this._layerList = [];
      
      var raster = new TileLayer({
        source: new OSM(),
      });
      this._layerList.push(raster);

      var layerList = store.getters.getUserLayer;
      var authList =store.getters.getUserRegionId;
      if(authList!=null){
        authList.join(",");
      }
   
      layerList.forEach((element) => {
        var _openLayers = [];
        var _cqlFilter = [];
        element.children.forEach((_layer) => {
          if (_layer.isOpen) {
            _openLayers.push(_layer.workspaceName + ":" + _layer.layerName);
            _cqlFilter.push(" auth_region_id IN(" + authList+ ")");
          }
        });

        const layer = new TileLayer({
          name: "WMS",
          title: element.layerName,
          crossOrigin: "Anonymous",
          source: new TileWmsSource({
            url: Vue.prototype.$appConfig.geoserver_Url,
            params: {
              LAYERS: _openLayers.join(","),
              TILED: false,
              FORMAT: "image/png8",
              CQL_FILTER: _cqlFilter.join(";"),
            },
            projection: "EPSG:3857",
          }),
        });
        this._layerList.push(layer);
      });
        state.layerList = this._layerList;
    },
 
}

const actions = {
  
}

export default {
    state,
    mutations,
    getters,
    actions

}
