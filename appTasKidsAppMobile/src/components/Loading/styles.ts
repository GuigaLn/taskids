import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;

  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  
  display: flex;
  flex-direction: row;

  background-color: ${props => props.color}
  
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
  font-family: 'Nunito-ExtraBold';
`;
