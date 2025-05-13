import styled from 'styled-components';
import { Colors } from '../../theme';

export const GradientBorderBox = styled.div`
  padding: 2px;
  border-radius: 1rem;
  background: linear-gradient(135deg, #ebc65e, #fefda7, #e2af3f, #e9c155);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const CardContainer = styled.div<{ $focus: boolean }>`
  background-color: ${Colors.bg_primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 150px;
  border-radius: 1rem;
  padding: clamp(2rem, 4vw, 3rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;

  width: ${({ $focus }) =>
    $focus ? 'clamp(200px, 25vw, 300px)' : 'clamp(150px, 20vw, 230px)'};
`;

export const CardTitle = styled.p`
  font-size: clamp(1em, 2vw, 2rem);
  overflow-wrap: break-word;
  margin: 0;
`;

export const CardSubTitle = styled.p<{ $focus: boolean }>`
  font-size: clamp(1rem, 2vw, 2rem);
  overflow-wrap: break-word;
  margin: 0;

  ${({ $focus }) =>
    $focus &&
    `
    margin-bottom: 1rem;
  `};
`;

export const CardData = styled.p`
  font-size: clamp(1rem, 2vw, 2rem);
  overflow-wrap: break-word;
  margin: 0;
`;
