import React from 'react';
import styled from 'styled-components';

const PostContent = ({ postInputs, setPostInputs }) => {

  // ::: 컨텐츠 입력값 저장
  const onChangePostContents = (event) => {
    const { value, name } = event.target;
    setPostInputs({
      ...postInputs,
      [name]: value
    });
  }

  return (
    <StPostContentWrap>
      <input 
        name='title' 
        value ={postInputs.title} 
        onChange={onChangePostContents}
        placeholder='게시글의 제목을 입력해주세요.' 
      />
      <textarea 
        name='content'
        value={postInputs.content}
        onChange={onChangePostContents}
        placeholder='게시글의 내용을 소개해주세요.'
      >
      </textarea>
    </StPostContentWrap>
  );
};

export default PostContent;

const StPostContentWrap = styled.div`
  padding: 0.8rem 0 0;
  input, textarea{
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
  textarea {
    height: 7.375rem;
  }
`
