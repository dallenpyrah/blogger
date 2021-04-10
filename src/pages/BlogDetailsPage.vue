<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 text-center">
        <div class="card mt-4 text-white bg-primary">
          <div class="card-body">
            <div v-if="state.activeBlog.creator && state.user.email == state.activeBlog.creator.email">
            </div>
            <div class="row justify-content-center">
              <h4 class="col-3 card bg-dark text-light shadow-lg p-2">
                {{ state.activeBlog.title }}
              </h4>
            </div>
            <div class="row justify-content-center">
              <h6 class="m-3 text-grey">
                {{ state.activeBlog.body }}
              </h6>
            </div>
            <p class="card-text text-grey-creator badge badge-light" v-if="state.activeBlog.creator">
              {{ state.activeBlog.creator.name }}
            </p>
            <div v-if="state.user.isAuthenticated && state.activeBlog.creator && state.user.email != state.activeBlog.creator.email" class="text-left">
              <button class="btn btn-dark text-light mr-2" @click="toggleComment">
                Add Comment
              </button>
            </div>
            <div v-if="state.activeBlog.creator && state.user.email == state.activeBlog.creator.email" class="text-left">
              <button class="btn btn-dark text-light mr-2" @click="toggleComment">
                Add Comment
              </button>
              <button class="btn btn-light" @click="toggleEditBlog">
                Edit Blog
              </button>
              <button class="btn btn-dark text-primary ml-2" @click="deleteBlog">
                Delete Blog
              </button>
            </div>
            <div v-else class="text-left">
            </div>
          </div>
        </div>
      </div>
      <div id="edit-blog" class="col-10 hidden">
        <div class="card p-4" v-if="state.activeBlog.creator && state.user.email == state.activeBlog.creator.email">
          <form @submit.prevent="editBlog">
            <div class="form-group">
              <label>Blog Title</label>
              <input type="text"
                     class="form-control"
                     placeholder="Enter blog title"
                     v-model="state.editBlog.title"
              >
              <small class="form-text text-muted">Only you can edit this blog post.</small>
            </div>
            <div class="form-group">
              <label>Blog Body</label>
              <input type="text" class="form-control" placeholder="Blog Body" v-model="state.editBlog.body">
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div id="toggle-comment" class="col-10 text-center hidden">
        <div>
          <div>
            <div class="card p-4">
              <form @submit.prevent="createComment">
                <div class="form-group">
                  <input type="text"
                         class="form-control"
                         placeholder="Add a comment"
                         v-model="state.newComment.body"
                  >
                </div>
                <div class="text-left">
                  <button type="submit" class="btn btn-primary">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Comment v-for="comments in state.comments" :key="comments.id" :comments="comments" />
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
          const comment = { blogId: state.activeBlog.id, body: state.newComment.body }
          document.getElementById('toggle-comment').classList.toggle('hidden')
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
          document.getElementById('edit-blog').classList.toggle('hidden')
          await blogsService.editBlog(state.activeBlog.id, state.editBlog)
        } catch (error) {
          console.error(error)
        }
      },
      toggleEditBlog() {
        document.getElementById('edit-blog').classList.toggle('hidden')
      },
      toggleComment() {
        document.getElementById('toggle-comment').classList.toggle('hidden')
      }
    }
  },
  components: {
    Comment
  }
}
</script>

<style>
.hidden{
  display: none;
}
.text-grey{
  color: rgb(0, 0, 0);
}
.text-grey-creator{
  color: rgb(63, 63, 63);
}

</style>
