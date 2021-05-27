<template>
  <table class="wgu-proptable">
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
table.wgu-proptable {
  border-radius: 3px;
  /* background-color: #fff; */
  width: 100%;
}

.wgu-proptable td {
  background-color: #f9f9f9;
}

.wgu-proptable tr {
  font-size: 16px;
}

.wgu-proptable th,
.wgu-proptable td {
  width: 200px;
  padding: 5px 5px;
}

.wgu-proptable td.key-td {
  width: 160px;
  padding: 5px 5px;
}
</style>
