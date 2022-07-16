import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, Footer, Developer, NameDeveloper } from './styles';

import Button from '../../components/Button';
import logoImg from '../../assets/images/logoTask.png';
import { Image } from 'react-native';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>GoTask!</Title>
      <Image source={logoImg} style={{ width: 150 }} resizeMode="contain"></Image>
      <Button color="#4DCD15;" onPress={() => navigation.navigate('InitialInformation')}>Sing In</Button>

      <Footer>
        <Developer>Desenvolvedor</Developer>
        <NameDeveloper>Guilherme L. Nallon</NameDeveloper>
      </Footer>
    </Container>
  );
}

export default Welcome;