import axios from "axios";

const axiosCommon = axios.create({
 baseURL:'job-task2-server.vercel.app/'
});
const useAxios = () => {
  return axiosCommon;
};
export default useAxios;