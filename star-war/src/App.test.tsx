import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '../src/core/context/characterListContext'
import { useCharactersState } from '../src/core/context/characterListContext';
jest.mock('../src/core/context/characterListContext')


jest.mock('./core/Api', () => ({
  fetchCharacters: jest.fn(() =>
    Promise.resolve({
      name: 'Luke Skywalker',
      gender: 'male',
      homeplanet: 'sun'
    })
  ),
}));
describe('App', () => {
  beforeEach(()=>{
    useCharactersState()
  })
  it('matches snapshot', () => {
    const { asFragment } = render(
        <App />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
