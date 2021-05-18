<template>

  <table class="wgu-proptable" v-if="this.properties" :style="tableStyles">
    <thead>
      <tr>
     
      </tr>
    </thead>
    <tbody class="attr-tbody">
    
    </tbody>
  </table>

</template>

<script>

import vColors from 'vuetify/es5/util/colors';

export default {
  name: 'wgu-property-table',
  props: {
    color: {type: String, required: false, default: 'red darken-3'},
    properties: {type: Object}
  },
  computed: {
    tableStyles () {
      // calculate border color of tables due to current color property
      let borderColor = this.color;
      
      return {
        'border': '2px solid ' + borderColor
      };
    }
  }
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

.wgu-proptable th, .wgu-proptable td {
 width: 200px;
 padding: 5px 5px;
}

.wgu-proptable td.key-td {
  width: 160px;
  padding: 5px 5px;
}

</style>
