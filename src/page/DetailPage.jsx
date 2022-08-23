import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getPostDetail, __getUserDetail } from '../redux/modules/postSlice';
import { __getCommentAllByPostId, __deleteCommentByCommentId } from '../redux/modules/commentSlice';
import GlobalLayout from '../components/global/GlobalLayout';
import GlobalHeader from '../components/global/GlobalHeader';
import DetailContainer from '../components/detail/DetailContainer';
import UserContainer from '../components/detail/UserContainer';
import CommentContainer from '../components/detail/CommentContainer';
import styled from 'styled-components';

const DetailPage = () => {
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.postSlice.postDetail);
  const commentsList = useSelector(state => state.commentSlice.comment);
  const userDetail = useSelector((state) => state.postSlice.userDetail);
  const postId = useParams().postId;
  
  useEffect(() => {
    dispatch(__getPostDetail(postId));
    dispatch(__getCommentAllByPostId(postId));
    dispatch(__getUserDetail(postId))
  }, [dispatch, postId]);

  console.log(postId);
  console.log("=============>", userDetail);
  return (
    <StDetailPageWrap>
      {/* user id header에 보내야함 */}
      <GlobalHeader 
        userDetail={userDetail}
      />
      <GlobalLayout>
        <DetailContainer 
          postDetail={postDetail} 
          userDetail={userDetail} 
        />
        <UserContainer userDetail={userDetail} />
        <CommentContainer commentsList={commentsList} />
      </GlobalLayout>
    </StDetailPageWrap>
  );
};

export default DetailPage;

const StDetailPageWrap = styled.div`
  background-color: var(--subBg-color);
`;
