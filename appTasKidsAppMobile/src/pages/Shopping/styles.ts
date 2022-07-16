import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`

  width: 100%;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-top: 40px;
  
`;

export const ProductLeft = styled.View`
  flex-basis: 47%;
  flex-direction: row;
  justify-content: space-around;

  flex-wrap: wrap;

`;

export const ProductBorder = styled.View`
  margin-top: 30px;

  flex-basis: 100%;

  background-color: #F3F3F3;
  border-radius: 10px;
`;


export const Product = styled(RectButton)`
  text-align: center;
  align-items: center;
  padding: 0px;

  border-radius: 5px;

  justify-content: space-around;
`;

export const TitleProduct = styled.Text`
  margin-top: 10px;
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 16px;
`;

export const AmountProduct = styled.Text`
  margin-bottom: 20px;
`;




