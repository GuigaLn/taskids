import React, { useEffect, useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  ContainerHeader, 
  Title, 
  SubTitle, 
  ContainerBody,
  ContainerTask,
  Option,
  TitleTask,
  SubTitleTask,
  DateTask,
  ButtonOption
} from './styles';

import logoImg from '../../assets/images/logoTask.png';
import { Image, View, Alert, ScrollView, RefreshControl } from 'react-native';

import api from '../../services/api';
import Button from '../../components/Button';

interface InterfaceTask{
  id: number,
  title: string,
  amount: number,
  answer_text: string,
  created_at: string,
  child: {
    currency: string
  }
}

const Task: React.FC = () => {
  const { signOut, child } = useAuth();
  const [tasks, setTaks] = useState<InterfaceTask[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  async function onRefresh() {
    setRefreshing(true);

    await loadTask();

    setRefreshing(false);
  };

  async function loadTask () {
    api.get(`/task/child/${child}`).then(response => {
      
      setTaks(response.data);
    }).catch(() => {
      Alert.alert(
        'Erro na inesperado',
        'Erro nos parametros, realize o login novamente!',
      );

      signOut();
    });
  };

  useEffect(() =>{
    loadTask();
  }, []);

  const navigateToDetailTask = useCallback((taskId: number) => {
    navigation.navigate('DetailTask', {taskId});
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
            <Title>Tarefas</Title>
            <SubTitle>Realize Tarefas</SubTitle>
          </View>
          <Image source={logoImg} resizeMode="contain" style={{ width: 60, height: 60 }}></Image>
        </ContainerHeader>
          
        <ContainerBody>  
          <ContainerTask>
            {tasks.map(task => {
              if(task.answer_text === null) {
                return <Option key={task.id}>
                        <ButtonOption onPress={() => navigateToDetailTask(task.id)}>
                          <TitleTask>{task.title}</TitleTask>
                          <SubTitleTask>{task.child.currency}: {task.child.currency.substr(0,1)}$ {task.amount}</SubTitleTask>
                          <DateTask>{`${task.created_at.substr(8,2)}/${task.created_at.substr(5,2)}/${task.created_at.substr(0,4)}`}</DateTask>
                        </ButtonOption>
                      </Option>;
              }
            })}  
          </ContainerTask>
          <Button color="#4DCD15" style={{ marginTop: 40}} onPress={() => navigation.navigate('Dashboard')}>Voltar</Button>
        </ContainerBody>
      </Container>
    </ScrollView>
   
  );
}

export default Task;