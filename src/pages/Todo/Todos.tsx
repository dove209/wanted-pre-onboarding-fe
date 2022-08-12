import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../../types/todos';
import { useNavigate } from 'react-router-dom';
import { getTodosAPI, deleteTodoAPI } from '../../api/todo';


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
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null)


  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (!token) {
      navigate('/auth');
    } else {
      loadTodos();
    }

  }, []);

  // 모든 Todo List 불러오기
  const loadTodos = async () => {
    try {
      const { data: { data: todos } } = await getTodosAPI();
      setTodos(todos);
      // 새로고침 시 이전에 선택했던 Todo Item Index 불러오기
      const prevIdx = localStorage.getItem('currentIdx');
      if (!!prevIdx) {
        setCurrentIdx(Number(prevIdx))
      }
    } catch (e) {
      console.log(e)
    }
  };

  // Todo 아이템 선택
  const handleTodo = (idx: number) => {
    setCurrentIdx(idx);
    history.pushState(null, 'idx')
    localStorage.setItem('currentIdx', String(idx))
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
        setCurrentIdx(null);
        localStorage.removeItem('currentIdx');
      }
    } catch (e) {
      alert('Todo 삭제 실패;;;')
      console.log(e)
    }
  }


  // Todo 아이템 추가하기
  const goToAdd = () => {
    localStorage.removeItem('currentIdx');
    navigate('todo/add');
  }

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('currentIdx');
    navigate('/auth');
  };


  return (
    <Container>
      <h1>나의 Todo List!</h1>
      <div className='listWrap'>
        <ul>
          {todos.map((todo: ITodo, idx: number) => {
            return (
              <li key={todo.id} onClick={() => handleTodo(idx)} className={idx === currentIdx ? 'active' : undefined}>
                <h1>{todo.title}</h1>
              </li>
            );
          })}
        </ul>
        <div className='todo'>
          {currentIdx !== null &&
            <>
              <p><b>제목:</b> {todos[currentIdx].title}</p>
              <p><b>내용:</b> {todos[currentIdx].content}</p>
              <p><b>생성일:</b> {new Date(todos[currentIdx].createdAt).toLocaleString()}</p>
              <p><b>수정일:</b> {new Date(todos[currentIdx].updatedAt).toLocaleString()}</p>
              <Button color='#ffc700' onClick={() => goToEditMode(todos[currentIdx].id)}>수정</Button>
              <Button color='#ff1d0a' onClick={() => removeTodo(todos[currentIdx].id)}>삭제</Button>
            </>
          }
        </div>
      </div>
      <div className='footer'>
        <Button onClick={goToAdd} color='#0bbe22'>추가하기</Button>
        <Button onClick={logout}>나가기</Button>
      </div>

    </Container>
  );
};

export default Home;
