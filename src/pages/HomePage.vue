<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12 text-center landing-page text-light">
        <h1 class="align-items-center m-center">
          <i class="fa fa-book text-primary" aria-hidden="true"></i> Blogger
        </h1>
        <div class="row justify-content-center" v-if="state.user.isAuthenticated">
        </div>
        <h4 class="align-items-center m-center">
          <p><span>Scroll down to see all of our blogs</span></p>
          <i class="fa fa-arrow-circle-down text-primary mt-4" aria-hidden="true"></i>
        </h4>
      </div>
    </div>
    <div class="row justify-content-around" v-if="state.user.isAuthenticated">
      <div class="col-2 mt-6 mb-6 bg-primary text-light card shadow-sm">
        <h6 class="m-5 text-light"><i class="fa fa-book fa-2x mr-2" aria-hidden="true"></i>Blogger is a platform for the people who need a break from reality.</h6>
      </div>
      <div class="col-6 card m-5 p-4 shadow-lg">
        <h6>Create a blog post</h6>
        <form @submit.prevent="createBlog">
          <div class="form-group">
            <label>Blog Title</label>
            <input type="text"
                   class="form-control"
                   placeholder="Enter blog title"
                   v-model="state.newBlog.title"
            >
            <small class="form-text text-muted">All users will be able to see your blog post</small>
          </div>
          <div class="form-group">
            <label>Blog Body</label>
            <input type="text" class="form-control" placeholder="Blog Body" v-model="state.newBlog.body">
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div class="col-2 mt-6 mb-6 bg-primary card shadow-sm">
        <h6 class="m-5 text-light"><i class="fa fa-globe fa-spin fa-2x mr-2" aria-hidden="true"></i>Our blogs are created by users all across the globe.</h6>
      </div>
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
.landing-page{
  height: 92vh;
  background-color: black;
}
.m-center{
  margin-top: 18rem;
}
.background{
  background-color: rgb(243, 243, 243);
}
.mt-6{
  margin-top: 8rem;
}
.mb-6{
  margin-bottom: 6rem;
}
</style>
