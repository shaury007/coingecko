import { getCoinsList, getCoinDetails } from '../adapters/xhr/coinAdapter';
import mockData from "./prop-mock.json";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Testing Coins APIs', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should fetch the list of coins', async () => {
    mockedAxios.get.mockResolvedValue(mockData.coinsData);
    const data = await getCoinsList(10, 1, "EUR");
    expect(data).toEqual(mockData.coinsData);
  });

  it('should fetch details of a coin', async () => {
    mockedAxios.get.mockResolvedValue(mockData.coinData);
    const data = await getCoinDetails("bitcoin");
    expect(data).toEqual(mockData.coinData);
  });
});





