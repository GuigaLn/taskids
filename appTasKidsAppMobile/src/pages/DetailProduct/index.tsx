import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Title, Information, ImageView, ImageProduct } from './styles';

import Icon from 'react-native-vector-icons/Feather';

import bolaImg from '../../assets/images/tenis.jpg';

import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { Alert, Image, View } from 'react-native';

interface InterfaceParams {
  productId: number;
}

interface InterfaceProduct {
  id: number,
  title: string,
  description: string,
  value: number,
  image: string
}

const DetailProduct: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [product, setProduct] = useState<InterfaceProduct[]>([]);
  const routeParms = route.params as InterfaceParams;
  const { signOut, child } = useAuth();

  useEffect(() => {
    api.get(`/reward/detalhe/${routeParms.productId}`).then(response => {

      setProduct(response.data);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros, realize o login novamente!',
      );

      signOut();
    });
  }, []);

  const handleSend = useCallback(async (product_name: string, amount: number, image: string) => {
      try {
        console.log(amount)
        await api.post('/purchase', {
          product_name,
          amount,
          image,
          child_id: child
        });
        navigation.navigate('SendTaskSucess');
      } catch (err) {
        Alert.alert(
          'Erro ao Comprar',
          'Verifique se possui saldo!',
        );
      }
    },
    [], );

  return (
    <>
      {product.map(prod => (
        <Container key={prod.id}>
          <ImageView>
            <ImageProduct source={{ uri: `http://192.168.0.119:3333${prod.image}` }}></ImageProduct>
          </ImageView>
          <Title>{prod.title}</Title>
          <Information>{prod.description}</Information>
          <Title>$ {prod.value}</Title>
          <Button color="#3CDC8C;" onPress={() => handleSend(prod.title, prod.value,prod.image)}>Comprar</Button>
          <Button color="#dc3c3c;" style={{ width: '70%' }} onPress={() => navigation.navigate('Shopping')}>Voltar</Button>
        </Container>
      )  
      )}
    </>
      
  );
}

export default DetailProduct;