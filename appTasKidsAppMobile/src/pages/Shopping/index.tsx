import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { 
  Container, 
  ContainerHeader, 
  Title, 
  SubTitle, 
  ContainerBody, 
  Product,
  AmountProduct,
  TitleProduct,
  ProductLeft,
  ProductBorder
} from './styles';

import logoImg from '../../assets/images/logoTask.png';

import { Image, View, Text, Alert, ScrollView, RefreshControl} from 'react-native';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface InterfaceProduct{
  id: number,
  title: string,
  value: number,
  image: string,
}

const Shopping: React.FC = () => {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [product, setProduct] = useState<InterfaceProduct[]>([]);

  const navigation = useNavigation();


  async function onRefresh() {
    setRefreshing(true);

    await loadProduct();

    setRefreshing(false);
  };

  async function loadProduct () {
    api.get(`/reward`).then(response => {
      
      setProduct(response.data);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros, realize o login novamente!',
      );

      signOut();
    });
  };

  useEffect(() =>{
    loadProduct();
  }, []);

  const navigateToDetailProduct = useCallback((productId: number) => {
    navigation.navigate('DetailProduct', {productId});
  }, [navigation])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor: 'white'}}
    >
      <Container>
        <ContainerHeader>
          <View>
            <Title>Loja, </Title>
            <SubTitle>Boas Compras!</SubTitle>
          </View>
          <Image source={ logoImg }  resizeMode="contain" style={{ width: 60, height: 60 }}></Image>
        </ContainerHeader>
          
        <ContainerBody>
          {product.map(prod => {
            return (
              <ProductLeft key={prod.id}>
                <ProductBorder>
                  <Product onPress={() => navigateToDetailProduct(prod.id)} >
                    <View style={{ width: '100%', maxHeight: 150 }}>
                      <Image source={{ uri: `http://192.168.0.119:3333${prod.image}` }}  style={{ width: '100%', height: '100%' }}></Image>
                    </View>
                    <TitleProduct>{prod.title}</TitleProduct>
                    <AmountProduct>$ {prod.value}</AmountProduct>
                  </Product>
                </ProductBorder>
              </ProductLeft> 
            );
          })}

          
          
        </ContainerBody>
      </Container>
    </ScrollView>
  );
}

export default Shopping;