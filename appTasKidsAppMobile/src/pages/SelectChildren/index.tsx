import React, { useCallback, useEffect, useState, useRef } from 'react';

import { Container, Title, ContainerTitle, SubTitle, ContainerChildren, NameChildren } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import IconUser from '../../assets/images/iconUser.png';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Image, Button, Alert, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface ChildrenInterface {
  id: number;
  name: string;
}

const SelectChildren: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [children, setChildren] = useState<ChildrenInterface[]>([]);

  const { signOut, selectChild } = useAuth();

  useEffect(() => {
    try {
    api.get('/children').then(
      Response => {
        setChildren(Response.data);
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
  }, [])

  async function handdleChild(id: any)  {
    setIsLoading(true);
    await selectChild(id);
  };

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
        <ContainerTitle>
          <Title>GoTask!</Title>
        </ContainerTitle>

        <SubTitle>Selecione a criança</SubTitle>

        {children.map(child => (
          <ContainerChildren key={child.id} onPress={() => handdleChild(child.id)}>
            <NameChildren>{child.name}</NameChildren>
            <Icon name="arrow-right" size={25} color="#4DCD15" ></Icon>
          </ContainerChildren>
        ))}
      </Container>
    </ScrollView>
  );
}

export default SelectChildren;