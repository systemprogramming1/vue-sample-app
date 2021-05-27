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
    color: { type: String, required: false, default: "red darken-3" },
    properties: { type: Object }
  },
  computed: {
    infoHtml: function() {
      return store.getters.getFeatureInfo;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
table.dst-proptable {
  border-radius: 3px;
  /* background-color: #fff; */
  width: 100%;
}

.dst-proptable td {
  background-color: #f9f9f9;
}

.dst-proptable tr {
  font-size: 16px;
}

.dst-proptable th,
.dst-proptable td {
  width: 200px;
  padding: 5px 5px;
}

.dst-proptable td.key-td {
  width: 160px;
  padding: 5px 5px;
}
</style>
