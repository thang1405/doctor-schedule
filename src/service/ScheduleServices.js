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

export const getScheduleDoctor =(doctorId)=>{
  return fetcher.get(`/medical-schedule?doctor_id=${doctorId}`)
}

export const postSchedule = (data) => {
  return fetcher.post(`/medical-schedule`, data)
}

export const repairInfoSchedule = (data, id) => {
  return fetcher.patch(`/medical-schedule/${id}`, data)
}
export const deleteSchedule = (id) => {
  return fetcher.delete(`/medical-schedule/${id}`)
}

