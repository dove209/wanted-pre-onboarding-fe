import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../types/todos';
import { useNavigate } from 'react-router-dom';
import { getTodos } from '../services/todo';


const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 700px;
  padding: 20px;
  border: 1px solid #ececec;
  box-shadow: 5px 5px 10px #ececec;
  border-radius: 10px;
  & > h1 {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
  }
  ul {
    margin-top: 20px;
    background-color: red;
  }
`;


const Home: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const navigate = useNavigate();

  const loadTodos = async () => {
    const todos = await getTodos() as ITodo[];
    setTodos(todos);
  };

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (!token) {
      navigate('/auth');
    } else {
      loadTodos();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('access-token');
    navigate('/auth');
  };

  return (
    <Container>
      <h1>My ToDo List!</h1>
      <ul>
        {todos.map((todo: ITodo) => {
          return (
            <li key={todo.id}>
              <h1>{todo.title}</h1>
              <p>{todo.content}</p>
            </li>
          );
        })}
      </ul>
      <button onClick={logout}>나가기</button>
    </Container>
  );
};

export default Home;
