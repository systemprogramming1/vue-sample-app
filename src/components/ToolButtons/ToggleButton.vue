<template>
  <v-dialog v-model="show" max-width="1000">
    <template v-slot:activator="{ on }">
     
      <v-btn icon dark="dark" v-on="on">
        <v-icon medium>{{ icon }}</v-icon>
        {{ text }}
      </v-btn>
    
      <!-- <input type="text" :value="value" @input="setValue">
      <p>{{value}}</p> -->
      <!-- <input type="text" v-model="value">
      <p>{{value}}</p> -->
    </template>

    <wgu-helpwin
      ref="helpwin"
      :color="color"
      :icon="icon"
      :title="text"
      :headline="headline"
      :content="content"
      :infoLink="infoLink"
      :infoLinkText="infoLinkText"
      v-on:winxclose="show = false" 
    />
  </v-dialog>
</template>

<script>
import HelpWin from "./HelpWin";
import Vue from "vue";
export default {
  name: "wgu-helpwin-btn",
  components: {
    "wgu-helpwin": HelpWin,
  },
  props: {
    color: { type: String, required: false, default: "red darken-3" },
    icon: { type: String, required: false, default: "help" },
    text: { type: String, required: false },
    dark: { type: Boolean, required: false, default: false },
    headline: { type: String, required: false },
    content: { type: String, required: false },
    infoLink: { type: String, required: false },
    infoLinkText: { type: String, required: false },
  },
  data: function () {
    return {
      show: false,
    };
  },
  methods: {
    GetDma() {
      var access_token = "b6ae8eab-175f-4c5d-9dc5-6c636dd8751c";
      Vue.axios
        .get( Vue.prototype.$appConfig.webApi_Url+"/odata/VDoors", {
          headers: {
            Authorization: `Basic ${access_token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setValue(event) {
      this.$store.dispatch("setValueData", event.target.value);
    },
  },
  computed: {
    value: {
      get() {
        return this.$store.getters.getValue;
      },
      set() {
        this.$store.dispatch("setValueData", event.target.value);
      },
    },
  },
};
</script>

<style>
</style>
