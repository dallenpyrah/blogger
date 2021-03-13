<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 text-center">
        <div class="card mt-4 text-white bg-primary">
          <div class="card-body">
            <div v-if="state.activeBlog.creator && state.user.email == state.activeBlog.creator.email">
              <i class="fa fa-trash" aria-hidden="true" @click="deleteBlog"></i>
            </div>
            <h4 class="card-title">
              {{ state.activeBlog.title }}
            </h4>
            <h6 class="card-body">
              {{ state.activeBlog.body }}
            </h6>
            <p class="card-text" v-if="state.activeBlog.creator">
              {{ state.activeBlog.creator.name }}
            </p>
            <div v-if="state.activeBlog.creator && state.user.email == state.activeBlog.creator.email">
              <form class="form-inline" @submit.prevent="editBlog" action="">
                <input type="text" class="p-1" placeholder="Blog Title..." v-model="state.editBlog.title">
                <input type="text" class="p-1" placeholder="Blog Body..." v-model="state.editBlog.body">
                <button class="btn btn-dark ml-1" type="submit">
                  Edit Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Comment v-for="comments in state.comments" :key="comments.id" :comments="comments" />
      <div class="col-10 text-center">
        <div class="mt-5" v-if="state.user.isAuthenticated">
          <form @submit.prevent="createComment">
            <input type="text" class="mr-2 mt-1 p-1" placeholder="Add a comment..." v-model="state.newComment.body">
            <button class="btn btn-success p-2" type="sumbit">
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { useRoute, useRouter } from 'vue-router'
import Comment from '../components/Comment'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'BlogDetails',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      activeBlog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      newComment: {},
      editBlog: computed(() => AppState.activeBlog)
    })
    onMounted(async() => await blogsService.getBlogById(route.params.id))
    onMounted(async() => await blogsService.getCommentsByBlogId(route.params.id))

    return {
      route,
      state,
      async createComment() {
        try {
          const comment = { blog: state.activeBlog.id, body: state.newComment.body }
          await commentsService.createComment(comment)
          // await blogsService.getBlogById(route.params.id)
          await blogsService.getCommentsByBlogId(route.params.id)
          state.newComment = {}
        } catch (error) {
          console.error(error)
        }
      },
      async deleteBlog() {
        try {
          await blogsService.deleteBlog(state.activeBlog.id)
          router.push({ name: 'Home' })
        } catch (error) {
          console.error(error)
        }
      },
      async editBlog() {
        try {
          await blogsService.editBlog(state.activeBlog.id, state.editBlog)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Comment
  }
}
</script>

<style>

</style>
