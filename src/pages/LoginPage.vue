<template lang="pug">
  .container.page-login
    .row.justify-content-center.align-items-center
      .col.fixed-width-600
        b-card.login-card
          .card-title TEAM COOK
          b-container.input-container(fluid)
            b-row(v-if="$route.name === 'SignUp'")
              b-col.col(sm="3")
                label Username
              b-col.col(sm="9")
                b-form-input(type="text" v-model="form.username")
            b-row
              b-col.col(sm="3")
                label User ID
              b-col.col(sm="9")
                b-form-input(type="text" v-model="form.user_id")
            b-row
              b-col.col(sm="3")
                label Password
              b-col.col(sm="9")
                b-form-input(type="password" v-model="form.password")
          .btn-container(v-if="$route.name === 'SignUp'")
            b-button.btn-login(variant="secondary" @click="signUp") Sign up
          .btn-container(v-else)
            b-button.btn-signup(variant="outline-secondary" @click="moveToSignUp") Sign up
            span.interval or
            b-button.btn-login(variant="secondary" @click="login") Login
</template>

<script>
import Http from '@/libs/Http'
import qs from "qs"
import Cookies from "js-cookie"

export default {
  data () {
    return {
      form: {
        user_id: "",
        password: "",
        username: ""
      },
    }
  },
  methods: {
    login () {
      if (this.form.user_id && this.form.password) {
        const httpData = {
          user_id: this.form.user_id,
          password: this.form.password
        };
        Http.post('/user/login', qs.stringify(httpData)).then(((res) => {
          Cookies.set('user_id', res.data.data.user_id);
          this.$router.push({name: 'Search'});
        })).catch((res) => {
          alert("Please check User ID or Password.")
        });
      } else {
        alert("Please fill all of inputs.")
      }
    },
    signUp () {
      if (this.form.user_id && this.form.password && this.form.username) {
        const httpData = {
          id: this.form.user_id,
          password: this.form.password,
          name: this.form.username
        };
        Http.post('/user', qs.stringify(httpData)).then(((res) => {
          Cookies.set('user_id', res.data.data.user_id);
          this.$router.push({name: 'Search'});
        }))
      } else {
        alert("Please fill all of inputs.")
      }
    },
    moveToSignUp () {
      this.$router.push({name: 'SignUp'});
    }
  }
}
</script>

<style scoped lang="scss">
.fixed-width-600 {
  margin: 0 auto;
  max-width: 600px;
}

.login-card {
  margin-top: 6rem;

  .card-body {
    padding: 1.75rem 3rem 2rem;
  }

  .card-title {
    color: $primary;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: right;
  }

  .input-container {
    .row {
      padding: 1rem 0;

      .col {
        padding-right: 0;
      }
    }
  }

  .btn-container {
    margin-top: 1rem;
    text-align: right;
    
    .interval {
      color: $gray-500;
      font-weight: 300;
      padding-left: .5rem;
      padding-right: 1rem;
      vertical-align: sub;
    }

    .btn-signup {
      border: 0;

      &:hover {
        background-color: $white;
        color: darken($primary, 10%);
      }
    }

    .btn-login {
      color: $white;
    }
  }
}
</style>