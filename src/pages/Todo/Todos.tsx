import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../../types/todos';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { getTodosAPI, deleteTodoAPI } from '../../api/todo';
import { IAuth } from '../../../types/auth';
import { useAuth } from '../../hooks/useAuth';


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
      flex:1;
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
        &.active{
          background-color: #ececec
        }
      }
      li + li {
        margin-top: 10px;
      }
    }
    .todo {
      flex:1;
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
        margin-left: 10px
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
    background: ${props => props.color || 'black'};
`


const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth() as IAuth;

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(-1); //현재 선택된 Todo Item Index

  useEffect(() => {
    loadTodos();
    syncCurreIdx();
  }, []);

  // 모든 Todo List 불러오기
  const loadTodos = async () => {
    try {
      const { data: { data: todos } } = await getTodosAPI();
      if(!!todos) {
        setTodos(todos);
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        alert(error.response?.data.details)
      }
    }
  };

  // 이전에 선택했던 Todo Item Index로 현재 Todo Item Index 동기화
  const syncCurreIdx = () => {
    const prevIdx = localStorage.getItem('prevIdx');
    if (!!prevIdx) {
      setCurrentIdx(Number(prevIdx))
    }
  }


  // Todo 아이템 선택
  const handleTodo = (idx: number) => {
    setCurrentIdx(idx);
    localStorage.setItem('prevIdx', String(idx))
  }

  // Todo 아이템 수정 모드로 진입
  const goToEditMode = (id: string) => {
    navigate(`todo/${id}`)
  }

  // Todo 아이템 삭제
  const removeTodo = async (id: string) => {
    try {
      const { data: { data } } = await deleteTodoAPI(id);
      if (data === null) {
        console.log('Todo 삭제 성공!!')
        loadTodos()
        setCurrentIdx(-1);
        localStorage.removeItem('prevIdx');
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        alert(error.response?.data.details)
      }
    }
  }


  // Todo 아이템 추가하기
  const goToAdd = () => {
    localStorage.removeItem('prevIdx');
    navigate('todo/add');
  }

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('prevIdx');
    logout()
  };


  return (
    <Container>
      <h1>나의 Todo List!</h1>
      <div className='listWrap'>
        <ul>
          {todos.map((todo: ITodo, idx: number) => {
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
        <div className='todo'>
          {currentIdx > -1 &&
            <>
              <p><b>제목:</b> {todos[currentIdx]?.title}</p>
              <p><b>내용:</b> {todos[currentIdx]?.content}</p>
              <p><b>생성일:</b> {new Date(todos[currentIdx]?.createdAt).toLocaleString()}</p>
              <p><b>수정일:</b> {new Date(todos[currentIdx]?.updatedAt).toLocaleString()}</p>
              <Button color='#ffc700' onClick={() => goToEditMode(todos[currentIdx]?.id)}>수정</Button>
              <Button color='#ff1d0a' onClick={() => removeTodo(todos[currentIdx]?.id)}>삭제</Button>
            </>
          }
        </div>
      </div>
      <div className='footer'>
        <Button onClick={goToAdd} color='#0bbe22'>추가하기</Button>
        <Button onClick={handleLogout}>나가기</Button>
      </div>

    </Container>
  );
};

export default Home;
