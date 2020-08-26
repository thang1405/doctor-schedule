import fetcher from './fetcher'

export const loginAdmin = (data) => {
  return fetcher.post(`/auth/login`, data )
}
