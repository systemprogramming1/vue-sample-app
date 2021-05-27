<template>
  <v-card
    class="wgu-infoclick-win"
    v-if="show"
    v-bind:style="{ left: left, top: top }"
  >
    <v-toolbar :color="color" class="" dark>
      <v-icon>{{ icon }}</v-icon>
      <v-toolbar-title class="wgu-win-title">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="show = false"
        ><v-icon>close</v-icon></v-app-bar-nav-icon
      >
    </v-toolbar>
    <v-card-title primary-title class="wgu-infoclick-win-title">
      <div v-if="!this.attributeData" class="no-data">
        Lütfen bilgi almak istediğiniz noktaya tıklayınız.
      </div>

      <dst-property-table :color="color" />

    </v-card-title>
  </v-card>
</template>

<script>
import { AppEventBus } from "../../AppEventBus";
import PropertyTable from "./PropertyTable";
import LayerUtil from "../../util/layerUtil";
import GeoJSON from "ol/format/GeoJSON";
import { store } from "../../store/store";

export default {
  name: "dst-infoclick-win",
  components: {
    "dst-property-table": PropertyTable
  },
  props: {
    color: { type: String, required: false, default: "red darken-3" },
    icon: { type: String, required: false, default: "info" },
    title: { type: String, required: false, default: "Bilgi Al" },
    draggable: { type: Boolean, required: false, default: true },
    initPos: { type: Object, required: false },
  },
  data: function () {
    return {
      show: false,
      left: this.initPos ? this.initPos.left + "px" : "0",
      top: this.initPos ? this.initPos.top + "px" : "0",
      attributeData: ""
    };
  },
  created() {
    var me = this;
    // Listen to the ol-map-mounted event and receive the OL map instance
    AppEventBus.$on("ol-map-mounted", (olMap) => {
      // make the OL map accessible in this component
      me.map = olMap;
    });
  },
  methods: {
    registerMapClick(unregister) {
      var me = this;

      if (unregister === true) {
        me.map.un("singleclick", me.onMapClick);
      } else {
        me.map.on("singleclick", me.onMapClick);
      }
    },
    getInfo(evt) {
      var layerList = store.getters.getUserLayer;

      var vectorFormat = new GeoJSON();

      var query_layers = "";
      var _arr = [];
      var _cqlFilter = [];
      for (var i = 0; i < layerList.length; i++) {
        var layerName = layerList[i].layerName;
        if (layerName != "WEB-TAK") {
          var _layer = LayerUtil.getLayerByTitle(layerName, this.map);

          if (_layer.getSource() != null) {
            _arr.push(_layer.getSource().getParams().LAYERS);
            if (_layer.getSource().getParams().CQL_FILTER != "") {
              _cqlFilter.push(_layer.getSource().getParams().CQL_FILTER);
            }
          }
        }
      }
      var _arrtemp = _arr;
      _arr = [];
      for (var i = 0; i < layerList.length; i++) {
        if (_arrtemp[i] != "" && _arrtemp[i] != undefined) {
          _arr.push(_arrtemp[i]);
        }
      }

      query_layers = _arr.join(",");

      if (query_layers.slice(-1) == ",") {
        query_layers = query_layers.slice(0, -1);
      }
      for (var i = 0; i < layerList.length; i++) {
        if (
          LayerUtil.getLayerByTitle(
            layerList[i].layerName,
            this.map
          ).getSource() != null
        ) {
          var layersource = LayerUtil.getLayerByTitle(
            layerList[i].layerName,
            this.map
          ).getSource();
          break;
        }
      }

      if (layersource != undefined) {
        var viewResolution = this.map.getView().getResolution();
        if (viewResolution < 0.07899619307811453) {
          viewResolution = 0.07899619307811453;
        }
        var url = layersource.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          "EPSG:3857",
          {
            INFO_FORMAT: "application/json",
            feature_count: 10000,
            LAYERS: query_layers,
            QUERY_LAYERS: query_layers,
            CQL_FILTER: _cqlFilter.join(";"),
          }
        );

        if (url) {
          var xhr = new XMLHttpRequest();

          var url_1 = url.substr(0, url.indexOf("?"));
          var params = url.substring(url.indexOf("?") + 1);
          xhr.open("POST", url_1, true);
          xhr.responseType = "json";
          xhr.onload = function (e) {
            if (
              this.status === 200 &&
              this.response != null &&
              this.response.features != null
            ) {
              var _arr = this.response.features;
              var _wkt = _arr;

              var icerik = "";
              for (var i = 0; i < _arr.length; i++) {
                var serviceName = _arr[i].properties["controller_name"];
                if (
                  serviceName != null &&
                  serviceName != undefined &&
                  serviceName.trim().length > 0
                ) {
                  var uniqField = _arr[i].properties["uniq_field_name"];
                  var uniqColumn = _arr[i].properties["uniq_column_name"];
                  var helperColumnName =
                    _arr[i].properties["helper_column_name"];
                  var displayText = _arr[i].properties[helperColumnName];
                  var groupKey = _arr[i].properties["group_key"];
                  var IsInfo = _arr[i].properties["is_info"];
                  var is_detail = _arr[i].properties["is_detail"];
                  var value = _arr[i].properties[uniqColumn];

                  var menuName = _arr[i].id.split(".")[0];

                  if (displayText == null || displayText == undefined) {
                    displayText = "-";
                  }

                  var _title = LayerUtil.GetLayerTitle(menuName);

                  icerik +=
                    '<li class="info-list-item" onclick="ShowInfoDetail(\'' +
                    serviceName +
                    "','" +
                    uniqField +
                    "','" +
                    groupKey +
                    "','" +
                    value +
                    "','" +
                    _title +
                    "','" +
                    displayText +
                    "','" +
                    is_detail +
                    "','" +
                    menuName +
                    '\')"><i class="ti-hand-point-right"></i> ' +
                    _title +
                    " (" +
                    displayText +
                    ")</li></br>";

                  if (icerik.trim().length > 0) {
                    store.commit("updateFeatureInfo", icerik);
                  } else {
                    store.commit("showNotification", "DST-103");
                  }
                }
              }
            }
          };
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
          xhr.send(params);
        }
      } else {
        store.commit("showNotification", "DST-328");
      }
    },
    onMapClick(evt) {
      this.getInfo(evt);
      this.attributeData="GetInfo";
    },
  },
  watch: {
    show() {
      const me = this;
      if (this.show === true) {
        me.registerMapClick();
      } else {
        me.attributeData = null;
      }
    },
  },
};
</script>

<style>
.wgu-infoclick-win {
  background-color: white;
  z-index: 2;
  width: 250px;
}

.v-card.wgu-infoclick-win {
  position: absolute;
}

.wgu-infoclick-win .v-card__title {
  display: inherit;
}

@media (max-width: 600px) {
  /* tmp. approach to position on small screens */
  .v-card.wgu-infoclick-win {
    /* tmp. fix */
    left: 0 !important;
    top: 40% !important;
    width: 100%;
    max-width: 600px;
  }

  .wgu-infoclick-win-title {
    overflow: scroll;
    max-height: 300px;
  }

  .info-list-item {
    font-size: 1rem;
  }

  .info-list-item:hover {
    cursor: pointer;
    line-height: 1.5rem;
  }
}
</style>
