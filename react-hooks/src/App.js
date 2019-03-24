import React, { useState } from 'react';
import { Todo } from './components/todo/todo';
import { Header } from './components/header/header';
import { Auth } from './components/auth/auth';
import { AuthContext } from './auth-context';


const App = (props) => {
  const [page, setPage] = useState('auth');

  const [authStatus, setAuthStatus] = useState(false)

  const switchPage = pageName => {
    setPage(pageName);
  };

  const login = () => {
    console.log('Login');
    
    setAuthStatus(true);
  }
  
  return (
    <div className="App">
      <AuthContext.Provider value={ { status: authStatus, login} }>
        <Header 
          onLoadTodoList={switchPage.bind(this, 'todoList')} 
          onLoadAuth={switchPage.bind(this, 'auth')}/>
        <hr />
        { page === 'auth' ? <Auth/> : <Todo/> }
      </AuthContext.Provider>    
    </div>
  );
}

export default App;
