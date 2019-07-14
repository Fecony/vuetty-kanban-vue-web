<template>
  <div id="register">
    <div class="login-card">
      <div class="card-title">
        <h1>Please Register</h1>
      </div>
      <div class="content">
        <form @submit.prevent="register()">
          <div v-if="successMsg" class="notification is-success">
            <p>{{ successMsg }}</p>
          </div>
          <text-input
            id="email" 
            type="email"
            v-model="email" 
            name="email" 
            v-validate="'required|email'" 
            :error="errors.first('email')"
            placeholder="Email">
          </text-input>
          <text-input 
            id="password"
            type="password"
            v-model="password" 
            name="password" 
            v-validate="'required'" 
            :error="errors.first('password')"
            placeholder="Password">
          </text-input>
          <text-input 
            id="cPassword"
            type="password"
            v-model="cPassword" 
            name="cPassword" 
            v-validate="{required: true, is: password}" 
            :error="errors.first('cPassword')"
            placeholder="Confirm Password">
          </text-input>
          <div class="level options">
            <a class="btn btn-link level-right" @click="switchElem">Login?</a>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../Form/TextInput'

export default {
  components: {
    TextInput
  },
  data() {
    return {
      email: "",
      password: "",
      cPassword: "",
      successMsg: ""
    }
  },
  methods: {
    register() {
      this.$validator.validateAll().then(() => {
        if(!this.errors.any()) {
          this.$store.dispatch('users/register', {
            email: this.email,
            password: this.password
          })
          this.successMsg = "You have sucessfully been registered!"  
        } 
      })
    },
    switchElem() {
      this.$store.commit("ui/setAuthElem", "login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/variables/colors.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#register {
  display: flex;
  align-items: center;
  justify-content: center;

  .login-card {
    background: #fff;
    width: 24rem;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);
    width: 100%;

    .card-title {
      background-color: darken($primary, 5%);
      padding: 2rem;

      h1 {
        color: #fff;
        text-align: center;
        font-size: 1.2rem;
      }
    }

    .content {
      padding: 6rem 5rem;
    }

    #email,
    #password {
      display: block;
      width: 100%;
      font-size: 1rem;
      margin-bottom: 1.75rem;
      padding: 0.25rem 0;
      border: none;
      border-bottom: 1px solid $grey-lighter;
      transition: all 0.5s;

      &:hover {
        border-color: $grey;
      }

      &:active,
      &:focus {
        border-color: $primary;
      }
    }

    .checkbox {
      color: $grey-light;
      font-size: 0.8rem;

      span {
        margin-left: 0.5rem;
      }
    }

    a {
      font-size: 0.8rem;
    }

    .options {
      color: $grey-light;
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;
    }

    button {
      margin: auto;
      cursor: pointer;
      font-size: 1.2rem;
      color: $primary;
      border-radius: 4rem;
      display: block;
      width: 12rem;
      background: transparent;
      border: 2px solid $primary;
      padding: 0.9rem 0 1.1rem;
      transition: color 0.5s, border-color 0.5s;

      &:hover,
      &:focus {
        color: darken($primary, 10%);
        border-color: darken($primary, 10%);
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}
</style>