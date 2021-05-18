<template>
  <v-app>
    <div v-if="isLoading">
      <div class="loading" style="display: block">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(["isLoading"]),
  },
};
</script>