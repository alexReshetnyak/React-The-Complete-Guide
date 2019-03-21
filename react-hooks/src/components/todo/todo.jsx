import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Todo = (props) => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [saveCounter, setSaveCounter] = useState(0);

  const fetchTodoList = async () => {
    try {
      const { data: todoList } = await axios.get(
        'https://react-hooks-782b6.firebaseio.com/todos.json'
      );

      const mappedTodoList = Object.keys(todoList).map(key => ({
        id: key,
        name: todoList[key].name
      }));

      setTodoList(mappedTodoList);
    } catch (error) {
      console.error(error);
    }
  };
  

  // * This hook will be executed when component run first time
  useEffect(() => {
    console.log('Use effect called');
    fetchTodoList();

    return () => {
      // * this function will run before every run useEffect except first time
      // * Also it will be triggered when component destroyed
      return console.log('Clean Up');
    }
  }, 
    [saveCounter] // * If any value in array will change, useEffect will run again
  );

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      console.log('Component UnMount');
    };
  }, []);

  useEffect(() => {
    submittedTodo && setTodoList([...todoList, submittedTodo]);
  }, [submittedTodo]);
  

  const inputChangeHandler = ({ target }) => {
    setTodoName(target.value);
  };

  const todoAddHandler = async () => {
    try {   
      const { data: savedItem } = await axios.post(
        'https://react-hooks-782b6.firebaseio.com/todos.json',
        { name: todoName }
      );

      const todoItem = { id: savedItem.name, name: todoName };

      setTodoName('');
      setSubmittedTodo(todoItem);

      console.log('Saved Item', savedItem);
      setSaveCounter(1 + saveCounter);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <input 
        type="text" 
        placeholder='Todo'
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type='button' onClick={todoAddHandler}>Add</button>
      <ul>
        { todoList.map(todo => <li key={todo.id}>{ todo.name }</li>) }
      </ul>
    </React.Fragment>
  );
}
 
export { Todo };