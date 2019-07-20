import axios from 'axios'
import { setAuthorization } from './general'

export function login({ email, password }) {
  return new Promise((response, reject) => {
    axios.post('/auth/login', { email, password }).then(
      ({ data }) => {
        setAuthorization(data.token)
        response(data)
      },
      ({
        response: {
          data: { message }
        }
      }) => {
        reject(message)
      }
    )
  })
}

export function register({ email, password }) {
  return new Promise((response, reject) => {
    axios.post('/auth/register', { email, password }).then(
      ({ data }) => {
        response(data)
      },
      ({
        response: {
          data: { message }
        }
      }) => {
        reject(message)
      }
    )
  })
}

export function getLocalUser() {
  const userStr = localStorage.getItem('user')

  if (!userStr) {
    return null
  }

  return JSON.parse(userStr)
}
