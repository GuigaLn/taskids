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
`;

export const Message = styled.View`
  width: 100%;

  align-items: stretch;
  justify-content: space-around;
  background-color: #4DCD15;
  border-radius: 20px;
  flex-direction: row;
  padding: 20px 10px;
  margin-top: 20px;

`;

export const ViewMessage = styled.View`
  justify-content: space-between;
  background-color: #4DCD15;
  max-width: 180px;

`;

export const TitleMessage = styled.Text`
  font-family: 'Nunito-Bold';

  font-size: 18px;
  color: #FFF;
`;

export const SubTitleMessage = styled.Text`
  font-family: 'Nunito-Bold';
  margin-top: 20px;
  font-size: 14px;
  color: #FFF;
`;

export const ContainerOptions = styled.View`
  flex-direction: row;  
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Option = styled(RectButton)`
  align-items: center;
  margin-top: 20px;
  padding: 40px 0;
  flex-basis: 49%;

  background-color: #F0F0F0; 
  border-radius: 5px;
`;

export const TextOption = styled.Text`
  font-family: 'Nunito-Medium';
  color: #000;
  margin-top: 5px;
`;



