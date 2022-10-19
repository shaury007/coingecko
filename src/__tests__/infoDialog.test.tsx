import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import InfoDialog from '../components/infoDialog';
import mockData from './prop-mock.json';

Enzyme.configure({ adapter: new Adapter() });

describe('InfoDialog Component', () => {
  test('info dialog should be rendered', () => {
    const mockUseEffect = () => {
      jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    };
    mockUseEffect();
    const setInfo = jest.fn();
    const setIsLoading = jest.fn();
    const setopenDialog = jest.fn();
    const infoData = mockData.coinData;
    jest.spyOn(React, 'useState').mockImplementation(() => [infoData, setInfo]);
    jest.spyOn(React, 'useState').mockImplementation(() => [false, setIsLoading]);
    const wrapper = shallow(
      <InfoDialog coinId={'test'} open={false} onClose={() => setopenDialog(false)} />
    );
    const value = wrapper.instance;
    expect(value).toHaveValue;
  });
});
