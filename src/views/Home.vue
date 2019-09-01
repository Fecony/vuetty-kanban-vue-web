<template>
  <section class="hero is-fullheight">
    <Navbar />
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
import Navbar from '../components/Main/NavBarComponent'

export default {
  name: 'home',
  components: { Navbar },
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