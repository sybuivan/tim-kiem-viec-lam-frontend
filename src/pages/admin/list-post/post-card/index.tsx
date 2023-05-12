import React from 'react';
import moment from 'moment';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IPost } from 'src/types/post';
import { useAppDispatch } from 'src/redux_store';
import { useStyles } from './styles';

type Props = {
  postItem: IPost;
};

const CardPost = ({ postItem }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const moveToEditPost = async (id: string) => {
    await navigate(`/admin/edit-post/${id}`);
  };

  const handleOpenModalDeletePost = (id: string) => {
    //  dispatch(
    //    openModal({
    //      modalId: CModalIds.deletePost,
    //      modalComponent: (
    //        <ModalDeletePost modalId={CModalIds.deletePost} id={id} />
    //      ),
    //    })
    //  );
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.image}>
        <img
          src={postItem.image}
          style={{ width: '120px', objectFit: 'cover' }}
          alt=""
        />
      </Box>
      <Box className={classes.content}>
        <Box className={classes.title}>
          <Box
            sx={{
              width: '70%',
              position: 'absolute',
              top: '0',
              left: '0',
              display: 'flex',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                overflow: 'hidden',
                whiteSpace: 'pre',
                textOverflow: 'ellipsis  ',
              }}
            >
              {postItem.title}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.description}>{postItem.description}</Box>
        <Box>
          <Typography sx={{ position: 'absolute', bottom: '0' }}>
            Ngày tạo :
            <i style={{ fontSize: '13px' }}>
              {moment(postItem.publishedAt).format('DD/MM/YYYY HH:mm:SS')}
            </i>
          </Typography>
        </Box>
      </Box>
      <Box className={classes.icon}>
        <IconButton>
          <EditOutlinedIcon
            fontSize="medium"
            color="primary"
            onClick={() => {
              moveToEditPost(postItem.id_post + '');
            }}
          />
        </IconButton>
        <IconButton>
          <DeleteOutlineOutlinedIcon
            fontSize="medium"
            color="error"
            onClick={() => {
              handleOpenModalDeletePost(postItem.id_post + '');
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardPost;
