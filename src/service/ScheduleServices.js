import fetcher from './fetcher'
import queryString from 'query-string'

export const getAll = () => {
  return fetcher.get('/medical-schedule')
}

export const getId = (id) => {
  return fetcher.get(`/medical-schedule/${id}`)
}

export const getParams = (params) => {
  const queryParams = queryString.stringify(params)
  return fetcher.get(`/medical-schedule?${queryParams}`)
}

export const postSchedule = (data) => {
  return fetcher.post(`/medical-schedule`, data)
}
