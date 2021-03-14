<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="bg-dark text-light text-left p-4">
      <i class="fa fa-instagram fa-2x" aria-hidden="true"></i>
      <i class="fa fa-github fa-2x ml-4" aria-hidden="true"></i>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
