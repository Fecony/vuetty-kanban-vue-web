<template>
  <div id="login">
    <div class="login-card">
      <div class="card-title">
        <h1>Please Sign In</h1>
      </div>
      <div class="content">
        <div v-if="response" class="has-text-danger">{{ response }}</div>
        <form @submit.prevent="login()">
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
          <div class="level options">
            <div class="checkbox level-left">
              <input type="checkbox" id="checkbox" class="regular-checkbox" />
              <label for="checkbox">Remember me</label>
            </div>
            <a class="btn btn-link level-right" @click="switchElem">Register?</a>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TextInput from '../Form/TextInput'

export default {
  components: {
    TextInput
  },
  data() {
    return {
      email: "",
      password: "",
      response: ""
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then(() => {
        if(!this.errors.any()) {
          this.$store.dispatch("users/login", {
            email: this.email, 
            password: this.password
          })
        }
      })
    },
    switchElem() {
      this.$store.commit("ui/setAuthElem", "register");
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/variables/colors.scss';

#login {
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