import { api, request } from './api'

export const adminAuth = {
  login: (username, password) =>
    request(api.post('/admin/login', { username, password })),
  me: () => request(api.get('/admin/me')),
  logout: () => request(api.post('/admin/logout')),
}
