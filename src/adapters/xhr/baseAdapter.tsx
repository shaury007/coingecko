import axios from 'axios';

function returnAxiosInstance() {
  return axios.create({
    baseURL: 'https://api.coingecko.com/api/v3'
  });
}

export function get(url: string, params: any) {
  const axiosIns = returnAxiosInstance();
  return axiosIns.get(url, { params });
}
