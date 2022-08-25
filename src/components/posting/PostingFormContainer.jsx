import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostTag from './PostTag';
import styled from 'styled-components';

const PostingFormContainer = () => {
  // ::: 뒤로가기
  const navigate = useNavigate();
  const goingBack = () => {
    navigate(-1);
  }
  // ::: 이미지 업로드 상태관리
  const [ compressedImageFile, setCompressedImageFile] = useState(null);
  const [ postInputs, setPostInputs ] = useState({
    title: "",
    content: "",
  });
  const [ tagList, setTagList ] = useState([]);
  console.log("___PostingForm_imageState ====> ", compressedImageFile);
  console.log("___PostingForm_contentState ====> ", postInputs.title, postInputs.content);
  console.log("___PostingForm_tagState ====> ", tagList);

  const onClickAddPost = async(event) => {
    event.preventDefault();
    console.log("게시글을 업로드 해봅시다!");
    if(
      postInputs.title === '' ||
      postInputs.content === '' ||
      compressedImageFile === null ||
      tagList.length === 0
    ) {
      postInputs.title === '' && console.log("title을 입력해주어야 함");
      postInputs.content === '' && console.log("content를 입력해주어야 함");
      compressedImageFile === null && console.log("이미지를 입력해주어야 함");
      tagList.length === 0 && console.log("태그를 입력해주어야 함");
    } else {
      console.log("유효성 검사 통과 ::: 서버로 데이터 전송!");

      // :: 서버 주소
      const URL = {
        BASE: process.env.REACT_APP_BASE_URL,
      };
      const USER = {
        AUTHORIZATION: localStorage.getItem('access-token'),
      };

      // :: image file formData 형식 변환
      const form = new FormData();
      form.append("file", compressedImageFile);
      
      // :: info contents blob 형식 변환
      const contents = {
        "title": postInputs.title,
        "content": postInputs.content,
        "tags": tagList,
      }
      const json = JSON.stringify(contents);
      const blob = new Blob([json], {type: "application/json"});
      form.append("info", blob);

      try {
        const postContentsResponse = await axios.post(
          `${URL.BASE}api/post`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${USER.AUTHORIZATION}`
            },
          }
        );
        
        console.log("postContentsResponse:::", postContentsResponse);


        
        navigate(`/post/${postContentsResponse.data.data.id}`, {replace: true});

      } catch(error) {
        console.log(error);
      }

      // ::: 초기화
      setCompressedImageFile(null);
      setTagList([]);
      setPostInputs({
        title: '',
        content: '',
      });
    }
  }

  // navigate(`/${postContentsResponse.data.data.id}`, {replace: true});
 
  return (
  <StPostingFormContainer>
    <div>
      <h3>포스트 올리기</h3>
      <PostImage 
        setCompressedImageFile={setCompressedImageFile}
      />
      <PostContent 
        postInputs={postInputs}
        setPostInputs={setPostInputs}
      />
      <PostTag
        tagList={tagList}
        setTagList={setTagList}
      />
      <StPostingButtonRow>
        <button 
          className="buttonWhite"
          onClick={goingBack}
        >
          취소
        </button>
        <button 
          className="buttonPoint"
          onClick={onClickAddPost}
        >
          출간하기
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
