import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Todos from './pages/Todo/Todos';
import TodoAdd from './pages/Todo/TodoAdd';
import TodoEdit from './pages/Todo/TodoEdit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Todos />} />
      <Route path='/auth' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/todo/add' element={<TodoAdd />} />
      <Route path='/todo/:id' element={<TodoEdit />} />
    </Routes>
  );
}


export default App;
