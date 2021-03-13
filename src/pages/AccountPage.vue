<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="row">
      <Blog v-for="blog in state.blog" :key="blog._id" :blog="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Blog from '../components/Blog'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      blog: computed(() => AppState.userBlogs),
      user: computed(() => AppState.user)
    })
    onMounted(() => accountService.getAccountBlogs())
    return {
      account: computed(() => AppState.account),
      state
    }
  },
  components: {
    Blog
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
