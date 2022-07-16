import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, Information } from './styles';

import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';

const SecondInfomation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>   
      <Title>Sucesso!</Title>
      <Information>A operação foi um sucesso!</Information>
      <Icon name="smile" size={100} color="#3CDC8C" ></Icon>
      <Button color="#3CDC8C;" onPress={() => navigation.navigate('Dashboard')}>Voltar</Button>
    </Container>
  );
}

export default SecondInfomation;