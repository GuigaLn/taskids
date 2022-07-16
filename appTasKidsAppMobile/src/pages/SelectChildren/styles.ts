
import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  
  padding: 20px 30px;
  background-color: #FFF;
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: 'Nunito-ExtraBold';

  color: #4DCD15;
`;

export const SubTitle = styled.Text`
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-family: 'Nunito-Regular';
  text-align: center;

  color: #4DCD15;
`;

export const ContainerTitle = styled.View`
  align-items: center;
`;

export const ContainerChildren = styled(RectButton)`
  text-align: left;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  flex-basis: 100%;

  background-color: #F0F0F0;
  padding: 20px 15px;
  border-radius: 5px;
`;

export const NameChildren = styled.Text`
  color: #4DCD15;

  flex-basis: 85%;
  
  font-family: 'Nunito-light';
  font-size: 16px;
`;

