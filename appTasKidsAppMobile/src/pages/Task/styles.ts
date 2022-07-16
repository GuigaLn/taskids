import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  
  padding: 20px 30px;
  background-color: #FFF;
  margin-top: 20px;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  align-items: center;

  flex-direction: row;
  
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Nunito-Bold';

  font-size: 22px;
  color: #565656;
`;

export const SubTitle = styled.Text`
  font-family: 'Nunito-Bold';

  font-size: 14px;
  color: #EA5D20;
`;

export const ContainerBody = styled.View`
  justify-content: space-between;
  width: 100%;
`;

export const ContainerTask = styled.View`
  flex: 1;
`;

export const Option = styled.View`
  margin-top: 20px;
 
  background-color: #F0F0F0; 
  border-radius: 10px;

  border-left-width: 4px;
  border-left-color : #F4B427;
`;

export const TitleTask = styled.Text`
  color: #EB5E20;
  font-size: 18px;
  font-family: 'Nunito-Bold';
`;

export const SubTitleTask = styled.Text`
  color: #F4B427;
  font-size: 18px;
  font-family: 'Nunito-Bold';

  margin-top: 10px;
`;

export const DateTask = styled.Text`
  text-align: right;
  color: #797979;
  font-size: 18px;
  font-family: 'Nunito-Bold';

  margin-top: 10px;
`;

export const ButtonOption = styled(RectButton)`
   padding: 20px 20px;
`;




