import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-reshetnyak.firebaseio.com/'
});

export default instance;