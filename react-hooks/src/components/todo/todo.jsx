import React, { useEffect, useReducer, useRef, useState, useMemo } from 'react';
import axios from 'axios'
import { List } from '../List/List';
import { useFormInput } from '../../hooks/forms'; // * Custom hook

const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.payload);

    case 'SET':
      return action.payload;

    case 'REMOVE':
      return state.filter(todo => todo.id !== action.payload);
    
    default:
      return state;
  }    
};

const Todo = (props) => {
  // const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);
  // const [submittedTodo, setSubmittedTodo] = useState(null);

  const todoInput = useFormInput();
  // const todoInputRef = useRef();
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  const fetchTodoList = async () => {
    try {
      const { data: todoList } = await axios.get(
        'https://react-hooks-782b6.firebaseio.com/todos.json'
      );

      const mappedTodoList = Object.keys(todoList).map(key => ({
        id: key,
        name: todoList[key].name
      }));

      dispatch({ type: 'SET', payload: mappedTodoList });
    } catch (error) {
      console.error(error);
    }
  };

  
  // * This hook will be executed when component run first time
  useEffect(() => {
    fetchTodoList();

    return () => {
      // * this function will run before every run useEffect except first time
      // * Also it will be triggered when component destroyed
      return console.log('Clean Up');
    }
  }, 
    [] // * If any value in array will change, useEffect will run again
  );

  // const mouseMoveHandler = event => {
  //   // console.log(event.clientX, event.clientY);
  // };

  
  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   return () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //     console.log('Component UnMount');
  //   };
  // }, []);

  // useEffect(() => {
  //   submittedTodo && dispatch({ type: 'ADD', payload: submittedTodo });
  // }, [submittedTodo]);
  

  // const inputChangeHandler = ({ target }) => {
  //   setTodoName(target.value);
  // };

  const todoAddHandler = async () => {
    const todoName = todoInput.value; // * input Node el value

    try {   
      const { data: savedItem } = await axios.post(
        'https://react-hooks-782b6.firebaseio.com/todos.json',
        { name: todoName }
      );

      const todoItem = { id: savedItem.name, name: todoName };
      dispatch({ type: 'ADD', payload: todoItem });
    } catch (error) {
      console.error(error);
    }
  };

  const todoRemoveHandler = async todoID => {
    try {
      await axios.delete(
        `https://react-hooks-782b6.firebaseio.com/todos/${todoID}.json`,
      );
      dispatch({ type: 'REMOVE', payload: todoID });   
    } catch (error) {
      console.error(error);      
    }
  };

  // const inputValidationHandler = (event) => {
  //   event.target.value.trim() ? 
  //     setInputIsValid(true) :
  //     setInputIsValid(false);
  // };

  return (
    <React.Fragment>
      <input 
        type="text" 
        placeholder='Todo'
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{backgroundColor: todoInput.validity ? 'transparent' : 'red' }}
      />
      <button type='button' onClick={todoAddHandler}>Add</button>
      { // * useMemo is used for cashed value if input don't change (worked like shouldUpdate hook)
        useMemo(
          () => <List items={todoList} onClickHandler={todoRemoveHandler}/>, 
          [todoList]
        )
      }
    </React.Fragment>
  );
}
 
export { Todo };