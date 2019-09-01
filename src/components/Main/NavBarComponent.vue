<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ path: '/'}">
        <img src="@/assets/img/logo.png" width="28" height="28" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        data-target="navMenu"
        @click="toggleNavBar"
        aria-label="menu"
        aria-expanded="false"
        :class="{ 'is-active': isActive }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <a class="navbar-item">Projects</a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless">More</a>

          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item">About</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <figure class="image is-32x32">
          <img class="is-rounded" src="http://via.placeholder.com/32" />
        </figure>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleNavBar() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-end {
  .image {
    margin: 10px;
    .is-rounded {
      width: 32px;
      height: 32px;
    }
  }
}
</style>