import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { ITodo } from '../../../types/todos';
import { IAuth } from '../../../types/auth';
import { useAuth } from '../../hooks/auth/useAuth';
import { useDeleteTodoMuation, useTodos } from '../../hooks/todo';
import todoCache from '../../model/todo';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
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
  .listWrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    height: 550px;
    ul {
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background: #dedede;
        border-radius: 10px;
      }
      li {
        border: 1px solid #ececec;
        border-radius: 5px;
        padding: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        &.active {
          background-color: #ececec;
        }
      }
      li + li {
        margin-top: 10px;
      }
    }
    .todo {
      flex: 1;
      margin-left: 30px;
      font-size: 1.5rem;
      b {
        font-weight: bold;
      }
      p + p {
        margin-top: 10px;
      }
      button {
        margin-top: 20px;
      }
      button + button {
        margin-left: 10px;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  color: #fff;
  background: ${(props) => props.color || 'black'};
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: deleteTodoMutate } = useDeleteTodoMuation(); // Todo ????????? ?????? Mutation

  const { logout } = useAuth() as IAuth;

  const queryClient = useQueryClient();
  const [currentIdx, setCurrentIdx] = useState<number>(-1); //?????? ????????? Todo Item Index

  useEffect(() => {
    syncCurreIdx();
  }, []);

  // ?????? Todo List ????????????
  const { isLoading, data: todos, error } = useTodos();

  // ????????? ???????????? Todo Item Index??? ?????? Todo Item Index ?????????
  const syncCurreIdx = () => {
    const prevIdx = localStorage.getItem('prevIdx');
    if (!!prevIdx) {
      setCurrentIdx(Number(prevIdx));
    }
  };

  // Todo ????????? ??????
  const handleTodo = (idx: number) => {
    setCurrentIdx(idx);
    localStorage.setItem('prevIdx', String(idx));
  };

  // Todo ????????? ?????? ????????? ??????
  const goToEditMode = (id: string) => {
    navigate(`todo/${id}`);
  };

  // Todo ????????? ??????
  const deleteTodo = async (id: string) => {
    if (window.confirm('?????? ?????? ???????????????????')) {
      deleteTodoMutate(id, {
        onSuccess: () => {
          console.log('Todo ?????? ??????!!');
          setCurrentIdx(-1);
          localStorage.removeItem('prevIdx');
          queryClient.invalidateQueries(todoCache.todos);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            alert(error.response?.data.details);
          }
        },
      });
    }
  };

  // Todo ????????? ????????????
  const goToAdd = () => {
    localStorage.removeItem('prevIdx');
    navigate('todo/add');
  };

  // ????????????
  const handleLogout = () => {
    localStorage.removeItem('prevIdx');
    logout();
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <Container>
      <h1>?????? Todo List!</h1>
      <div className="listWrap">
        <ul>
          {todos?.map((todo: ITodo, idx: number) => {
            return (
              <li
                key={todo.id}
                onClick={() => handleTodo(idx)}
                className={idx === currentIdx ? 'active' : undefined}
              >
                <h1>{todo.title}</h1>
              </li>
            );
          })}
        </ul>
        <div className="todo">
          {currentIdx > -1 && !!todos && (
            <>
              <p>
                <b>??????:</b> {todos[currentIdx]?.title}
              </p>
              <p>
                <b>??????:</b> {todos[currentIdx]?.content}
              </p>
              <p>
                <b>?????????:</b>{' '}
                {new Date(todos[currentIdx]?.createdAt).toLocaleString()}
              </p>
              <p>
                <b>?????????:</b>{' '}
                {new Date(todos[currentIdx]?.updatedAt).toLocaleString()}
              </p>
              <Button
                color="#ffc700"
                onClick={() => goToEditMode(todos[currentIdx]?.id)}
              >
                ??????
              </Button>
              <Button
                color="#ff1d0a"
                onClick={() => deleteTodo(todos[currentIdx]?.id)}
              >
                ??????
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="footer">
        <Button onClick={goToAdd} color="#0bbe22">
          ????????????
        </Button>
        <Button onClick={handleLogout}>?????????</Button>
      </div>
    </Container>
  );
};

export default Home;
