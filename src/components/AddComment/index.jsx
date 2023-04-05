import React, { useEffect, useState } from 'react';
import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from '../../axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../redux/slices/comments';

export const Index = () => {
  const { id } = useParams();
  const [text, setText] = useState();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.auth);

  const onSubmit = async () => {
    dispatch(setComments({ text: text, post: id, user: data }));
    try {
      const fields = {
        text,
      };
      await axios.post(`/comments/${id}`, fields);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании комментария!');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
