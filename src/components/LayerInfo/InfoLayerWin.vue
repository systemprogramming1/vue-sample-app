<template>

  <v-card class="dst-infoclick-win" v-draggable-win="draggable"  v-if=show v-bind:style="{ left: left, top: top }">
    <v-toolbar :color="color" class="" dark>
      <v-icon>{{icon}}</v-icon>
      <v-toolbar-title class="dst-win-title">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="show = false"><v-icon>close</v-icon></v-app-bar-nav-icon>
    </v-toolbar>
    <v-card-title primary-title class="dst-infoclick-win-title">

      <div v-if="!this.attributeData && !this.coordsData" class="no-data">
        Click on the map to get information for the clicked map position.
      </div>

      <!-- feature property grid -->
      <wgu-property-table :properties="attributeData" :color="color" />

      <!-- click coodinate info grid -->
      <wgu-coords-table :coordsData="coordsData" :color="color" />

    </v-card-title>
  </v-card>

</template>

<script>

import { WguEventBus } from '../../AppEventBus';
import PropertyTable from './PropertyTable';

export default {
  name: 'wgu-infoclick-win',
  components: {
    'wgu-property-table': PropertyTable
  },
  props: {
    color: {type: String, required: false, default: 'red darken-3'},
    icon: {type: String, required: false, default: 'info'},
    title: {type: String, required: false, default: 'Map Click Info'},
    draggable: {type: Boolean, required: false, default: true},
    initPos: {type: Object, required: false}
  },
  data: function () {
    return {
      show: false,
      left: this.initPos ? this.initPos.left + 'px' : '0',
      top: this.initPos ? this.initPos.top + 'px' : '0',
      attributeData: null,
      coordsData: null
    }
  },
  created () {
    var me = this;
    
  },
  methods: {
    toggleUi () {
      this.show = !this.show;
    },
    registerMapClick (unregister) {
      var me = this;

      if (unregister === true) {
        me.map.un('singleclick', me.onMapClick);
      } else {
        me.map.on('singleclick', me.onMapClick);
      }
    },
   
    onMapClick (evt) {
      const me = this;
      let featureLayer = me.map.forEachFeatureAtPixel(evt.pixel,
        (feature, layer) => {
          return [feature, layer];
        });

    
      if (featureLayer) {
        const feat = featureLayer[0];
        let props = feat.getProperties();
        delete props.geometry;

        me.attributeData = props;
      } else {
        me.attributeData = null;
      }

   
      me.coordsData = {
        coordinate: evt.coordinate,
        projection: me.map.getView().getProjection().getCode()
      };
    }
  },
  watch: {
    show () {
      const me = this;
      if (this.show === true) {
        me.registerMapClick();
      } else {
        // cleanup old data
        me.attributeData = null;
        me.coordsData = null;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .wgu-infoclick-win {
    background-color: white;
    z-index: 2;
    width: 450px;
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
  }

</style>
