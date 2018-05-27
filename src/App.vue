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

html {
  height: 100%;
}

body {
  background-color: $bg-color;
  color: $default;
  font-family: "Spoqa Han Sans", Helvetica, Arial, sans-serif;
  height: 100%;
}

#app {
  height: 100%;
  position: relative;
}
</style>
