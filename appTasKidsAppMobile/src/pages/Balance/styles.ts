
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #4DCD15;
`;

export const ContainerHeader = styled.View`
  margin-top: 60px;
  padding: 10px 10px;
  margin-bottom: 20px;
`;

export const HeaderTop = styled.View`
  align-items: center;
  justify-content: space-around;
  padding: 10px 10px;

  flex-direction: row;
  flex-wrap: nowrap;
`;

export const HeaderLeft = styled.View`
  flex-basis: 60%;
`;

export const HeaderRight = styled.View`
`;

export const HeaderLogo = styled.View`
`;

export const HeaderAmount = styled.Text`
  font-family: 'Nunito-ExtraBold';
  color: #FFF;
  text-align: left;
  font-size: 28px;
`;

export const HeaderName = styled.Text`
  font-family: 'Nunito-Regular';
  color: #FFF;
  text-align: left;
  font-size: 14px;
`;

export const ContainerOptions = styled.View`
align-items: center;
  justify-content: space-around;
  padding: 10px 10px;

  flex-direction: row;
  flex-wrap: nowrap;
`;

export const OptionIcon = styled.View`
  background-color: #F0F0F0;
  border-radius: 10px;
  width: 100%;
  padding: 20px 0;
`;

export const Option = styled(RectButton)`
  align-items: center;
  margin-top: 20px;
  flex-basis: 20%;
`; 

export const TextOption = styled.Text`
  font-family: 'Nunito-Regular';
  color: #FFF;
  text-align: left;
  font-size: 14px;
  margin-top: 10px;
`;

export const ContainerBody = styled.View`
  flex: 1;
  background-color: #F9F9F9;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: 0px 40px;
`;

export const BodyTitile = styled.Text`
   font-family: 'Nunito-ExtraBold';
    color: #4DCD15;
    text-align: left;
    margin-top: 40px;
    font-size: 18px;
`;

export const HistoricTitle = styled.Text`
    font-family: 'Nunito-Normal';
    color: #AAA;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 14px;

`;

export const ContainerHistoric = styled.View`
  width: 100%;
  background-color: #FFF;
  border-radius: 5px;
  padding: 0 10px;
`;

export const HistoricItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 20px 0;

  width: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color : #CCC;
`;


export const TextHistoric = styled.Text`
  flex-basis: 60%;
  font-family: 'Nunito-Normal';
  color: #808080;
  margin: 0 10px;
`;

export const AmountHistoric = styled.Text`
  flex-basis: 30%;
  font-family: 'Nunito-Regular';
  font-size: 14px;
`;

