const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class CommentsService {
  async createComment(newComment) {
    try {
      const res = await api.post('api/comments', newComment)
      console.log(res)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(id, body) {
    try {
      const res = await api.put('api/comments/' + id, body)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(id) {
    try {
      const res = await api.delete('api/comments/' + id)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const commentsService = new CommentsService()
