import styled from 'styled-components';
import Template from './assets/template.svg';
import TemplateBelt from './assets/template-belt.svg';

export const BeltContainer = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
`;

export const Belt = styled.div`
  height: 4rem;
  width: 100vw;
  background: repeat url(${TemplateBelt});
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
  width: 50vw;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
  padding: 10%;
`;

export const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5%;
`;
