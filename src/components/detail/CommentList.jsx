import React from 'react';
import CommentCard from './CommentCard';
import styled from 'styled-components';

const CommentList = ({ commentsList }) => {
  return (
    <StCommentListWrap>
      {commentsList.responseDto &&
      commentsList.responseDto.map((comment) => (
        <CommentCard key={comment.commentId} comment={comment} />
      ))}
    </StCommentListWrap>
  );
};

export default CommentList;

const StCommentListWrap = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 7rem;
`;

