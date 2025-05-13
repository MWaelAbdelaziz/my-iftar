import styled, { keyframes } from 'styled-components';
import Template from './assets/template.svg';
import TemplateBelt from './assets/template-belt.svg';

export const BeltContainer = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
`;

const slideBelt = keyframes`
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -250%;
  }
`;

export const Belt = styled.div`
  height: 4rem;
  width: 100vw;
  background: repeat url(${TemplateBelt});
  animation: ${slideBelt} 70s linear infinite;

  @media (max-height: 630px) {
    max-height: 3rem;
  }

  @media (max-height: 470px) {
    max-height: 2rem;
  }
`;

export const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: repeat url(${Template});
  background-size: cover;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1536px;
  height: 80%;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
