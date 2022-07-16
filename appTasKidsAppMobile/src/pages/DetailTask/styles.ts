import styled from 'styled-components/native';

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
  margin-top: 20px;
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
  padding: 20px 0px;
`;

export const ContainerTask = styled.View`
  flex: 1;
`;

export const Option = styled.View`
  margin-top: 40px;
 
  background-color: #F0F0F0; 
  border-radius: 10px;

  border-left-width: 4px;
  border-left-color : #F4B427;
`;

export const HeaderTask = styled.View`
  justify-content: space-between;
  flex-direction: column; 

  margin-top: 40px;
  width: 100%;

`;

export const TitleTask = styled.Text`
  flex-basis: 100%;
  color: #EA5D20;
  font-size: 18px;
  font-family: 'Nunito-Bold';
  text-align: left;
`;

export const AmountTask = styled.Text`
  flex-basis: 100%;
   color: #F4B427;
  font-size: 22px;
  font-family: 'Nunito-Bold';
  margin-top: 20px;
  text-align: right;
`;

export const SubTitleTask = styled.Text`
  color: #808080;
  font-size: 16px;
  font-family: 'Nunito-Medium';

  margin-top: 50px;
  margin-bottom: 50px;
`;

export const DateTask = styled.Text`
  text-align: right;
  color: #797979;
  font-size: 14px;
  font-family: 'Nunito-Bold';

  margin-top: 50px;
`;

export const TitleInput = styled.Text`
font-family: 'Nunito-Medium';
font-size: 16px;
margin-left: 10px;
margin-top: 20px;

color: #606060;

`;






