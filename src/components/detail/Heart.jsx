import React from 'react';
import { useDispatch } from 'react-redux';
import { __updatePostHeart } from '../../redux/modules/postSlice';
import { useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { BsShareFill } from 'react-icons/bs';
import styled from 'styled-components';

const Heart = ({ postId, heartCount, heartPush }) => {
  const dispatch = useDispatch();
  const onClickHeart = () => {
    dispatch(__updatePostHeart(postId));
  }

  // :: 링크 복사 기능
  const URL = {
    CLIENT: process.env.REACT_APP_CLIENT_URL,
  };
  const location = useLocation();
  const handleCopyClicpBoard = async (url) => {
    try {
      console.log(location);
      await navigator.clipboard.writeText(url);
      alert("링크 복사 성공");
    } catch (error) {
      alert("링크 복사 실패");
    }
  }

  return (
    <StPostLeftMenuBox>
      <StHeartIcon 
        className='round'
        clickHeartOn={Boolean(heartPush)}
        onClick={onClickHeart}
      >
        <FaHeart size="24" />
      </StHeartIcon>
      <div className='heartCount'>
        {`${heartCount}`}
      </div>
      <div 
        className='sharedLinkIcon round'
        onClick={() => handleCopyClicpBoard(`${URL.CLIENT}${location.pathname}`)}>
        <BsShareFill size="24" />
      </div>
    </StPostLeftMenuBox>
  );
};

export default Heart;


const StPostLeftMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 112px;
  left: 50%;
  margin-left: -470px;
  width: 4rem;
  padding: 0.5rem;
  background-color: var(--bg-color);
  border: var(--border-style);
  border-radius: 2rem;

  .round {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    border: var(--subBorder-style);
    cursor: pointer;
  }
  .round:hover {
    border: 1px solid var(--title-color);
    transform: scale(1);
    svg {
      color: var(--title-color);
    }
  }
  .sharedLinkIcon {
    background-color: var(--subBg-color);
    color: var(--subText-color);
  }
  .heartCount {
    color: var(--text-color);
    font-size: 0.75rem;
    font-weight: 700;
    margin-top: 0.5rem;
    margin-bottom: 1rem;

  }
`;

const StHeartIcon = styled.div`
  background-color: ${
    ({clickHeartOn}) => clickHeartOn===false ? 'var(--subBg-color)' : 'var(--primary-color)'
  };
  svg {
    color: ${
      ({clickHeartOn}) => clickHeartOn===false ? 'var(--subText-color)' : 'var(--subBg-color)'
    };
  }
`;