import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAccountBlogs() {
    try {
      const res = await api.get('/account/blogs')
      console.log(res)
      AppState.userBlogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getAccountComments() {
    try {
      const res = await api.get('/account/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const accountService = new AccountService()
