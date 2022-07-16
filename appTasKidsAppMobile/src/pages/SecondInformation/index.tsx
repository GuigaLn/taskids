import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, Information, ContainerImage } from './styles';

import ChildrenImage from '../../assets/images/childrenImage.png'
import Button from '../../components/Button';
import { Image } from 'react-native';

const SecondInfomation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>   
      <ContainerImage>
        <Image source={ChildrenImage}></Image>
      </ContainerImage>
      
      <Title>Crie e Gerencie</Title>
      <Information>Crie sua conta de administrador e gerencie as atividades de suas criança, e proporcie a elas diversão e recompensas, por cada tarefa completada.</Information>
      <Button color="#4DCD15;" onPress={() => navigation.navigate('SingIn')}>Seguinte</Button>
    </Container>
  );
}

export default SecondInfomation;