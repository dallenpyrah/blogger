<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12 text-center landing-page text-light">
        <h1 class="align-items-center m-center animate__animated animate__fadeIn">
          <i class="fa fa-book text-primary animate__animated animate__bounce" aria-hidden="true"></i> Blogger
        </h1>
        <div class="row justify-content-center" v-if="state.user.isAuthenticated">
        </div>
        <h4 class="align-items-center m-center">
          <p class="animate__animated animate__slideInDown animate__delay-2s">
            <span>Scroll down to see all of our blogs</span>
          </p>
          <i class="fa fa-arrow-circle-down text-primary mt-4 animate__animated animate__slideInDown animate__delay-3s animate__infinite" aria-hidden="true"></i>
        </h4>
      </div>
    </div>
    <div class="row justify-content-around" v-if="state.user.isAuthenticated">
      <div class="d-none d-lg-block col-lg-2 col-10 mt-6 mb-6 bg-dark text-light card shadow-sm">
        <h6 class="m-5 text-light">
          <i class="fa fa-book fa-2x mr-2" aria-hidden="true"></i>Blogger is a platform for the people who need a break from reality.
        </h6>
      </div>
      <div class="col-lg-6 col-11 card m-5 p-4 shadow-lg">
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
      <div class="d-none d-lg-block  col-lg-2 col-10  mt-6 mb-6 bg-dark card shadow-sm">
        <h6 class="m-5 text-light">
          <i class="fa fa-globe fa-spin fa-2x mr-2" aria-hidden="true"></i>Our blogs are created by users all across the globe.
        </h6>
      </div>
    </div>
    <div v-else class="row justify-content-around">
      <div class="col-5 mt-6 mb-6 bg-dark text-light card shadow-sm">
        <h6 class="m-5 text-light">
          <i class="fa fa-book fa-2x mr-2" aria-hidden="true"></i>Blogger is a platform for the people who need a break from reality.
        </h6>
      </div>
      <div class="col-5 mt-6 mb-6 bg-dark card shadow-sm">
        <h6 class="m-5 text-light">
          <i class="fa fa-globe fa-spin fa-2x mr-2" aria-hidden="true"></i>Our blogs are created by users all across the globe.
        </h6>
      </div>
    </div>
    <div class="row test">
      <Blog v-for="blog in state.blog" :key="blog._id" :blog="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Blog from '../components/Blog'
import { blogsService } from '../services/BlogsService'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
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
          const blogId = await blogsService.createBlog(state.newBlog)
          console.log(state.newBlog)
          router.push({ name: 'BlogDetails', params: { id: blogId } })
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
  background-image: url('https://www.xmple.com/wallpaper/orange-gradient-yellow-linear-3200x1800-c2-ffffe0-ff8c00-a-315-f-14.svg');
  background-size: cover;
  background-repeat: no-repeat;
}

.mt-6{
  margin-top: 8rem;
}
.mb-6{
  margin-bottom: 6rem;
}
</style>
