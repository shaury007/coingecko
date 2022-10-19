import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import CoinsGrid from '../components/coinsGrid';
import mockData from './prop-mock.json';

Enzyme.configure({ adapter: new Adapter() });

describe('CoinsGrid Component', () => {
  test('should display list of coins', () => {
    const mockUseEffect = () => {
      jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    };
    mockUseEffect();
    const setPage = jest.fn();
    const setData = jest.fn();
    const setIsLoading = jest.fn();
    const setCoinId = jest.fn();
    const setopenDialog = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [1, setPage]);
    jest.spyOn(React, 'useState').mockImplementation(() => [mockData.coinsData, setData]);
    jest.spyOn(React, 'useState').mockImplementation(() => [false, setIsLoading]);
    const wrapper = shallow(
      <CoinsGrid
        handleCoinClick={(coinId) => {
          setCoinId(coinId);
          setopenDialog(true);
        }}
      />
    );
    const value = wrapper.instance;
    expect(value).toHaveValue;
  });
});
