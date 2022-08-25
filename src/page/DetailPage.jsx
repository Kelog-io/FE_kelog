import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  __getPostDetail, 
  __getUserDetail 
} from '../redux/modules/postSlice';
import { 
  __getCommentAllByPostId, 
  __deleteCommentByCommentId 
} from '../redux/modules/commentSlice';
import GlobalLayout from '../components/global/GlobalLayout';
import GlobalHeader from '../components/global/GlobalHeader';
import DetailContainer from '../components/detail/DetailContainer';
import UserContainer from '../components/detail/UserContainer';
import CommentContainer from '../components/detail/CommentContainer';
import styled from 'styled-components';

const DetailPage = () => {

  const [isLogin, setIsLogIn] = useState();
  const [isToggle, setIsToggle] = useState(false);

  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.postSlice.postDetail);
  const commentsList = useSelector(state => state.commentSlice.comment);
  const userDetail = useSelector((state) => state.postSlice.userDetail);
  const heartCount = useSelector(state => state.postSlice.heartCount);
  const heartPush = useSelector(state => state.postSlice.heartPush);
  const userToken = localStorage.getItem('access-token')
  ? localStorage.getItem('access-token')
  : null;
  const postId = useParams().postId;

  
  useEffect(() => {
    dispatch(__getPostDetail(postId));
    dispatch(__getCommentAllByPostId(postId));
    dispatch(__getUserDetail(postId));
  }, [dispatch, postId]);

  return (
    <StDetailPageWrap>
      {/* user id header에 보내야함 */}
      <GlobalHeader 
        userDetail={userDetail}
        userToken={userToken}
        isLogin={isLogin}
        setIsLogIn={setIsLogIn}
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      />
      <GlobalLayout>
        <DetailContainer 
          postDetail={postDetail} 
          userDetail={userDetail}
          heartCount={heartCount}
          heartPush={heartPush}
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
