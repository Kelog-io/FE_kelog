import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MainPostCard from './MainPostCard';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/modules/mainPostSlice';
import 'react-intersection-observer';

/*
  무한 스크롤 구현 순서
  1.관찰 대상을 만들자 
  ->리스트의 다음에 빈 div태그를 생성하여 관찰 대상으로 설정 
  
  2.관찰자를 만들자
*/

const MainContainer = ({ data }) => {
  const dispatch = useDispatch();
  console.log(data);
  // const clickedData = useSelector((state) => state.post.clickData);
  // console.log(clickedData);
  // 리덕스 필터마다 state를 저장해두고
  // state에 맞는 데이터를 가져와서 뿌려줌

  // 최신 페이지
  const mainData = useSelector((state) => state.post.post);
  // 트렌딩 페이지
  const trending = useSelector((state) => state.post.trendingPost);
  // 오늘
  const today = useSelector((state) => state.post.todayPost);
  // 이번 주
  const week = useSelector((state) => state.post.weekPost);
  // 이번 달
  const month = useSelector((state) => state.post.monthPost);
  // 올해
  const year = useSelector((state) => state.post.yearPost);
  // 마이 페이지
  const myPage = useSelector((state) => state.post.myPost);

  // 로딩
  const [isLoading, setLoading] = useState(false);

  // 최신 페이지
  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <Stwrapper>
      <div className='main'>
        <div className='main-box'>
          {data === '오늘' &&
            mainData &&
            mainData.map((item) => <MainPostCard key={item.id} item={item} />)}
          {data === '이번 주' &&
            mainData &&
            mainData.map((item) => <MainPostCard key={item.id} item={item} />)}
          {data === '이번 달' &&
            mainData &&
            mainData.map((item) => <MainPostCard key={item.id} item={item} />)}
          {data === '올해' &&
            mainData &&
            mainData.map((item) => <MainPostCard key={item.id} item={item} />)}
        </div>
      </div>
    </Stwrapper>
  );
};

export default MainContainer;

const Stwrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  .main {
    flex: 1 1 0%;
    .main-box {
      display: flex;
      margin: -1rem;
      flex-wrap: wrap;
    }
  }
`;
