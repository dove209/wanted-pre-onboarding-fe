import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/auth/Login'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const Todos = lazy(() => import('./pages/todo/Todos'));
const TodoAdd = lazy(() => import('./pages/todo/TodoAdd'));
const TodoEdit = lazy(() => import('./pages/todo/TodoEdit'));

import { PublicRoute } from './components/PublicRoute'; //로그인 없이도 볼 수 있는 페이지
import { ProtectedRoute } from './components/ProtectedRoute'; //로그인 필수 페이지

function App() {
  return (
    <Suspense fallback={<div>...로딩중</div>}>
      <Routes>
        <Route path="auth/*" element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todos />} />
          <Route path="todo/*">
            <Route path="add" element={<TodoAdd />} />
            <Route path=":id" element={<TodoEdit />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
