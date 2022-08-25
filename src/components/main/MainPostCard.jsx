import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MainPostCard = ({ item }) => {
  const year = item.createdAt[0];
  const month = item.createdAt[1];
  const day = item.createdAt[2];
  const img = item.imgUrl;
  const postId = item.id;
  const userAccount = localStorage.getItem('user-info');
  const userImage = localStorage.getItem('user-profile');

  // 하트 카운트가 없다.(null)  / 작성자도 없다.

  return (
    <Stwrapper>
      <NavLink className='card-image' to={`/post/${postId}`}>
        <div className='image-box'>
          <img src={img} alt='main-img' />
        </div>
      </NavLink>
      <div className='content'>
        <a className='content-title'>
          <h4>{item.title}</h4>
          <div className='content-content'>
            <p>{item.content}</p>
          </div>
        </a>
        <div className='sub-info'>
          <span>
            {year}년 {month}월 {day}일
          </span>
          {/* <span className='separator'>·</span>
          <span>{}개의 댓글</span> */}
        </div>
      </div>
      <div className='user-info'>
        <a className='user'>
          <img
            src={item.profileimage}
            alt='user thumbnail of geeneve'
          />
          <span>
            by <b>{item.account}</b>
          </span>
        </a>
        <div className='likes'>
          <svg width='24' height='24' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z'
            ></path>
          </svg>
          {item.heartCount}
        </div>
      </div>
    </Stwrapper>
  );
};

export default MainPostCard;

const Stwrapper = styled.div`
  border: 1px solid gray;
  width: 23.5rem;
  background: var(--bg-element1);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  a {
    display: block;
    color: inherit;
    text-decoration: none;
    .image-box {
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
  }
  .content {
    padding: 1rem;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    a {
      display: block;
      color: inherit;
      text-decoration: none;
      h4 {
        font-size: 1rem;
        margin: 0px 0px 0.25rem;
        line-height: 1.5;
        word-break: break-word;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: var(--text1);
      }
      .content-content {
        flex: 1 1 0%;
      }
    }
  }
  .sub-info {
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--text3);
    .separator {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  }
  .user-info {
    padding: 0.625rem 1rem;
    border-top: 1px solid var(--border4);
    display: flex;
    font-size: 0.75rem;
    line-height: 1.5;
    -webkit-box-pack: justify;
    justify-content: space-between;
    .user {
      text-decoration: none;
      color: inherit;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      img {
        object-fit: cover;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        margin-right: 0.5rem;
      }
      span {
        color: var(--text3);
      }
    }
    .likes {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      svg {
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.5rem;
      }
    }
  }
`;
