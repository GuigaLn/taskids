import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color: string;
}


const Loading: React.FC = (children) => (
  <Container>
    <ButtonText>
      {children}
    </ButtonText>
    <Icon name="arrow-right" size={30} color="white" ></Icon>
  </Container>
);

export default Loading;