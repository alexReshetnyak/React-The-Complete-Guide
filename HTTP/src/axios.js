import axios from "axios";

// * Create axios instance
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.response.use(res => {
  // console.log('Intercepted Request:', request);
  return res;
}, error => {

  /// * Itercept Response Errors
  console.log('Request Failed!');
  return Promise.reject(error);
});

export default instance;
