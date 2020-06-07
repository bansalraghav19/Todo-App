import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, TouchableWithoutFeedbackBase} from 'react-native';
import Header from './components/header'
import TodoItem from './components/todoitem'
import AddTodo from './components/addTodo'
import SandBox from './components/sandbox'

export default function App(){
  const [todos, setTodos] = useState([
    
  ]);

  const pressHandler = (key) => {
    setTodos( (prevTodos) => {
        return prevTodos.filter(todos => todos.key != key)
    })
  }

  const SubmitHandler = (text) => {
    if(text.length > 3) {
      setTodos( (prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('!OOPS', 'Todos must be over 3 chars long', [
        {
          text: 'Understood', onPress: () => console.log('alert closed')
        }
      ])
    }
  }

  return ( 
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
    <View style={styles.container}>
      <Header /> 
      <View style={styles.content}>
        <AddTodo SubmitHandler={SubmitHandler} />
        <View style={styles.list}>
          <FlatList 
            data = {todos} 
            renderItem = { ({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
  },   
  content: {
    padding: 40,
    flex: 1
  }, 
  list: {
    marginTop: 20, 
    flex: 1
  }
});
