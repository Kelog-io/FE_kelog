import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/modules/userActions';

const LoginForm = (props) => {
  // 로그인 성공시 props.onClose
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm({ mode: 'onChange' });

  // wathc 입력 비활성화

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('access-token');

  const { loading, userInfo, userToken } = useSelector((state) => state.user);

  const sendData = (event) => {
    event.preventDefault();
    props.changeState();
  };

  const [data, setData] = useState({
    account: '',
    password: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  if (userToken) {
    alert('로그인 성공');
    window.location.reload();
  }

  const onSubmit = async () => {
    const body = {
      account: data.account,
      password: data.password,
    };
    dispatch(userLogin(body));
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <>
      <STh2>로그인</STh2>
      <STsection>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>아이디</h1>
          <input
            type='text'
            tabIndex='2'
            placeholder='아이디를 입력하세요.'
            {...register('account', {
              required: '아이디는 필수값입니다.',
            })}
            aria-invalid={
              !isDirty ? undefined : errors.userId ? 'true' : 'false'
            }
            name='account'
            onChange={onChange}
            value={data.account}
          />
          {/* {errors.userId && <p>{errors?.userId?.message}</p>} */}
          <h1>비밀번호</h1>
          <input
            tabIndex='2'
            placeholder='비밀번호를 입력하세요.'
            {...register('password', {
              required: '비밀번호는 필수값입니다.',
            })}
            type='password'
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            name='password'
            onChange={onChange}
            value={data.password}
          />
          {/* {errors.password && (
            <small role='alert'>{errors.password.message}</small>
          )} */}
          <div className='submit-box'>
            <button type='button' className='submit-btn' onClick={onSubmit}>
              로그인
            </button>
            <button type='button' className='submit-btn' onClick={sendData}>
              아직 회원이 아니신가요?
            </button>
            <button
              type='button'
              className='submit-btn'
              onClick={props.onClose}
            >
              홈 화면으로
            </button>
          </div>
        </form>
      </STsection>
    </>
  );
};

export default LoginForm;

const STh2 = styled.h2`
  font-size: 3rem;
  color: var(--title-color);
  font-weight: 700;
  text-align: left;
  margin: 0px;
`;

const STsection = styled.section`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  transform: translateY(-20%);
  form {
    margin-top: 1.5rem;
    width: 100%;
    display: block;
    h1 {
      width: 100%;
      text-align: left;
      font-weight: bold;
      color: var(--title-color);
      margin-bottom: 0.5rem;
    }
    input {
      margin-top: 0.1rem;
      margin-bottom: 0.5rem;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      border-top: 0px solid var(--title-color);
      border-left: 0px solid var(--title-color);
      border-right: 0px solid var(--title-color);
      border-bottom: 1px solid var(--subGray-color);
      font-size: 1rem;
      color: var(--title-color);
      flex: 1 1 0%;
      padding: 0.5rem;
      font-size: 1.2rem;
      width: 100%;
      background: var(--bg-color);
      outline: none;
      display: block;
    }
    .submit-box {
      display: flex;
      flex-direction: column;
      .submit-btn {
        width: 100%;
        margin-top: 1.2rem;
      }
    }
    button {
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 1.25rem;
    }
  }
`;
