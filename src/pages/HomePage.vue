<template>
  <div class="container-fluid">
    <div class="row" v-if="state.user.isAuthenticated">
      <form @submit.prevent="createBlog">
        <input type="text" placeholder="Blog Title..." v-model="state.newBlog.title">
        <input type="text" placeholder="Blog Body..." v-model="state.newBlog.body">
        <button class="btn btn-success">
          Create Blog Post
        </button>
      </form>
    </div>
    <div class="row">
      <Blog v-for="blog in state.blog" :key="blog._id" :blog="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Blog from '../components/Blog'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      blog: computed(() => AppState.blogs),
      newBlog: {}
    })
    onMounted(async() => { await blogsService.getAllBlogs() })
    return {
      state,
      async createBlog() {
        try {
          await blogsService.createBlog(state.newBlog)
          state.newBlog = {}
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Blog
  }
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
  > img {
    height: 200px;
    width: 200px;
  }
}
</style>
