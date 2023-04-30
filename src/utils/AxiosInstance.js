import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://book-store-backend-git-master-aman12207.vercel.app/'
});

export default AxiosInstance;