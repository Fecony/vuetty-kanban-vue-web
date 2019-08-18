<template>
  <div id="app" class="layout-default is-fullheight">
    <transition name="fade" mode="out-in" appear>
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import '@/assets/main.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-text-color;
  background: $main-background-color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
