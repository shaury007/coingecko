import { get } from './baseAdapter';

export function getCoinsList(per_page: number, page: number, vs_currency: string) {
  const params = { per_page, page, vs_currency };
  return get('/coins/markets', params);
}

export function getCoinDetails(coinId: string) {
  return get(`/coins/${coinId}`, {});
}
