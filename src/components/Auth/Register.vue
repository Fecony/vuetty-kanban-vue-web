<template>
  <div id="register">
    <transition name="slide-fade">
      <article v-if="error" class="message is-danger">
        <div class="message-body">{{error}}</div>
      </article>
    </transition>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Please Register</p>
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
          <text-input
            id="cPassword"
            type="password"
            v-model="cPassword"
            name="cPassword"
            v-validate="{required: true, is: password}"
            :error="errors.first('cPassword')"
            placeholder="Confirm Password"
          ></text-input>
          <div class="is-clearfix options">
            <a class="is-pulled-right" @click="switchElem">Login?</a>
          </div>
          <button
            type="submit"
            class="button is-primary is-outlined is-rounded is-medium"
            :class="{'is-loading': loading}"
          >Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../Form/TextInput'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { register } from '../../helpers/auth'

export default {
  name: 'register',
  components: {
    TextInput
  },
  data() {
    return {
      email: '',
      password: '',
      cPassword: '',
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
    ...mapActions('auth', ['on_success']),
    ...mapMutations('auth', ['on_sign', 'on_failed', 'setAuthError']),
    authenticate() {
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.on_sign()
          register({ email: this.email, password: this.password })
            .then(() => {
              this.on_success()
              this.switchElem()
            })
            .catch(error => {
              this.on_failed(error)
            })
        }
      })
    },
    switchElem() {
      this.setAuthElem('login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
@import '@/assets/views/_signup.scss';
</style>