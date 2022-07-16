import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { 
  Container, 
  ContainerBody, 
  ContainerHeader, 
  HeaderTop,
  HeaderLeft,
  HeaderRight,
  HeaderAmount,
  HeaderName,
  ContainerOptions,
  Option,
  OptionIcon,
  TextOption,
  BodyTitile,
  ContainerHistoric,
  TextHistoric,
  AmountHistoric,
  HistoricTitle,
  HistoricItem,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/images/logoTask.png';

import {  } from 'react-native-gesture-handler';
import api from '../../services/api';
import { Alert, RefreshControl, ScrollView, Image } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface InterfaceChildName {
  name: string,
}

interface InterfaceChildValue {
  value: number,
}

interface InterfacePurchase {
  id: number,
  product_name: string,
  amount: number
}

const Balance: React.FC = () => {
  const { signOut, child } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [childName, setChildName] = useState<InterfaceChildName>();
  const [childValue, setChildValue] = useState<InterfaceChildValue>();
  const [purchaseRealized, setPurchaseRealized] = useState<InterfacePurchase[]>([]);
  const [purchaseNotRealized, setPurchaseNotRealized] = useState<InterfacePurchase[]>([]);

  async function onRefresh() {
    setRefreshing(true);

    await loadChildren();
    await loadPurchase();

    setRefreshing(false);
  };

  async function loadChildren () {
    api.get(`/children/detalhe/${child}`).then(response => {

      setChildName(response.data[0].name);
      setChildValue(response.data[0].value);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros!',
      );

      signOut();
    });
  };

  async function loadPurchase () {
    api.get(`/purchase/realized/${child}`).then(response => {

      setPurchaseRealized(response.data);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros!',
      );

      signOut();
    });

    api.get(`/purchase/notrealized/${child}`).then(response => {

      setPurchaseNotRealized(response.data);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros!',
      );

      signOut();
    });
  };

  useEffect(() =>{
    loadChildren();
    loadPurchase();
  }, []);


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor: '#F9F9F9', zIndex: 1}}
    >
      <Container>   
        <ContainerHeader>
          <HeaderTop>
            <HeaderLeft>
              <HeaderAmount>
                $ {childValue}
              </HeaderAmount>
              <HeaderName>
                {childName}
              </HeaderName>
            </HeaderLeft>
            <HeaderRight>
              <Image source={logoImg} resizeMode="contain" style={{ width: 60, height: 60 }}></Image>
            </HeaderRight>
          </HeaderTop>

          <ContainerOptions>
            <Option onPress={() => navigation.navigate('Task')}>
              <OptionIcon>
                <Icon name="archive" size={20} style={{ textAlign: 'center' }} color="black"/>
              </OptionIcon>
              <TextOption>Tarefas</TextOption>
            </Option>

            <Option onPress={() => navigation.navigate('Shopping')}>
              <OptionIcon>
                <Icon name="shopping-bag" size={20} style={{ textAlign: 'center' }} color="black"/>
              </OptionIcon>
              <TextOption>Loja</TextOption>
            </Option>

            <Option onPress={signOut}>
              <OptionIcon>
                <Icon name="log-out" size={20} style={{ textAlign: 'center' }} color="black"/>
              </OptionIcon>
              <TextOption>Sair</TextOption>
            </Option>
          </ContainerOptions>
        </ContainerHeader>
       
        <ContainerBody>
          <BodyTitile>
            Compras Recentes
          </BodyTitile>
          <HistoricTitle>Pendentes</HistoricTitle>
          <ContainerHistoric>
            {purchaseNotRealized.map(item => (
              <HistoricItem key={item.id}>
                <Icon name="shopping-bag" size={20} style={{ textAlign: 'center', marginLeft: 8, marginRight: 8 }} color="red"/>
                <TextHistoric>{item.product_name}</TextHistoric>
                <AmountHistoric style={{ color: 'red' }}>$ {item.amount}</AmountHistoric>
              </HistoricItem>
            ))}       
          </ContainerHistoric>

          <HistoricTitle>Pagas</HistoricTitle>
          <ContainerHistoric>
            {purchaseRealized.map(item => (
              <HistoricItem key={item.id}>
                <Icon name="shopping-bag" size={20} style={{ textAlign: 'center', marginLeft: 8, marginRight: 8 }} color="green"/>
                <TextHistoric>{item.product_name}</TextHistoric>
                <AmountHistoric style={{ color: 'green' }}>$ {item.amount}</AmountHistoric>
              </HistoricItem>
            ))}       
          </ContainerHistoric>
          
        </ContainerBody>
        
      </Container>

      
    </ScrollView>
  );
}

export default Balance;