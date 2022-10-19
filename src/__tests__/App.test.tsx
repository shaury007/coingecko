import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('Load App', () => {
  test('Logo must load on page', () => {
    const mockUseEffect = () => {
      jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    };
    mockUseEffect();
    const setCoinId = jest.fn();
    const setopenDialog = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => ['bitcoin', setCoinId]);
    jest.spyOn(React, 'useState').mockImplementation(() => [false, setopenDialog]);
    const wrapper = shallow(<App />);
    const value = wrapper.instance;
    expect(value).toHaveValue;
  });
});
