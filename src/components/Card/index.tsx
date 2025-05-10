import { CSSProperties } from 'react';
import { CardContainer, CardData, CardSubTitle, CardTitle } from './styled';

type CardProps = {
  title: string;
  titleValue: string;
  remaining?: number;
  focus?: boolean;
  style?: CSSProperties
};

const Card = ({ title, titleValue, remaining, focus, style }: CardProps) => {
  return (
    <CardContainer focus={focus} style={style}>
      <CardTitle>{title}</CardTitle>
      <CardSubTitle>{titleValue}</CardSubTitle>
      <CardData>Remaining 40:30</CardData>
    </CardContainer>
  );
};

export default Card;
