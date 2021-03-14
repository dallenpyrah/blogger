<template>
  <div class="about text-center">
    <div class="row justify-content-center">
      <div class="col-6 card bg-dark text-light m-5 shadow-lg">
        <div>
          <h5 class="p-3">
            Welcome {{ account.name }}
          </h5>
          <img class="rounded" :src="account.picture" alt="" />
        </div>
        <p class="p-3">
          {{ account.email }}
        </p>
      </div>
    </div>
    <div class="row">
      <Blog v-for="blog in state.blog" :key="blog._id" :blog="blog" />
    </div>
    <div class="row justify-content-center">
      <Comment v-for="comments in state.comments" :key="comments.id" :comments="comments" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Blog from '../components/Blog'
import Comment from '../components/Comment'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  props: {
    blog: Object
  },
  setup() {
    const state = reactive({
      blog: computed(() => AppState.userBlogs),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.userComments)
    })
    onMounted(() => accountService.getAccountBlogs())
    onMounted(() => accountService.getAccountComments())
    return {
      account: computed(() => AppState.account),
      state
    }
  },
  components: {
    Blog,
    Comment
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.rounded {
    border-radius: 4rem !important;
}
</style>
