import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Todos from './pages/todo/Todos';
import TodoAdd from './pages/todo/TodoAdd';
import TodoEdit from './pages/todo/TodoEdit';

import { PublicRoute } from './components/PublicRoute'; //로그인 없이도 볼 수 있는 페이지
import { ProtectedRoute } from './components/ProtectedRoute'; //로그인 필수 페이지

function App() {
  return (
    <Routes>
      <Route path='auth' element={<PublicRoute />}>
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Todos />} />
        <Route path='/todo/add' element={<TodoAdd />} />
        <Route path='/todo/:id' element={<TodoEdit />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}


export default App;
