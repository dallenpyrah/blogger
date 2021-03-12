<template>
  <div v-if="blog.creator && blog.creator.email == state.user.email" class="col-4">
    <router-link :to="{name:'BlogDetails', params: {id: blog.id}}">
      <div class="card m-4 text-white bg-dark">
        <div class="card-body">
          <h4 class="card-title">
            {{ blog.title }}
          </h4>
          <p class="card-text" v-if="blog.creator">
            {{ blog.creator.name }}
          </p>
          <p class="card-text" v-else>
            No Name
          </p>
          <div v-if="blog.creator && blog.creator.email == state.user.email">
            <i class="fa fa-trash text-danger" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else class="col-4">
    <router-link :to="{name:'BlogDetails', params: {id: blog.id}}">
      <div class="card m-4 text-white bg-danger">
        <div class="card-body">
          <h4 class="card-title">
            {{ blog.title }}
          </h4>
          <p class="card-text" v-if="blog.creator">
            {{ blog.creator.name }}
          </p>
          <p class="card-text" v-else>
            No Name
          </p>
          <div v-if="blog.creator && blog.creator.email == state.user.email">
            <i class="fa fa-trash text-danger" aria-hidden="true"></i>
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

export default {
  name: 'Blog',
  props: {
    blog: Object
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      blog: computed(() => AppState.blogs)
    })
    return {
      state,
      async deleteBlog() {
        try {
          await blogsService.deleteBlog(props.blog.id)
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

</style>
