import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  ContainerHeader, 
  Title, 
  SubTitle, 
  ContainerBody, 
  Message, 
  TitleMessage, 
  SubTitleMessage, 
  ViewMessage,
  ContainerOptions,
  Option,
  TextOption
} from './styles';

import logoImg from '../../assets/images/logoTask.png';
import { Image, View, Alert, ScrollView } from 'react-native';

import api from '../../services/api';

import AnimalImage from '../../assets/images/animaisImage.png'

interface InterfaceChild {
  name: string,
}

const Dashboard: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const { signOut, child } = useAuth();
  const [childInformation, setChildInformation] = useState<InterfaceChild>();
  const navigation = useNavigation();


  useEffect(() => {
    try {
      api.get(`/children/detalhe/${child}`).then(response => {
        setChildInformation(response.data[0].name);
        setIsLoading(false);
      }).catch(() => {
        Alert.alert(
          'Erro na inesperado',
          'Erro nos parametros, realize o login novamente!',
        );
        signOut();
      });
    } catch(err) {
      signOut();
    }
  });

  
  if(isLoading) {
    return ( 
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#00ff00" /> 
      </View>
    )
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor: 'white'}}
    >
      <Container>
        <ContainerHeader>
          <View>
            <Title>Olá de volta,</Title>
            <SubTitle>{childInformation}</SubTitle>
          </View>
          <Image source={logoImg} resizeMode="contain" style={{ width: 60, height: 60 }}></Image>
        </ContainerHeader>
          
        <ContainerBody>
          <Message>
            <ViewMessage>
              <TitleMessage>Educação, algo fundamental!</TitleMessage>
              <SubTitleMessage>Juntos é melhor!</SubTitleMessage>
            </ViewMessage>
            <Image source={AnimalImage} style={{ width: 80, height: 80  }} ></Image>
          </Message>

          <ContainerOptions>
            <Option onPress={() => navigation.navigate('Task')}>
              <Icon name="archive" size={20} style={{ textAlign: 'center' }} color="black"/>
              <TextOption>Tarefas</TextOption>
            </Option>

            <Option onPress={() => navigation.navigate('Shopping')}>
              <Icon name="shopping-bag" size={20} style={{ textAlign: 'center' }} color="black"/>
              <TextOption>Loja</TextOption>
            </Option>

            <Option onPress={() => navigation.navigate('Balance')}>
              <Icon name="credit-card" size={20} style={{ textAlign: 'center' }} color="black"/>
              <TextOption>Saldo</TextOption>
            </Option>

            <Option onPress={signOut}>
              <Icon name="log-out" size={20} style={{ textAlign: 'center' }} color="black"/>
              <TextOption>Sair</TextOption>
            </Option>
          </ContainerOptions>
        </ContainerBody>
      </Container>
    </ScrollView>
  );
}

export default Dashboard;