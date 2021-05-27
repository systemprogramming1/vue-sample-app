import {store} from "../store/store";
 const LayerUtil = {
    /**
     * Returns a set of map layers which matches the given key value pair.
     *
     * @param {String} key - Key to filter layers
     * @param {Object} value - Value to filter layers
     * @param  {ol.Map} olMap  The OL map to search in
     * @return {ol.layer.Base[]} Array of matching layers
     */
    getLayersBy (key, value, olMap) {
      if (!olMap) {
        return [];
      }
  
      let layerMatches = [];
      olMap.getLayers().forEach(function (layer) {
        if (layer.get(key) === value) {
          layerMatches.push(layer);
        }
      });
  
      return layerMatches;
    },
  
    /**
     * Returns a map layer with the given LID (Layer ID)
     *
     * @param  {String} lid    The LID of the layer to query
     * @param  {ol.Map} olMap  The OL map to search in
     * @return {ol.layer.Base} The OL layer instance or undefined
     */
    getLayerByTitle (lid, olMap) {
      return LayerUtil.getLayersBy('title', lid, olMap)[0];
    },


   GetLayerTitle(_layerName) {
    var layerList = store.getters.getUserLayer;
      var result = '';
      for (var i = 0; i < layerList.length; i++) {
          var _group = layerList[i];
          for (var m = 0; m < _group.children.length; m++) {
              if (_group.children[m].layerName == _layerName) {
                  result = _group.children[m].layerTitle;
              }
          }
      }
      return result;
  },


  
    /**
     * Zooms to the given layer's extent.
     * Will only work if the layer has kind of vector source.
     *
     * @param  {ol.layer.Base} vecLayer OL vector layer
     * @param  {ol.Map} olMap           The map to perform the zoom on
     */
    zoomToLayerExtent (vecLayer, olMap) {
      if (!vecLayer || !vecLayer.getSource().getExtent || !olMap) {
        return;
      }
      const extent = vecLayer.getSource().getExtent();
      olMap.getView().fit(extent);
    }
  }
  
  export default LayerUtil;
  