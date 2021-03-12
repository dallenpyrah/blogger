<template>
  <div class="col-10">
    <div class="card text-white bg-light">
      <div class="card-body">
        <h4 class="card-title text-dark">
          {{ comments.body }}
        </h4>
        <p class="card-title text-dark">
          {{ comments.creator.name }}
        </p>
        <div v-if="comments.creator && comments.creator.email == state.user.email">
          <i class="fa fa-trash text-danger" aria-hidden="true"></i>
          <form @submit.prevent="editComment">
            <input type="text" placeholder="Edit Comment">
            <button class="btn btn-success">
              Edit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Comment',
  props: {
    comments: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      editComment: {}
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style>
</style>
