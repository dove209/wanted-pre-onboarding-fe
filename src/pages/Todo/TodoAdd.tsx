import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useCreateTodoMuation } from '../../hooks/todo';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: auto;
  padding: 20px;
  border: 1px solid #ececec;
  box-shadow: 5px 5px 10px #ececec;
  border-radius: 10px;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
  }
  form {
    margin-top: 20px;
    input {
      width: 100%;
      height: 50px;
      padding-left: 10px;
      font-size: 1.3rem;
      border-radius: 5px;
      border: 1px solid #dedede;
    }
    input + input {
      margin-top: 20px;
    }
    button {
      margin-top: 20px;
      width: 100px;
      height: 50px;
      background-color: transparent;
      border: 1px solid #ececec;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.2rem;
      &:hover {
        color: #fff;
        background-color: #00b222;
      }
    }
  }
`;

const TodoAdd: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: createTodoMutate } = useCreateTodoMuation();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // Todo 아이템 추가하기
  const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodoMutate(
      {
        title,
        content,
      },
      {
        onSuccess: () => {
          console.log('Todo 추가 성공!!');
          navigate('/');
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            alert(error.response?.data.details);
          }
        },
      }
    );
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  return (
    <Container>
      <h1>할 일 추가 하기</h1>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitle}
        />
        <input
          type="text"
          placeholder="내용"
          value={content}
          onChange={handleContent}
        />
        <button>추가</button>
      </form>
    </Container>
  );
};

export default TodoAdd;
