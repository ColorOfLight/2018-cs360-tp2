<template lang="pug">
  .navbar
    .navbar-wrapper
      .navbar-title TEAM COOK
      .navbar-search-container
        b-form-input.search-input(type="text" v-model="term" placeholder="Chicken, Pizza, ... or #Delicious, #Large, ...")
        i.material-icons.search-icon search
      .navbar-account-container
        .navbar-account(@click="() => isDropdownOpen = !isDropdownOpen")
          | {{username}}
          i.material-icons arrow_drop_down
        .navbar-dropdown-content(v-if="isDropdownOpen")
          b-card
            .dropdown-list(@click="logout") Logout
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: [
    'username'
  ],
  data () {
    return {
      isDropdownOpen: false,
      term: ''
    }
  },
  methods: {
    logout () {
      Cookies.remove('user_id');
      this.$router.push({name: 'Login'});
    },
    search (prevTerm) {
      if (prevTerm === this.term) {
        if (!this.term) {
          this.$router.replace({name: 'Search'});
        } else if (this.term.indexOf("#") === 0) {
          this.$router.replace({name: 'Search', query: { tag: this.term.substring(1)}});
        } else {
          this.$router.replace({name: 'Search', query: { keyword: this.term}});
        }
      }
    }
  },
  watch: {
    'term': function () {
      const prevTerm = this.term;
      setTimeout(() => {
        this.search(prevTerm);
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
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

  .navbar-dropdown-content {
    .card-body {
      padding: .5rem 0;
      text-align: left;
    }

    .dropdown-list {
      line-height: 1.2;
      padding: .75rem 0 .75rem 2rem;

      &:hover {
        background-color: $primary-50;
        color: $primary;
        cursor: pointer;
      }
    }
  }
}
</style>