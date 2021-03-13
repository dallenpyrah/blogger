<template>
  <div class="col-10">
    <div class="card text-white bg-light">
      <div class="card-body">
        <h4 class="card-title text-dark">
          {{ comments.body }}
        </h4>
        <p class="card-title text-dark">
          <!-- <span v-if="comments">{{ comments.creator.name }}</span> -->
        </p>
        <div v-if="comments.creator && comments.creator.email == state.user.email">
          <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteComment"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Comment',
  props: {
    comments: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments)
    })
    return {
      state,
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.comments.id)
          await blogsService.getCommentsByBlogId(props.comments.blog)
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
