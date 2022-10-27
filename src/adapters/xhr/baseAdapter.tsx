import axios from 'axios';

export function get(url: string, params: any) {
  return axios.get(`https://api.coingecko.com/api/v3${url}`, { params });
}
