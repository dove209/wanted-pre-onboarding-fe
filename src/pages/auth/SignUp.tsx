import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { signUpAPI } from '../../api/auth';
import * as Validator from '../../utils/validator';
import { IUser, IUserInputValid } from '../../../types/users';

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

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState<IUser>({
    email: '',
    password: '',
  });

  const [isSignUpValid, setIsSignUpValid] = useState<IUserInputValid>({
    email: false,
    password: false,
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSignUpForm({
      ...signUpForm,
      email: value,
    });
    setIsSignUpValid({
      ...isSignUpValid,
      email: Validator.emailValidator(value),
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSignUpForm({
      ...signUpForm,
      password: value,
    });
    setIsSignUpValid({
      ...isSignUpValid,
      password: Validator.passwordValidator(value),
    });
  };

  // 회원가입 하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUpValid.email && isSignUpValid.password) {
      signUpMutation.mutate({
        email: signUpForm.email,
        password: signUpForm.password,
      });
    }
  };

  const signUpMutation = useMutation(signUpAPI, {
    onSuccess: (data) => {
      const {
        data: { token },
      } = data;
      if (token) {
        alert('회원가입이 성공 하였습니다.');
        navigate('/auth/login');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.details);
      }
    },
  });

  return (
    <Container>
      <FormBox>
        <h1>회원 가입</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="이메일"
            onChange={handleEmail}
            value={signUpForm.email}
            autoFocus
            className={
              !isSignUpValid.email && signUpForm.email ? 'notVaild' : undefined
            }
          />
          <input
            type="password"
            name="password"
            autoComplete="true"
            placeholder="비밀번호 (대문자, 숫자, 특수문자 포함)"
            onChange={handlePassword}
            value={signUpForm.password}
            className={
              !isSignUpValid.password && signUpForm.password
                ? 'notVaild'
                : undefined
            }
          />
          <button
            className={
              isSignUpValid.email && isSignUpValid.password
                ? 'valid'
                : undefined
            }
          >
            가입하기
          </button>
        </form>
      </FormBox>
    </Container>
  );
};

export default SignUp;
