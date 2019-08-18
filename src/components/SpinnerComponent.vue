<template>
  <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
  <div :class="spinnerClass" v-if="loading">
    <transition name="fade" mode="out-in" appear>
      <svg
        class="spinner__child"
        :width="selectedSize"
        :height="selectedSize"
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
        :stroke="selectedColor"
      >
        <g fill="none" fill-rule="evenodd" stroke-width="2">
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="0s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="-0.9s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="-0.9s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true, default: false },
    global: { type: Boolean, default: false },
    size: { type: [Number, String], default: 's' },
    color: { type: String, default: 'primary' }
    // type: { type: String } // @TODO Download multiple types of spinner and change it there
  },
  data: function() {
    return {
      sizes: {
        xs: 16,
        s: 32,
        m: 64,
        l: 128
      },
      colors: {
        primary: 'hsl(171, 100%, 41%)',
        warning: 'hsl(48, 100%, 67%)',
        success: 'hsl(141, 71%, 48%)',
        error: 'hsl(348, 100%, 61%)',
        black: 'hsl(0, 0%, 21%)',
        white: 'hsl(0, 0%, 96%)	'
      },
      spinnerClass: 'spinner' + (this.global ? '--global' : '')
    }
  },
  computed: {
    selectedSize() {
      if (Number.isInteger(this.size)) return this.size
      return this.sizes[this.size] || this.sizes['s']
    },
    selectedColor() {
      //If provided color is not in color[] use primary color as fallback
      return this.colors[this.color] || this.colors['primary']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/components/_spinner.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>