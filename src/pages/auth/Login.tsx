import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { loginAPI } from '../../api/auth';
import * as Validator from '../../utils/validator';
import { IUser, IUserInputValid } from '../../../types/users';
import { IAuth } from '../../../types/auth';
import { useAuth } from '../../hooks/useAuth';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormBox = styled.div`
  width: 500px;
  height: 600px;
  padding: 20px;
  border: 1px solid #ececec;
  box-shadow: 5px 5px 10px #ececec;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  h1 {
    font-size: 3rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-top: 20%;
  }
  form {
    width: 100%;
    input,
    button {
      width: 100%;
      height: 50px;
      border-radius: 5px;
    }
    input {
      background-color: #ececec;
      margin-bottom: 10px;
      padding-left: 10px;
      &.notVaild {
        border: 1px solid red;
      }
    }
    button {
      background-color: #dedede;
      font-weight: bold;
      color: #fff;
      font-size: 1.3rem;
      cursor: pointer;
      &.valid {
        background-color: #00b222;
      }
    }
  }
`;

const Login: React.FC = () => {
  const { login } = useAuth() as IAuth;
  const [loginForm, setLoginForm] = useState<IUser>({
    email: '',
    password: '',
  });

  const [isLoginValid, setIsLoginValid] = useState<IUserInputValid>({
    email: false,
    password: false,
  });


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLoginForm({
      ...loginForm,
      email: value,
    });
    setIsLoginValid({
      ...isLoginValid,
      email: Validator.emailValidator(value),
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLoginForm({
      ...loginForm,
      password: value,
    });
    setIsLoginValid({
      ...isLoginValid,
      password: Validator.passwordValidator(value),
    });
  };

  // 로그인 하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginValid.email && isLoginValid.password) {
      try {
        const {
          data: { token },
        } = await loginAPI({
          email: loginForm.email,
          password: loginForm.password,
        });
        if (token) {
          login(token);
        }
      } catch (error) {
        if(error instanceof AxiosError) {
          alert(error.response?.data.details)
        }
      }
    }
  };

  return (
    <Container>
      <FormBox>
        <h1>Sniffergram</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="이메일"
            onChange={handleEmail}
            value={loginForm.email}
            autoFocus
            className={
              !isLoginValid.email && loginForm.email ? 'notVaild' : undefined
            }
          />
          <input
            type="password"
            name="password"
            autoComplete="true"
            placeholder="비밀번호 (대문자, 숫자, 특수문자 포함)"
            onChange={handlePassword}
            value={loginForm.password}
            className={
              !isLoginValid.password && loginForm.password ? 'notVaild' : undefined
            }
          />
          <button
            className={
              isLoginValid.email && isLoginValid.password ? 'valid' : undefined
            }
          >
            로그인
          </button>
        </form>
        <div className="signUp">
          아직 회원이 아니십니까? <Link to={'/auth/signUp'}>회원가입</Link>
        </div>
      </FormBox>
    </Container>
  );
};

export default Login;
