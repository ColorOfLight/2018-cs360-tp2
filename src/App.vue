<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "./assets/stylesheets/common.scss";

body {
  background-color: $bg-color;
  font-family: "Spoqa Han Sans", Helvetica, Arial, sans-serif;
  min-height: 100%;
}

#app {
  position: relative;
}
</style>
