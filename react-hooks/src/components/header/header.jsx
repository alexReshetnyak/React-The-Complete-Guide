import React, { useContext } from 'react';
import { AuthContext } from '../../auth-context';

const Header = ({ onLoadTodoList, onLoadAuth }) => {
  const auth = useContext(AuthContext);

  return ( 
    <header>
      { 
        auth.status &&
        <button onClick={onLoadTodoList}>Todo List</button> 
      }
      <button onClick={onLoadAuth}>Auth</button>
    </header>
   );
}
 
export { Header };