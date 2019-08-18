<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-8-desktop is-5-widescreen">
            <transition name="component-fade" mode="out-in">
              <login v-if="authElem === 'login'" />
              <register v-if="authElem === 'register'" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import login from './Login'
import register from './Register'

export default {
  components: {
    login,
    register
  },
  computed: {
    ...mapState('ui', {
      authElem: state => state.authElem
    })
  },
  methods: {
    ...mapMutations('ui', ['setAuthElem']),
    switchElem() {
      this.setAuthElem('register')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>