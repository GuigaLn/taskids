import React, { useCallback, useRef, useState } from 'react';

import {
  Container,
  ContainerForm,
  ContainerName,
  NameApp,
  SingUp,
  TextSingUp, TitleInput
} from './styles';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationsErrors from '../../utils/getValidationErrors';


import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import api from '../../services/api';

interface SignInFormData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {      
      const phoneRegExp = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().min(6, 'No mínimo 6 dígitos').max(50, 'No maxímo 50 dígitos'),
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido!'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Confirmação incorreta",
          ),
          phone: Yup.string().matches(phoneRegExp, 'Formato de telefone inválido. Dígite apenas números!')
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      
        await api.post('/users', {
          ...data
        });

      

      setIsLoading(false);
      Alert.alert(
        'Erro ao cadastrar',
        'Erro ao realizar o cadastro, cheque os campos!',
      );
  
        navigation.navigate('SingIn');
        
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }

        if(err.response.data && err.response.data.message) {
          Alert.alert(
            'Erro ao cadastrar',
            'E-mail já está em uso!',
          );
        } else {
          Alert.alert(
            'Erro ao cadastrar',
            'Erro ao realizar o o cadastro, cheque os campos!',
          );
        }        
      }
    },
    [],
  );



  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>

      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '1000px', justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#00ff00" />
			</View>

          
        <Container>
          <ContainerName>
            <NameApp>Cadastrar usuário</NameApp>

          </ContainerName>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ContainerForm>
            <TitleInput>Nome</TitleInput>
              <Input
                name="name"
                icon="mail"
                placeholder="Ex. GoTask@gmail.com"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <TitleInput>E-mail</TitleInput>
              <Input
                name="email"
                icon="mail"
                placeholder="Ex. GoTask@gmail.com"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <TitleInput>Senha</TitleInput>
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="*****"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <TitleInput>Confirmar Senha</TitleInput>
              <Input
                ref={passwordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="*****"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <TitleInput>Telefone</TitleInput>
              <Input
                ref={passwordInputRef}
                name="phone"
                icon="lock"
                placeholder="*****"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </ContainerForm>

            <Button
              color="#4DCD15;"
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Login
            </Button>
            <SingUp>
              <Text>Ou</Text>
              <TextSingUp>Cadastre-se aqui</TextSingUp>
            </SingUp>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
