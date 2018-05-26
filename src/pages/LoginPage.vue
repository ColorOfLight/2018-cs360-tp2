<template lang="pug">
  .container.page-login
    .row.justify-content-center.align-items-center
      .col.fixed-width-600
        b-card.login-card
          .card-title TEAM COOK
          b-container.input-container(fluid)
            b-row
              b-col.col(sm="3")
                label E-mail
              b-col.col(sm="9")
                b-form-input(type="text")
            b-row
              b-col.col(sm="3")
                label Password
              b-col.col(sm="9")
                b-form-input(type="password")
          .btn-container
            b-button.btn-signup(variant="outline-secondary") Sign up
            span.interval or
            b-button.btn-login(variant="secondary") Login
</template>

<script>
export default {

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