import { Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getRoom } from 'src/redux_store/chat/chat_actions';
import { ContentMessage } from './content_message';
import { SideBar } from './side_bar';

const Message = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.companySlice);

  useEffect(() => {
    if (me.id_user && me.id_role) {
      dispatch(getRoom({ id_user: me.id_user, id_role: me.id_role }));
    } else if (me.id_company && me.id_role) {
      dispatch(getRoom({ id_user: me.id_company, id_role: me.id_role }));
    }
  }, []);
  return (
    <Paper
      sx={{
        width: '100%',
        height: 'calc(100vh - 70px)',
        border: '1px solid #c1c1c1',
      }}
    >
      <Grid
        container
        sx={{
          height: '100%',
          minWidth: '1600px',
          paddingLeft: '0!important',
          overflowY: 'hidden',
          minHeight: '30px',
        }}
      >
        <Grid item xs={3}>
          <SideBar />
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Paper>
  );
};

Message.propTypes = {};

export default Message;
