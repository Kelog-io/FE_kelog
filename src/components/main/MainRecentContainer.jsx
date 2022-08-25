import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MainPostCard from './MainPostCard';
import 'react-intersection-observer';
import axios from 'axios';

const MainRecentContainer = () => {
  const [randomData, setRandomData] = useState([]);
  const pages = useRef(0);

  const addPages = () => {
    pages.current++;
  };

  const [lastIntersectingData, setLastIntersectingData] = useState(null);
  //fetching 함수
  const getRandomData = async () => {
    console.log('fetching함수 호출됨');
    try {
      const { data } = await axios.get(
        `http://3.38.48.108/api/post?Category=NEW&size=10&page=${pages.current}`
      );
      setRandomData(randomData.concat(data));
      console.log(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  //observe 콜백 함수
  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        pages.current++;
        // 현재 타겟을 unobserve한다.
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    console.log('page?', pages.current);
    getRandomData();
  }, [pages.current]);

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer;
    if (lastIntersectingData) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersectingData);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingData]);
  // 최신(Recent) 페이지
  // 최신 페이지

  // useEffect(() => {
  //   dispatch(getRecentData());
  // }, []);

  // const recent = useSelector((state) => state.post.recentPost);
  // console.log(recent);
  // 최신 페이지 , useEffect에서 최신 데이터를 가져온다. , useSelector로 store의 데이터를 가져옴

  return (
    <Stwrapper>
      <div className='main'>
        <div className='main-box'>
          <>
            {randomData?.map((item, index) => {
              if (index === randomData.length - 1) {
                return (
                  <MainPostCard
                    key={item.id}
                    item={item}
                    ref={setLastIntersectingData}
                  />
                );
              } else {
                return <MainPostCard key={item.id} item={item} />;
              }
            })}
          </>
        </div>
      </div>
    </Stwrapper>
  );
};

export default MainRecentContainer;

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

  .Loading {
    display: block;
    margin: 0 auto;
    font-weight: bold;
  }
`;
