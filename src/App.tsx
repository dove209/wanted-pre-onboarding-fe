import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Todos from './pages/todo/Todos';
import TodoAdd from './pages/todo/TodoAdd';
import TodoEdit from './pages/todo/TodoEdit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Todos />} />
      <Route path='/auth' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/todo/add' element={<TodoAdd />} />
      <Route path='/todo/:id' element={<TodoEdit />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}


export default App;
