import fetcher from './fetcher'
import queryString from 'query-string'

export const getAll = () => {
  return fetcher.get("/doctors");
}

export const getId = (id) => {
  return fetcher.get(`/doctors/${id}`);
}

export const getParams = (params) => {
  const queryParams = queryString.stringify(params);
  return fetcher.get(`/doctors?${queryParams}`);
}

export const postDoctor=(data)=>{
  fetcher.post(`/doctors`,{data})
  .then(res => {
    console.log(res);
    console.log(res.data);
  }).catch(e=>{
    console.log(e);
  })
}
