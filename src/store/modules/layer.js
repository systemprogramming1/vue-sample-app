import Vue from 'vue';
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import TileWmsSource from "ol/source/TileWMS";
import {store} from "../store";
import LayerUtil from "../../util/layerUtil";
import GeoJSON from 'ol/format/GeoJSON'
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
   
      layerList.forEach((_group) => {
        var _openLayers = [];
        var _cqlFilter = [];
        _group.children.forEach((_layer) => {
          if (_layer.isOpen) {
            _openLayers.push(_layer.workspaceName + ":" + _layer.layerName);
            _cqlFilter.push(" auth_region_id IN(" + authList+ ")");
          }
        });

        const layer = new TileLayer({
          name: "WMS",
          title: _group.layerName,
          crossOrigin: "Anonymous",
          source: new TileWmsSource({
            url: Vue.prototype.$appConfig.geoserver_Url,
            params: {
              LAYERS: _openLayers.join(","),
              TILED: false,
              FORMAT: "image/png8",
              CQL_FILTER: _cqlFilter.join(";"),
              TRANSPARENT: true
            },
            projection: "EPSG:3857",
          }),
        });
        this._layerList.push(layer);
      });
        state.layerList = this._layerList;
    },
    getInfo(state){
      debugger;
      var layerList = store.getters.getUserLayer;
      var authList =store.getters.getUserRegionId;

      var vectorFormat = new GeoJSON();
  
          var query_layers = '';
          var _arr = [];
          var _cqlFilter = [];
          for (var i = 0; i <layerList.length; i++) {
              var layerName = layerList[i].layerName;
              if (layerName != 'WEB-TAK') {
                  var _layer =  LayerUtil.getLayerByTitle(layerName,this.map);
  
                  if (_layer.getSource() != null) {
                      _arr.push(_layer.getSource().getParams().LAYERS);
                      if (_layer.getSource().getParams().CQL_FILTER != '') {
                          _cqlFilter.push(_layer.getSource().getParams().CQL_FILTER)
                      }
  
                  }
              }
  
  
          }
          var _arrtemp = _arr;
          _arr = [];
          for (var i = 0; i <layerList.length; i++) {
              if (_arrtemp[i] != '' && _arrtemp[i] != undefined) {
                  _arr.push(_arrtemp[i]);
              }
          }
  
          query_layers = _arr.join(',');
  
  
          if (query_layers.slice(-1) == ',') {
              query_layers = query_layers.slice(0, -1);
          }
          for (var i = 0; i < layerList.length; i++) {
              if ( LayerUtil.getLayerByTitle(layerList[i].layerName,this.map).getSource() != null) {
                  var layersource =  LayerUtil.getLayerByTitle(UserHelper.GetUserLayers()[0].GroupKey,this.map).getSource();
                  break;
              }
          }
  
  
          if (layersource != undefined) {
              var viewResolution = this.map.getView().getResolution();
              if (viewResolution < 0.07899619307811453)
              {
                  viewResolution = 0.07899619307811453;
              }
              var url = layersource.getFeatureInfoUrl(
                  evt.coordinate, viewResolution, 'EPSG:3857',
                  {
                      'INFO_FORMAT': 'application/json',
                      'feature_count': 10000,
                      'LAYERS': query_layers,
                      'QUERY_LAYERS': query_layers,
                      'CQL_FILTER': _cqlFilter.join(';'),
                  });
                  debugger;
  
              if (url) {
                  var xhr = new XMLHttpRequest();
  
                  var url_1 = url.substr(0, url.indexOf('?'));
                  var params = url.substring(url.indexOf('?') + 1);
                  xhr.open('POST', url_1, true);
                  xhr.responseType = 'json';
                  xhr.onload = function (e) {
                      HideLoading();
                      if (this.status === 200 && this.response != null && this.response.features != null) {
                          var _arr = this.response.features;
                          var _wkt = _arr;
  
                          var icerik = '';
                          for (var i = 0; i < _arr.length; i++) {
                              var serviceName = _arr[i].properties["controller_name"];
                              if (serviceName != null && serviceName != undefined && serviceName.trim().length > 0) {
                                  var uniqField = _arr[i].properties["uniq_field_name"];
                                  var uniqColumn = _arr[i].properties["uniq_column_name"];
                                  var helperColumnName = _arr[i].properties["helper_column_name"];
                                  var displayText = _arr[i].properties[helperColumnName];
                                  var groupKey = _arr[i].properties["group_key"];
                                  var IsInfo = _arr[i].properties["is_info"];
                                  var is_detail = _arr[i].properties["is_detail"];
                                  var value = _arr[i].properties[uniqColumn];
  
                                  var menuName = _arr[i].id.split('.')[0];
  
                                  if (displayText == null || displayText == undefined) {
                                      displayText = "-";
                                  }
  
                                  var _title = GetLayerTitle(menuName);
  
                                  if (window.isInfoActive && IsInfo) {
  
                                      icerik += '<li class="info-list-item" onclick="ShowInfoDetail(\'' + serviceName + '\',\'' + uniqField + '\',\'' + groupKey + '\',\'' + value + '\',\'' + _title + '\',\'' + displayText + '\',\'' + is_detail + '\',\'' + menuName + '\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
                                              document.getElementById('infoLayerList').innerHTML == ''
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
                                          document.getElementById('infoLayerList').innerHTML = '';
                                      }
                                  }
                                  if (IsNetworkAnalysis && serviceName == 'VPipeLineClns' && (_arr[i].properties.pipe_type == 'Şebeke Hattı' || _arr[i].properties.pipe_type == 'Abone Hattı')) {
  
                                      icerik += '<li class="info-list-item" onclick="GetNetworkAnalysis(\'' + _title + '\',\'' + uniqField + '\',\'' + value + '\',\'NetworkAnalysis\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
  
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
  
                                      }
                                  }
                                  if (IsWaterTrace && (serviceName == 'VGisWells' || serviceName == 'VGisWaterTanks' || serviceName == 'VGisWaterDams')) {
  
                                      icerik += '<li class="info-list-item" onclick="GetWaterTrace(\'' + menuName + '\',\'' + uniqColumn + '\',\'' + value + '\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
  
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
  
                                      }
                                  }
  
                                  if (IsWstAnalysis && (serviceName == 'VPipeLineWsts')) {
  
  
                                      icerik += '<li class="info-list-item" onclick="GetNetworkAnalysis(\'' + _title + '\',\'' + uniqField + '\',\'' + value + '\',\'WstFittingsTrace\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
  
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
  
                                      }
                                  }
                                  if (IsLineTrace && (serviceName == 'VPipeLineClns')) {
  
                                      icerik += '<li class="info-list-item" onclick="GetNetworkAnalysis(\'' + _title + '\',\'' + uniqField + '\',\'' + value + '\',\'WaterTrace\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
  
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
  
                                      }
                                  }
  
                                  if (IsWstFittingsTrace && (serviceName == 'VGisTreatmentPlants') || (serviceName == 'VTerfiWsts' && _arr[i].properties.fittings_type == 'TERFİ')) {
  
                                      icerik += '<li class="info-list-item" onclick="GetWstFittingsTrace(\'' + menuName + '\',\'' + uniqColumn + '\',\'' + value + '\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
  
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
  
                                      }
                                  }
  
                                  if (IsClnFittingsTrace && (serviceName == 'VTreatmentPlantClns' || serviceName == 'VTerfiClns') && (_arr[i].properties.fittings_type == 'İÇME SUYU ARITMA TESİSİ' || _arr[i].properties.fittings_type == 'TERFİ')) {
  
                                      icerik += '<li class="info-list-item" onclick="GetClnFittingsTrace(\'' + menuName + '\',\'' + uniqColumn + '\',\'' + value + '\')"><i class="ti-hand-point-right"></i> ' + _title + ' (' + displayText + ')</li></br>';
  
                                      if (icerik.trim().length > 0) {
                                          document.getElementById('infoLayerList').innerHTML = icerik;
                                          if ($('.showInfoLayers').css('display') != 'block') {
                                              ShowInfoLayers();
  
                                          }
                                      } else {
                                          ShowInfo(HydronetNotifications['DST-103'].Content, HydronetNotifications['DST-103'].Title);
  
                                      }
                                  }
                                  else if (IsWindowSelected) {
  
                                      var okArray = [];
                                      var k = vectorFormat.readFeatures(_wkt.sort((a, b) => b.properties.layer_row - a.properties.layer_row)[0]);
                                      okArray.push(k);
                                      selectionLayer.getSource().addFeatures(okArray[0]);
  
  
                                  }
  
                              }
                          }
                      }
                  };
                  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                  xhr.send(params);
  
              }
  
          }
          else {
              ShowWarning(HydronetNotifications['DST-328'].Content, HydronetNotifications['DST-328'].Title);
          }
  
  
      }
  
}

const actions = {
  
}

export default {
    state,
    mutations,
    getters,
    actions

}
