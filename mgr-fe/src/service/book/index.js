import axios from 'axios';

export const add = (form)=>{
    return axios.post('http://localhost:3000/book/add',form);
}

export const list = (data)=>{
    // console.log('asdadasd')
    return axios.get('http://localhost:3000/book/list',
        {
            params:data,
        }
    );
}

export const remove = (id)=>{
    return axios.delete(`http://localhost:3000/book/${id}`);
}

export const updateCount = (data = {})=>{
    return axios.post(`http://localhost:3000/book/update/count`,data);
}

export const update = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update`,
      data,
    );
  };
// 请求详情
  export const detail = (id) => {
    return axios.get(
        `http://localhost:3000/book/detail/${id}`,
    );
  };
  
  export const addMany = (key) => {
    return axios.post(`http://localhost:3000/book/addMany`, {
      key,
    });
  };