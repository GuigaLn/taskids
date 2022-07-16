import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;

  padding: 0 16px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 8px; 
  border-bottom-width: 2px;
  border-bottom-color : white;
  flex-direction: row;
  align-items: center;

  ${props => props.isErrored && css`
    border-bottom-color : #c53030;
  `}

  ${props => props.isFocused && css`
    border-bottom-color : #3CDC8C;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: black;
  font-size: 16px;
  font-family: 'Nunito-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`;
