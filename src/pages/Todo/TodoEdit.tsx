import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { getTodoByIdAPI, updateTodoAPI } from '../../api/todo';
import { TodoInputType } from '../../../types/todos';

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

const TodoEdit: React.FC = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState<TodoInputType>({
        title: '',
        content: ''
    });

    useEffect(() => {
        getTodo()
    }, [])

    // ID로 Todo 아이템 불러오기
    const getTodo = async () => {
        try {
            const { data: { data: todo } } = await getTodoByIdAPI(id);
            if(!!todo) {
                setTodo(todo)
            }
        } catch (error) {
            if(error instanceof AxiosError) {
              alert(error.response?.data.details)
            }
        }
    };

    // Todo 아이템 수정하기
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data: { data } } = await updateTodoAPI(id, {
                title: todo.title,
                content: todo.content
            })
            if (data) {
                console.log('Todo 수정 성공!!!')
                navigate('/');
            }
        } catch (e) {
            alert('Todo 수정 실패;;;')
            console.log(e)
        }
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTodo({
            ...todo,
            title: value,
        });
    };

    const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTodo({
            ...todo,
            content: value,
        });
    };

    return (
        <Container>
            <h1>할 일 수정 하기</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={todo?.title}
                    onChange={handleTitle}
                />
                <input
                    type="text"
                    placeholder="내용"
                    value={todo?.content}
                    onChange={handleContent}
                />
                <button>수정</button>
            </form>


        </Container>
    )
}

export default TodoEdit