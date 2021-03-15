<template>
  <div class="col-10">
    <router-link :to="{name:'BlogDetails', params: {id: comments.blog}}" v-if="isAccountPage">
      <div class="card comment text-white bg-light">
        <div class="card-body">
          <h4 class="card-title text-dark">
            <div v-if="comments.creator && comments.creator.email == state.user.email">
              <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteComment"></i>
              {{ comments.body }}
            </div>
            <div v-else>
              {{ comments.body }}
            </div>
          </h4>
          <p class="card-title text-dark">
            <img :src="comments.creator.picture" class="rounded mr-2" width="50" alt="">
            <span v-if="comments">{{ comments.creator.name }}</span>
          </p>
        </div>
      </div>
    </router-link>
    <div v-else class="card text-white bg-light">
      <div class="card-body">
        <h4 class="card-title text-dark">
          <div v-if="comments.creator && comments.creator.email == state.user.email">
            <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteComment"></i>
            {{ comments.body }}
          </div>
          <div v-else>
            {{ comments.body }}
          </div>
        </h4>
        <p class="card-title text-dark">
          <img :src="comments.creator.picture" class="rounded mr-2" width="50" alt="">
          <span v-if="comments">{{ comments.creator.name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'

export default {
  name: 'Comment',
  props: {
    comments: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      blogPage: true,
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments)
    })
    return {
      isAccountPage: computed(() => route.name === 'Account'),
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
.comment:hover {
  transform: translateY(-10px);
  box-shadow: 1px 3px 5px rgb(94, 94, 94);
  cursor: pointer
}

.comment {
  transition: all .2s;
  color: black
}
</style>
