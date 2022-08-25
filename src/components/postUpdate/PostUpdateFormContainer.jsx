import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { __getPostDetail } from '../../redux/modules/postSlice';
import axios from 'axios';
import PostUpdateContent from './PostUpdateContent';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const PostingFormContainer = () => {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const postDetail = useSelector((state) => state.postSlice.postDetail);
  
  useEffect(() => {
    dispatch(__getPostDetail(postId));
  }, [dispatch]);


  console.log("%%%%%%%%%%%%", postDetail);
  // ::: 뒤로가기
  const navigate = useNavigate();
  const goingBack = () => {
    navigate(-1);
  }
  // ::: 이미지 업로드 상태관리

  const [ postInputs, setPostInputs ] = useState({
    title: "",
    content: "",
  });
  const [ tagList, setTagList ] = useState(postDetail.tags);

  const onClickUpdatePost = async(event) => {
    event.preventDefault();
    console.log("게시글을 업로드 해봅시다!");
    if(
      postInputs.title === '' ||
      postInputs.content === ''
    ) {
      postInputs.title === '' && console.log("title을 입력해주어야 함");
      postInputs.content === '' && console.log("content를 입력해주어야 함");
    } else {
      console.log("유효성 검사 통과 ::: 서버로 데이터 전송!");

      // :: 서버 주소
      const URL = {
        BASE: process.env.REACT_APP_BASE_URL,
      };
      const USER = {
        AUTHORIZATION: process.env.REACT_APP_CLIENT_AUTHORIZATION,
      };
      try {
        const postContentsResponse = await axios.put(
          `${URL.BASE}api/post/update/${postId}`, {
            "title": String(postInputs.title),
            "content": String(postInputs.content),
            "tags": tagList,
          },
          {
            headers: {
              AUTHORIZATION: localStorage.getItem('access-token'),
            },
          }
        );
        navigate(`/post/${postContentsResponse.data.data.id}`, {replace: true});
      } catch(error) {
        console.log(error);
      }

      // ::: 초기화
      setTagList([]);
      setPostInputs({
        title: '',
        content: '',
      });
    }
  }

  return (
  <StPostingFormContainer>
    <div>
      <h3>포스트 수정하기</h3>
      <p>** 제목과 내용만 수정이 가능합니다. (사진 및 태그 수정 준비중)</p>
      <StPostImageWrap>
        <StPreviewImage src={postDetail.imgUrl} alt='preview' />
      </StPostImageWrap>
      
      <PostUpdateContent 
        postInputs={postInputs}
        setPostInputs={setPostInputs}
        postDetail={postDetail}
      />
      <StPostTagWrap>
      <input 
        type="text" 
        disabled
        placeholder="태그 수정은 불가능합니다." 
      />
      <StPostTagRow>
        {
          tagList &&
            tagList.map((tag, index) => (
              <span 
                key={tag+index}
                id={tag}
              >
                {tag}
              </span>
            ))
        }
      </StPostTagRow>
    </StPostTagWrap>
      <StPostingButtonRow>
        <button 
          className="buttonWhite"
          onClick={goingBack}
        >
          취소
        </button>
        <button 
          className="buttonPoint"
          onClick={onClickUpdatePost}
        >
          수정하기
        </button>
      </StPostingButtonRow>
    </div>
  </StPostingFormContainer>
  );
};

export default PostingFormContainer;

const StPostingFormContainer = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100vh;
  padding: 10px 0;
  margin: 0 auto;

  div {
    width: 100%;
  }
`;

const StPostingButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;

  button {
    height: 2.5rem;
    font-size: 1.125rem;
    margin-left: 0.875rem;
    padding: 0px 1.125rem;
  }
`;

const StPostImageWrap = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: var(--grayBg-color);
  box-shadow: var(--shadow-style);
  text-align: center;
  overflow: hidden;
  
  `;

const StPreviewImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StPostTagWrap = styled.div`
  input {
    width: 100%;
    margin-bottom: 0.8rem;
    padding: 0.5rem 0.875rem;
    font-size: 1.125rem;
    color: var(--title-color);
    border: none;
    background: var(--subBg-color);
    box-shadow: var(--shadow-style);
    outline: none;
  }
`;

const StPostTagRow = styled.div`
  width:100%;
  line-height: 2.3rem;
  margin-bottom: 1rem;
  word-wrap: break-all;
  span {
    display:inline-block;
    height: 2rem;
    font-size: 1rem;
    line-height: 2rem;
    color: var(--primary-color);
    border-radius: 1rem;
    background-color: var(--bg-color);
    padding: 0 1rem;
    margin-right: 1rem;
    cursor: pointer;
    transition: 0.5ms;
  }
`;
