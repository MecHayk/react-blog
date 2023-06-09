import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { fetchComments } from '../redux/slices/comments';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);

  const [populate, setPopulate] = useState(false);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  const popularPosts = [...posts.items].sort((a, b) => (a.viewsCount < b.viewsCount ? 1 : -1));
  const newPosts = [...posts.items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const commentsPost = comments.items.map((item) => item.post);

  const [value, setValue] = React.useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example">
        <Tab onClick={() => setPopulate(false)} label="Новые" value="one" />
        <Tab onClick={() => setPopulate(true)} label="Популярные" value="two" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : populate === false ? newPosts : popularPosts).map(
            (obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={[...commentsPost.filter((item) => obj._id.includes(item))].length}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
