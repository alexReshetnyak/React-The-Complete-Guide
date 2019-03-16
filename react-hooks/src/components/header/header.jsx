import React from 'react';

const Header = ({ onLoadTodoList, onLoadAuth }) => {
  return ( 
    <header>
      <button onClick={onLoadTodoList}>Todo List</button> | 
      <button onClick={onLoadAuth}>Auth</button>
    </header>
   );
}
 
export { Header };