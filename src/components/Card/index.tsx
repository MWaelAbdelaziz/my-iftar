import { CSSProperties } from 'react';
import {
  CardContainer,
  CardData,
  CardSubTitle,
  CardTitle,
  GradientBorderBox,
} from './styled';

type CardProps = {
  title: string;
  titleValue: string;
  remaining?: string;
  style?: CSSProperties;
};

const Card = ({ title, titleValue, remaining, style }: CardProps) => {
  const isFocused = Boolean(remaining);

  const cardContent = (
    <CardContainer $focus={isFocused} style={style}>
      <CardTitle>{title}</CardTitle>
      <CardSubTitle $focus={isFocused}>{titleValue}</CardSubTitle>
      {isFocused && <CardData>{remaining}</CardData>}
    </CardContainer>
  );

  return isFocused ? (
    <GradientBorderBox>{cardContent}</GradientBorderBox>
  ) : (
    cardContent
  );
};

export default Card;
