import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Button from '../../components/Button';
import InputArea from '../../components/InputArea';
import getValidationsErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';

import {
  AmountTask, Container, ContainerBody, ContainerHeader, ContainerTask, DateTask, HeaderTask, SubTitle, SubTitleTask, Title, TitleTask
} from './styles';

import { Alert, Image, ScrollView, View } from 'react-native';
import logoImg from '../../assets/images/logoTask.png';

import api from '../../services/api';

interface InterfaceTask{
  id: number,
  title: string,
  description: string,
  amount: number,
  answer: boolean,
  created_at: string,
  child: {
    name: string,
    currency: string
  }
}

interface InterfaceParams {
  taskId: number;
}

interface SignInFormData {
  inputText: string;
}

const DetailTask: React.FC = () => {
  const { signOut, child } = useAuth();
  const [tasks, setTaks] = useState<InterfaceTask[]>([]);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParms = route.params as InterfaceParams;

  useEffect(() => {
    api.get(`/task/detalhe/${routeParms.taskId}`).then(response => {
      
      setTaks(response.data);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros, realize o login novamente!',
      );

      signOut();
    });
  }, []);

  const navigateToTask = useCallback(() => {
    navigation.navigate('Task');
  }, [navigation]);

  const handleSend = useCallback(
    
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          inputText: Yup.string().min(1, 'No mínimo 1 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/task/aswner', {
          id: routeParms.taskId,
          aswner: data.inputText
        });

        navigation.navigate('SendTaskSucess');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro no envio',
          'Erro ao realizar o envio, cheque os campos!',
        );
      }
    },
    [],
  );

  return (
    
      <Container>
        <ContainerHeader>
          <View>
            <Title>Tarefa</Title>
            <SubTitle>Realize Tarefas</SubTitle>
          </View>
          <Image source={logoImg} resizeMode="contain" style={{ width: 60, height: 60 }}></Image>
        </ContainerHeader>
          
        <ContainerBody>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{backgroundColor: 'white'}}
          >
            
            {tasks.map(task => (
              <ContainerTask key={task.id}>
                  <HeaderTask>
                  <TitleTask>{task.title}</TitleTask>
                    <AmountTask>{task.child.currency.substr(0,1)}$ {task.amount}</AmountTask>  
                  </HeaderTask>
                  

                  <SubTitleTask>Descrição: {task.description}</SubTitleTask>

                  {task.answer ? 
                    <Form ref={formRef} onSubmit={handleSend} style={{marginTop: 40}}>
                      <InputArea
                        name="inputText" 
                        icon="edit"
                        placeholder="Escreva sua Resposta..." 
                        autoCorrect={false}
                        autoCapitalize="none"
                      />

                    <Button color="#4DCD15;" onPress={() => {
                      formRef.current?.submitForm();
                    }}>
                      Enviar Resposta
                    </Button>
                  </Form> 
                : <View></View>}
                  
                
                  
                <Button color="#dc3c3c;" style={{ marginTop: 20, width: '70%' }} onPress={navigateToTask}>
                    Voltar
                </Button>

                <DateTask>{`${task.created_at.substr(8,2)}/${task.created_at.substr(5,2)}/${task.created_at.substr(0,4)}`}</DateTask>
              </ContainerTask>
            ))}
          </ScrollView>
        </ContainerBody>
      </Container>
   
  );
}

export default DetailTask;