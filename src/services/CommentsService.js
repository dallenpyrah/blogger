const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class CommentsService {
  async createComment(newComment) {
    try {
      console.log(newComment)
      return await api.post('api/comments', newComment)
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
      return await api.delete('api/comments/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}

export const commentsService = new CommentsService()
