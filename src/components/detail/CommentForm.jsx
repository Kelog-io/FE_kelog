import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { __createCommentByPostId } from '../../redux/modules/commentSlice';
import { useDispatch } from 'react-redux';

const CommentForm = () => {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const [commentTextArea, setCommentTextArea] = useState('');
  const userToken = localStorage.getItem('access-token');


  // ::: 댓글 등록 입력값 확인
  const onChangeCommentMessage = (event) => {
    setCommentTextArea(event.target.value);
  }

  // ::: 댓글 등록
  const onClickAddComment = () => {
    dispatch(__createCommentByPostId({
      comment: commentTextArea,
      postId: postId
    }));
    setCommentTextArea('');
  }

  return (
    <StCommentFormWrap>
      {
        userToken !== null &&
        <>
        <textarea 
          placeholder='댓글을 작성하세요.'
          onChange={onChangeCommentMessage}
          value={commentTextArea}
        >
        </textarea>
        <div className='commentAddButtonWrap'>
          <button 
            className='buttonPoint'
            onClick={onClickAddComment}
          >
            댓글 작성
          </button>
        </div>
        </>
      }
    </StCommentFormWrap>
  );
};

export default CommentForm;

const StCommentFormWrap = styled.div`
  width: 100%;

  textarea {
    width: 100%;
    height: 70px;
    resize: none;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border: var(--border-style);
    margin-bottom: 1.5rem;
    border-radius: 4px;
    min-height: 6.125rem;
    font-size: 1rem;
    color: var(--title-color);
    line-height: 1.75;
    background: var(--subBg-color);

  }
  .commentAddButtonWrap {
    display: flex;
    justify-content: flex-end;
  }
`;
