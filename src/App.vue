<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    this.isAuthApp();
  },
  methods: {
    isAuthApp() {
      this.$store.dispatch("initAuth");
    },
  },
};
</script>
