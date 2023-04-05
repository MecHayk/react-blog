import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../redux/slices/comments';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        user={data.user}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
