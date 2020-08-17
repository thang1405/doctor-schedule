import fetcher from './fetcher'
import queryString from 'query-string'

export const getAll = () => {
  return fetcher.get('/doctors')
}

export const getId = (id) => {
  return fetcher.get(`/doctors/${id}`)
}

export const getParams = (params) => {
  const queryParams = queryString.stringify(params)
  return fetcher.get(`/doctors?${queryParams}`)
}

export const postDoctor = (data) => {
  return fetcher.post(`/doctors`, data)
}

export const repairInfoDoctor = (data, id) => {
  return fetcher.patch(`/doctors/${id}`, data)
}
export const deleteDoctor = (id) => {
  return fetcher.delete(`/doctors/${id}`)
}

export const getSearchParams = (value) => {
  return fetcher.get(`/doctors?q=${value}`)
}
