<template>
  <table class="dst-proptable">
    <ul v-html="infoHtml">  </ul>
  </table>
</template>

<script>
import { store } from "../../store/store";
export default {
  name: "dst-property-table",
  props: {
    color: { type: String, required: false, default: "red darken-3" }
  },
  computed: {
    infoHtml: function() {
      return store.getters.getFeatureInfo;
    }
  },
};
</script>

<style>
table.dst-proptable {
  border-radius: 3px;
  /* background-color: #fff; */
  width: 100%;
}


.li:hover{
background-color:#1b1306;
}

.no-bullets {
    list-style-type: none;
    
}

.dst-proptable td.key-td {
  width: 160px;
  padding: 5px 5px;
}
</style>
