import store from '@/store/index.js'
import { isEmpty } from 'lodash'



const beforeEach = async (to, from, next) => {

  // if we don't need authentication
  if(!to.meta.requiresAuth) return next()

  // if logged in user is already present we go next
  if(!isEmpty(store.state.auth.loggedInUser)) return next()

  await store.dispatch('auth/checkAuthToken')

  if(!isEmpty(store.state.auth.loggedInUser)) return next()

  return next({ name: 'Login' })

}




export default beforeEach;