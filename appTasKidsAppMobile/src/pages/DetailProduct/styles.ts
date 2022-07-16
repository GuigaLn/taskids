
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  
  padding: 20px 30px;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: 'Nunito-ExtraBold';
  text-align: center;

  color: #3CDC8C;
`;

export const Information = styled.Text`
  font-size: 20px;
  color: #898989;
  font-family: 'Nunito-Regular';
`;

export const ImageView = styled.View`
  height: 200px;
  width: 200px;
  align-items: center;
`;

export const ImageProduct = styled.Image`
  height: 200px;
  width: 200px;
  border-radius: 200px;
`;