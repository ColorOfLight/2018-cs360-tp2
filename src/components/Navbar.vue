<template lang="pug">
  .navbar
    .navbar-wrapper
      .navbar-title TEAM COOK
      .navbar-search-container
        b-form-input.search-input(type="text")
        i.material-icons.search-icon search
      .navbar-account-container
        .navbar-account
          | Seongho Park
          i.material-icons arrow_drop_down
          
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
$navbar-height: 4.5rem;
$navbar-title-width: 12rem;
$navbar-account-width: 15rem;

.navbar {
  background-color: $white;
  border: 1px solid $border-color;
  height: $navbar-height;
  left: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
}

.navbar-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}

.navbar-title {
  color: $primary;
  font-size: 1.5rem;
  height: $navbar-height;
  left: 0;
  line-height: $navbar-height;
  position: absolute;
  text-align: center;
  top: 0;
  width: $navbar-title-width;
}

.navbar-search-container {
  background-color: $primary;
  height: 100%;
  margin-left: $navbar-title-width;
  margin-right: $navbar-account-width;
  padding: .75rem 1rem;
  position: relative;

  .search-input {
    border: 0;
    border-radius: .25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
    color: $default;
    font-size: 1.1rem;
    height: 100%;
    padding-left: 4rem;
  }

  .search-icon {
    color: $gray-500;
    left: 2.25rem;
    position: absolute;
    top: 1.5rem;
  }
}

.navbar-account-container {
  height: $navbar-height;
  right: 0;
  line-height: $navbar-height;
  position: absolute;
  text-align: center;
  top: 0;
  width: $navbar-account-width;

  .navbar-account {
    padding-left: 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .material-icons {
    color: $gray-500;
    margin-left: .75rem;
    vertical-align: sub;
  }
}
</style>