import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, Information, ContainerImage, NameApp } from './styles';

import AnimalImage from '../../assets/images/animaisImage.png'
import { Image } from 'react-native';

import Button from '../../components/Button';

const InfromationOne: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      
      <ContainerImage>
        <Image source={AnimalImage}></Image>
      </ContainerImage>
      
      <Title>Bem-Vindo</Title>
      <Information>O Aplicativo <NameApp>GoTask!</NameApp>,  tem como objetivo principal proporcior a educação de maneira divertida e diferente.</Information>
      <Button color="#4DCD15;" onPress={() => navigation.navigate('SecondInfomation')}>Seguinte</Button>
    </Container>
  );
}

export default InfromationOne;