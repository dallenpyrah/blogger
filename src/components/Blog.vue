<template>
  <div v-if="blog.creator && blog.creator.email == state.user.email" class="col-6">
    <router-link :to="{name:'BlogDetails', params: {id: blog.id}}">
      <div class="card m-4 text-white bg-dark">
        <div class="card-body">
          <h4 class="card-title">
            <i class="fa fa-bookmark-o text-danger mr-2" aria-hidden="true"></i>
            {{ blog.title }}
          </h4>
          <p class="card-text" v-if="blog.creator">
            <img :src="blog.creator.picture" class="rounded mr-2" width="50" alt="">
            {{ blog.creator.name }}
          </p>
          <p class="card-text" v-else>
            No Name
          </p>
          <div v-if="blog.creator && blog.creator.email == state.user.email">
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else class="col-6">
    <router-link :to="{name:'BlogDetails', params: {id: blog.id}}">
      <div class="card m-4 text-white bg-light text-dark shadow-lg">
        <div class="card-body">
          <h4 class="card-title">
            <i class="fa fa-bookmark-o text-primary mr-2" aria-hidden="true"></i>
            {{ blog.title }}
          </h4>
          <p class="card-text" v-if="blog.creator">
            <img :src="blog.creator.picture" class="rounded mr-2" width="50" alt="">
            {{ blog.creator.name }}
          </p>
          <p class="card-text" v-else>
            No Name
          </p>
          <div v-if="blog.creator && blog.creator.email == state.user.email">
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'

export default {
  name: 'Blog',
  props: {
    blog: Object
  },
  setup(props) {
    const router = useRouter
    const state = reactive({
      user: computed(() => AppState.user),
      blog: computed(() => AppState.blogs),
      editBlog: {}
    })
    return {
      state,
      async deleteBlog() {
        try {
          await blogsService.deleteBlog(props.blog.id)
          router.push({ name: 'Home' })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style>
.rounded {
    border-radius: 4rem !important;
}
</style>
