<template>
  <div id="login">
    <transition name="slide-fade">
      <article v-if="error" class="message is-danger">
        <div class="message-body">{{error}}</div>
      </article>
    </transition>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Please Sign In</p>
      </header>
      <div class="content">
        <form @submit.prevent="authenticate()">
          <text-input
            id="email"
            type="email"
            v-model="email"
            name="email"
            v-validate="'required|email'"
            :error="errors.first('email')"
            placeholder="Email"
          ></text-input>
          <text-input
            id="password"
            type="password"
            v-model="password"
            name="password"
            v-validate="'required'"
            :error="errors.first('password')"
            placeholder="Password"
          ></text-input>
          <div class="level options">
            <div class="checkbox level-left">
              <label class="checkbox">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
            </div>
            <a class="btn btn-link level-right" @click="switchElem">Register?</a>
          </div>
          <button
            type="submit"
            class="button is-primary is-outlined is-rounded is-medium"
            :class="{'is-loading': loading}"
          >Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../Form/TextInput'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { login } from '../../helpers/auth'

export default {
  name: 'login',
  components: {
    TextInput
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  computed: {
    ...mapState('auth', ['isLoading']),
    ...mapGetters('auth', ['authError']),
    error() {
      return this.authError
    }
  },
  watch: {
    isLoading(newVal) {
      this.loading = newVal
    }
  },
  methods: {
    ...mapMutations('ui', ['setAuthElem']),
    ...mapMutations('auth', ['on_sign', 'on_failed', 'setAuthError']),
    ...mapActions('auth', ['on_success']),
    authenticate() {
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.on_sign()
          login({
            email: this.email,
            password: this.password
          })
            .then(res => {
              this.on_success(res)
              this.$router.push({
                path: '/'
              })
            })
            .catch(error => {
              this.on_failed(error)
            })
        }
      })
    },
    switchElem() {
      this.setAuthElem('register')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables/_colors.scss';
@import '@/assets/_signup.scss';
</style>