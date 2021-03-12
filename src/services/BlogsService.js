import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogsService {
  async getAllBlogs() {
    try {
      const res = await api.get('api/blogs')
      console.log(res.data)
      AppState.blogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getBlogById(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      console.log(res)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getCommentsByBlogId(id) {
    try {
      const res = await api.get(`api/blogs/${id}/comments`)
      console.log(res.data)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(body) {
    try {
      const res = await api.post('api/blogs', body)
      console.log(res)
      this.getAllBlogs()
    } catch (error) {
      console.error(error)
    }
  }

  async editBlog(id, body) {
    try {
      await api.put('api/blogs' + id, body)
      this.getAllBlogs()
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBlog(id) {
    try {
      await api.delete('api/blogs/' + id)
      this.getAllBlogs()
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogsService = new BlogsService()
