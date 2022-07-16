import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 8px;

  border-bottom-color: white;
  flex-direction: row;
  align-items: center;

  border-width: 1px;
  border-color: #eeee;
  border-bottom-color: #eeee;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      border-bottom-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #3cdc8c;
      border-bottom-color: #3cdc8c;
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
