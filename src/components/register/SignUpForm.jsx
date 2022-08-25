import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostImage from './PostRegisterImage';
import { useDispatch, useSelector } from 'react-redux';
import { existMemberId } from '../../redux/modules/userActions';

const SignUpForm = (props) => {
  // 이미지 업로드 상태 관리
  const [compressedImageFile, setCompressedImageFile] = useState(null);

  const dispatch = useDispatch();

  // 회원가입 성공하면 로그인 화면으로 전환시키기
  const sendData = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.changeState();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm({ mode: 'onChange' });

  // wathc 입력 비활성화

  const success = useSelector((state) => state.user.success);

  const onSubmit = async (data) => {
    if (data.password !== data.rePassword) {
      alert('비밀번호와 일치하는지 확인하세요');
    }

    if (compressedImageFile === null) {
      alert('이미지를 입력해주세요');
    }

    // :: 서버 주소
    const URL = {
      BASE: process.env.REACT_APP_BASE_URL,
    };

    // :: image file formData 형식 변환
    const form = new FormData();
    form.append('file', compressedImageFile);

    // :: info contents blob 형식 변환

    const body = {
      username: data.username,
      account: data.userId,
      password: data.password,
      passwordConfirm: data.password,
      usercomment: data.introduction,
    };

    const json = JSON.stringify(body);
    const blob = new Blob([json], { type: 'application/json' });
    form.append('info', blob);

    try {
      const postRegisterResponse = await axios.post(
        `${URL.BASE}api/register`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    alert('회원가입 성공');
    window.location.reload();
  };

  const onError = (error) => {
    console.log(error);
  };

  const [id, setId] = useState('');

  const onChange = (event) => {
    setId(event.target.value);
  };

  const onDuplicate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(existMemberId({ account: id }));
  };

  return (
    <>
      <STh2>
        환영합니다!
        <p>기본 회원 정보를 등록해주세요.</p>
      </STh2>

      <STsection>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <PostImage setCompressedImageFile={setCompressedImageFile} />
          <h1>이름</h1>
          <input
            type='text'
            tabIndex='2'
            placeholder='이름을 입력하세요.'
            {...register('username', {
              required: '이름은 필수값입니다.',
              min: 1,
            })}
            aria-invalid={
              !isDirty ? undefined : errors.username ? 'true' : 'false'
            }
            name='username'
          />
          {errors.username && <p>{errors?.username?.message}</p>}
          <h1>아이디</h1>
          <input
            type='text'
            tabIndex='2'
            placeholder='아이디를 입력하세요.'
            {...register('userId', {
              required: '아이디는 필수값입니다.',
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: '영문자로 시작하는 영문자 또는 숫자 6~20자 ',
              },
            })}
            aria-invalid={
              !isDirty ? undefined : errors.userId ? 'true' : 'false'
            }
            name='userId'
            value={id}
            onChange={onChange}
            // 중복이면 true 중복이 아니면 false
          />
          <button className='buttonPoint' onClick={onDuplicate}>
            아이디 중복 체크
          </button>
          {errors.userId && <p>{errors?.userId?.message}</p>}
          <h1>비밀번호</h1>
          <input
            tabIndex='2'
            placeholder='비밀번호를 입력하세요.'
            {...register('password', {
              required: '비밀번호는 필수값입니다.',
              pattern: {
                value: /^[a-zA-Z]*$/,
                message: '비밀번호는 영어만 가능합니다.',
              },
            })}
            type='password'
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            name='password'
          />
          {errors.password && (
            <small role='alert'>{errors.password.message}</small>
          )}
          <h1>비밀번호 확인</h1>
          <input
            tabIndex='2'
            placeholder='비밀번호를 다시 입력하세요.'
            {...register('rePassword', {
              required: '비밀번호확인은 필수값입니다.',
              pattern: {
                value: /^[a-zA-Z]*$/,
                message: '비밀번호확인은 영어만 가능합니다.',
              },
            })}
            type='password'
            aria-invalid={
              !isDirty ? undefined : errors.repassword ? 'true' : 'false'
            }
            name='rePassword'
          />
          {errors.rePassword && (
            <small role='alert'>{errors.rePassword.message}</small>
          )}
          <h1>한줄 소개</h1>
          <input
            type='text'
            tabIndex='2'
            placeholder='한줄소개를 입력하세요.'
            {...register('introduction', {
              required: '한줄소개는 필수값입니다.',
            })}
            aria-invalid={
              !isDirty ? undefined : errors.introduction ? 'true' : 'false'
            }
            name='introduction'
          />
          {errors.introduction && (
            <small role='alert'>{errors.introduction.message}</small>
          )}
          <p className='buttonBox'>
            <button
              type='submit'
              className='buttonPoint submit-btn'
              onClick={onSubmit}
            >
              회원가입
            </button>
            <button type='button' className='submit-btn' onClick={sendData}>
              이미 회원이시라면?
            </button>
          </p>
        </form>
      </STsection>
    </>
  );
};

export default SignUpForm;

const STh2 = styled.h2`
  font-size: 3rem;
  color: var(--title-color);
  font-weight: 700;
  text-align: left;
  margin: 0px;
  p {
    font-size: 1.5rem;
    color: var(--title-color);
  }
`;

const STsection = styled.section`
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1.5rem;
    width: 80%;
    /* display: block; */
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
    .buttonBox {
    }
    button {
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      margin-right: 0.7rem;
      padding: 0.25rem 1rem;
      border-radius: 0.8rem;
      font-size: 1.25rem;
    }
  }
`;
