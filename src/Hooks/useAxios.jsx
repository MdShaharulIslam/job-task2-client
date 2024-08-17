import axios from "axios";

const axiosCommon = axios.create({
 
  //  baseURL: "http://localhost:5000",
 baseURL:"https://job-task2-server.vercel.app/",
});

const useAxios = () => {
  return axiosCommon;
};

export default useAxios;