import React, { useState } from 'react';
import { Todo } from './components/todo/todo';
import { Header } from './components/header/header';
import { Auth } from './components/auth/auth';

const App = (props) => {
  const [page, setPage] = useState('auth');

  const switchPage = pageName => {
    setPage(pageName);
  };
  
  return (
    <div className="App">
      <Header 
        onLoadTodoList={switchPage.bind(this, 'todoList')} 
        onLoadAuth={switchPage.bind(this, 'auth')}/>
      
      { page === 'auth' ? <Auth/> : <Todo/> }
    </div>
  );
}

export default App;
