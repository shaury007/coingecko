import { getCoinsList, getCoinDetails } from '../adapters/xhr/coinAdapter';
import mockData from "./prop-mock.json";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Testing Coins APIs', () => {
  it('should fetch the list of coins', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockData.coinsData));
    expect(getCoinsList(10, 1, "EUR")).resolves.toEqual(mockData.coinsData);
  });

  it('should fetch details of a coin', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockData.coinData));
    expect(getCoinDetails("bitcoin")).resolves.toEqual(mockData.coinData);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});





