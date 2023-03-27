import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  InputBase,
} from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import { useForm } from 'react-hook-form';
import theme from 'src/theme';
import Scrollbars from 'react-custom-scrollbars-2';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  boxContent: {
    height: 'calc(100vh - 70px - 78px)',
  },

  client: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    '& > p': {
      backgroundColor: theme.palette.primary.contrastText,
      border: '1px solid #c1c1c1',
    },
  },
  textMessage: {
    padding: '12px 1rem',
    borderRadius: '8px',
    fontSize: '1.4rem',
  },
  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    marginRight: '14px',
    '& > p': {
      backgroundColor: theme.palette.grey[400],
    },
  },

  formChat: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    margin: 'auto',
    bottom: '140px',
  },
});

export const ContentMessage = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      messageText: '',
    },
  });

  const classes = useStyles();
  return (
    <Box sx={{ height: '100%' }} className={classes.root}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #c1c1c1',
          padding: '0 8px',
          height: ' 60px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& h5': { fontWeight: '600' },
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={''}
            sx={{ width: '40px', height: '40px', mr: 2 }}
          />
          <Typography fontSize="16px" fontWeight="600">
            Bui Van Sy
          </Typography>
        </Box>
      </Box>

      {/* Content messages */}
      <Box className={classes.boxContent}>
        <Box width="88%" mt={2} ml="14px" height="84%">
          <Scrollbars>
            <Box className={classes.user}>
              <Typography className={classes.textMessage}>
                Xin chào bạn?
              </Typography>
            </Box>
            <Box className={classes.client}>
              <Typography className={classes.textMessage}>2312213</Typography>
            </Box>
            <Box className={classes.user}>
              <Typography className={classes.textMessage}>
                Xin chào bạn?
              </Typography>
            </Box>
            <Box className={classes.client}>
              <Typography className={classes.textMessage}>2312213</Typography>
            </Box>
            <Box className={classes.user}>
              <Typography className={classes.textMessage}>
                Xin chào bạn?
              </Typography>
            </Box>
            <Box className={classes.client}>
              <Typography className={classes.textMessage}>2312213</Typography>
            </Box>
            <Box className={classes.client}>
              <Typography className={classes.textMessage}>2312213</Typography>
            </Box>
            <Box className={classes.client}>
              <Typography className={classes.textMessage}>2312213</Typography>
            </Box>
          </Scrollbars>
        </Box>
      </Box>

      <Box className={classes.formChat}>
        <Box
          display="flex"
          justifyContent="space-between"
          width="88%"
          sx={{
            padding: '8px 0',
            border: '1px solid #c1c1c1',
            borderRadius: '16px',
            ml: '10px',
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontSize: '14px',
              width: '80%',
              color: theme.palette.grey[600],
            }}
            placeholder="Nhập tin nhắn"
          />
          <Box sx={{ '& svg': { fontSize: '24px' } }}>
            <IconButton>
              <SendOutlined
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
