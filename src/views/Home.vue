<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-8-desktop is-5-widescreen">
            <p>main</p>
            <a href="#!" @click.prevent="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  methods: {
    ...mapMutations('auth', { logutUser: 'logout' }),
    logout() {
      this.logutUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>