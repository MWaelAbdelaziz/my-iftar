import styled, { css, keyframes } from 'styled-components';
import { Colors } from '../../theme';
import Belt from '../../assets/belt.png';

const slideBelt = keyframes`
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -250%;
  }
`;

export const CardContainer = styled.div<{ focus?: boolean }>`
  background-color: ${Colors.bg_primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 150px;
  border-radius: 1rem;
  padding: clamp(2rem,4vw,3rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;

  ${({ focus }) =>
  focus &&
  css`
    background-color: white;
    background-image: url(${Belt}), url(${Belt});
    background-repeat: repeat-x, repeat-x;
    background-position: top center, bottom center;
    background-size: auto 15%, auto 15%;
    animation: ${slideBelt} 20s linear infinite;
    `}
    /* 2xl */
    width: ${({ focus }) => focus 
    ? 'clamp(200px, 25vw, 300px)' 
    : 'clamp(150px, 20vw, 230px)'};
`;

export const CardTitle = styled.p`
  font-size: clamp(1em,2vw,2rem);
  overflow-wrap: break-word;
  margin: 0;
`;

export const CardSubTitle = styled.p`
  font-size: clamp(1rem,2vw,2rem);
  overflow-wrap: break-word;
  margin: 0;
`;

export const CardData = styled.p`
  font-size: clamp(1rem,2vw,2rem);
  overflow-wrap: break-word;
  margin: 0;
`;
